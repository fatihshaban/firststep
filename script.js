const select = document.getElementById("mySelect");


async function newTeacher() {
    try{
        db.collection("teachers").add({
            id:1,
            name: "Muhammed Shej",

        })
        alert("successfully sent")


    }
    catch (e) {
        console.log(e)
        alert("error")
    }
}
async function newProject() {
    try{
        db.collection("projects").add({
            teacherID: 0,
            projectId: 100,
            name: "fatih saban",
            p1:0,
            p2:0,
            p3:0,
            p4:0,
            p5:0,
            p6:0,

        })
        alert("successfully sent")


    }
    catch (e) {
        console.log(e)
        alert("error")
    }
}


document.addEventListener("DOMContentLoaded", async function () {
    try{
        const citiesRef = db.collection('teachers');
        const snapshot = await citiesRef.get();
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        
          let option = document.createElement("option");
          option.value = doc.data().id; // Replace with the actual value field
          option.textContent = doc.data().name; // Replace with the actual text field
          select.appendChild(option);
        
        });
    }
    catch (e) {
        console.log(e)
        alert("error")
    }
    
  });


  select.addEventListener("change", async function (event) {
    
    console.log(event.target.value)
    const tableBody = document.querySelector("#projectTable tbody");
    tableBody.innerHTML = "<tr><td colspan='9'>Loading...</td></tr>"; // Show loading message


    try{
        const citiesRef = db.collection('projects');
        const snapshot = await citiesRef.where("teacherID", "==", parseInt(event.target.value)).get();



        if (snapshot.empty) {
            tableBody.innerHTML = "<tr><td colspan='9'>No projects found.</td></tr>";
        } else {
            tableBody.innerHTML=""
            snapshot.forEach(doc => {
                const data = doc.data();
                const docId = doc.id; // Firestore document ID
                const sum = data.p1 + data.p2 + data.p3 + data.p4 + data.p5 + data.p6;
                const row = `
                    <tr>
                        <td>${data.projectId}</td>
                        <td><input type="number" inputmode="numeric" min="1" max="6" value="${data.p1}" data-id="${docId}" data-field="p1"></td>
                        <td><input type="number" inputmode="numeric" min="1" max="6" value="${data.p2}" data-id="${docId}" data-field="p2"></td>
                        <td><input type="number" inputmode="numeric" min="1" max="6" value="${data.p3}" data-id="${docId}" data-field="p3"></td>
                        <td><input type="number" inputmode="numeric" min="1" max="6" value="${data.p4}" data-id="${docId}" data-field="p4"></td>
                        <td><input type="number" inputmode="numeric" min="1" max="6" value="${data.p5}" data-id="${docId}" data-field="p5"></td>
                        <td><input type="number" inputmode="numeric" min="1" max="6" value="${data.p6}" data-id="${docId}" data-field="p6"></td>
                        <td class="sum">${sum}</td> 

                    </tr>
                `;
                tableBody.innerHTML += row;
            });




             // Add event listeners for input changes
             document.querySelectorAll("input[type='number']").forEach(input => {
                input.addEventListener("change", async (event) => {
                    const inputElement = event.target;
                    let newValue = parseInt(inputElement.value);
                    const row = inputElement.closest("tr");
                    const docId = inputElement.getAttribute("data-id");
                    const field = inputElement.getAttribute("data-field");

                    // Ensure value is between 1 and 6
                    if (newValue < 1 || newValue > 6 || isNaN(newValue)) {
                        alert("Value must be between 1 and 6.");
                        inputElement.value = 1; // Reset invalid input
                        return;
                    }

                    // Update Firestore
                    try {
                        await db.collection("projects").doc(docId).update({ [field]: newValue });
                        console.log(`Updated ${field} to ${newValue} in project ${docId}`);

                        // Recalculate sum
                        updateSum(row);
                    } catch (error) {
                        console.error("Error updating Firestore:", error);
                        alert("Failed to update data.");
                    }
                });
            });


        }

        // snapshot.forEach(doc => {
        //   console.log(doc.id, '=>', doc.data());


        
        // });
    }
    catch (e) {
        console.log(e)
        alert("error")
    }
    
  });


  function updateSum(row) {
    const inputs = row.querySelectorAll("input[type='number']");
    let sum = 0;
    inputs.forEach(input => {
        sum += parseInt(input.value);
    });
    row.querySelector(".sum").textContent = sum;
}