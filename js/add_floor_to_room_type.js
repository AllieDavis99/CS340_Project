let add_floor_to_room_type_form = document.getElementById('addRoomTypePerFloor');

add_floor_to_room_type_form.addEventListener("submit", function(e){
    e.preventDefault();

    //get data from form
    let inputFloor = document.getElementById("input-floor_id");
    let inputRoomType = document.getElementById("input-room_type_id");

    let floorValue = inputFloor.value;
    let roomTypeValye = inputRoomType.value;

    let data = {
        floor: floorValue,
        room: roomTypeValye
    }

    //AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/roomTypesPerFloor.hbs", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);

            //clear input fields for next transaction
            inputFloor.value = '';
            inputRoomType.value = '';
        }

        else if (xhttp.readyState == 4 && xhttp.status != 200){
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
    let floorCell = document.createElement("TD");
    let RoomTypeCell = document.createElement("TD");

    //populate cells
    idCell.innerText = newRow.id;
    floorCell.innerText = newRow.floor_id;
    RoomTypeCell.innerText = newRow.room_type_id;

    //add cells to row
    row.appendChild(idCell);
    row.appendChild(floorCell);
    row.appendChild(roomTypeCell);

    currentTable.appendChild(row);
}