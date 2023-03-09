let add_booking_form = document.getElementById('addBookingForm');

add_booking_form.addEventListener("submit", function(e){
    e.preventDefault();

    //get data from form
    let inputID = document.getElementById("id");
    let inputCustomer = document.getElementById("customer_id");
    let inputRoom = document.getElementById("room_id");
    let inputCheckIn = document.getElementById("check_in");
    let inputCheckOut = document.getElementById("check_out")

    let idValue = inputID.value;
    let customerValue = inputCustomer.value;
    let roomValue = inputRoom.value;
    let checkInValue = inputCheckIn.value;
    let checkOutValue = inputCheckOut.value;

    let data = {
        id: idValue,
        customer: customerValue,
        room: roomValue,
        checkIn: checkInValue,
        checkOutValue: checkOutValue
    }

    console.log(checkInValue);

    //AJAX request
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/bookings.hbs", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);

            //clear input fields for next transaction
            inputID.value = '';
            inputCustomer.value = '';
            inputRoom.value = '';
            inputCheckIn.value = '';
            inputCheckOut.value = '';
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
    let currentTable = document.getElementById("bookings-table");
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    //create row and it's cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let customerCell = document.createElement("TD");
    let roomCell = document.createElement("TD");
    let checkInCell = document.createElement("TD");
    let checkOutCell = document.createElement("TD");

    //populate cells
    idCell.innerText = newRow.id;
    customerCell = newRow.customer_id;
    roomCell = newRow.room_id;
    checkInCell = newRow.check_in;
    checkOutCell = newRow.check_out;

    //add cells to row
    row.appendChild(idCell);
    row.appendChild(customerCell);
    row.appendChild(roomCell);
    row.appendChild(checkInCell);
    row.appendChild(checkOutCell);

    currentTable.appendChild(row);
}