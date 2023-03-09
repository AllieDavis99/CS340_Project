let add_room_form = document.getElementById('addRoomForm');

add_customer_form.addEventListener("addRoom", function (e) {
    e.preventDefault();

    //get data from form
    let inputOcc = document.getElementById("is_occupied");
    let inputNumOcc = document.getElementById("num_occupants");

    let inputValue = inputOcc.value;
    let numOccValue = inputNumOcc.value;


    let data = {
        is_occupied: inputOcc,
        num_occupants: inputNumOcc,
    }

    //AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/rooms.hbs", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);

            //clear input fields for next transaction
            inputValue.value = '';
            numOccValue.value = '';
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
    let currentTable = document.getElementById("rooms-table");
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    //create row and it's cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let FTRTCel = document.createElement("TD");
    let inputCell = document.createElement("TD");
    let numOccCell = document.createElement("TD");


    //populate cells
    idCell.innerText = newRow.id;
    tempCell.innerText = newRow.floor_to_room_type_id;
    FTRTCel.innerText = newRow.occupied_rooms;
    inputCell.innerText = newRow.empty_rooms;
    numOccCell.innerText = newRow.has_facilities;


    //add cells to row
    row.appendChild(idCell);
    row.appendChild(FTRTCel);
    row.appendChild(inputCell);
    row.appendChild(numOccCell);

    currentTable.appendChild(row);
}