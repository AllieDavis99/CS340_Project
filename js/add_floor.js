let add_floor_form = document.getElementById('addFloorForm');

add_customer_form.addEventListener("addFloor", function (e) {
    e.preventDefault();

    //get data from form
    let inputOcc = document.getElementById("occupied_rooms");
    let inputEmpty = document.getElementById("empty_rooms");
    let inputFacili = document.getElementById("has_facilities");


    let occValue = inputOcc.value;
    let emptyValue = inputEmpty.value;
    let faciliValue = inputFacili.value;


    let data = {
        occupied_rooms: occValue,
        empty_rooms: emptyValue,
        has_facilities: faciliValue,
    }

    //AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/floors.hbs", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);

            //clear input fields for next transaction
            inputOcc.value = '';
            inputEmpty.value = '';
            inputFacili.value = '';
        }

        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    //send request
    xhttp.send(JSON.stringify(data));
})

//creates a row for Customers table
addRowToTable = (data) => {
    let currentTable = document.getElementById("customers-table");
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    //create row and it's cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let occCel = document.createElement("TD");
    let emptyCell = document.createElement("TD");
    let faciliCell = document.createElement("TD");


    //populate cells
    idCell.innerText = newRow.id;
    occCel.innerText = newRow.occupied_rooms;
    emptyCell.innerText = newRow.empty_rooms;
    faciliCell.innerText = newRow.has_facilities;


    //add cells to row
    row.appendChild(idCell);
    row.appendChild(occCel);
    row.appendChild(emptyCell);
    row.appendChild(faciliCell);

    currentTable.appendChild(row);
}