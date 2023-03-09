let add_roomType_form = document.getElementById('addRoomTypeForm');

add_customer_form.addEventListener("addRoomType", function (e) {
    e.preventDefault();

    //get data from form
    let inputName = document.getElementById("type_name");
    let inputBed = document.getElementById("num_beds");
    let inputBath = document.getElementById("num_baths");
    let inputHaunted = document.getElementById("is_haunted");
    let inputPrice = document.getElementById("price_per_night");


    let nameValue = inputName.value;
    let bedValue = inputBed.value;
    let bathValue = inputBath.value;
    let hauntedValue = inputHaunted.value;
    let priceValue = inputPrice.value;


    let data = {
        type_name: nameValue,
        num_beds: bedValue,
        num_baths: bathValue,
        is_haunted: hauntedValue,
        price_per_night: priceValue,
    }

    //AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/roomTypes.hbs", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);

            //clear input fields for next transaction
            inputName.value = '';
            inputBed.value = '';
            inputBath.value = '';
            inputHaunted.value = '';
            inputPrice.value = '';
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
    let currentTable = document.getElementById("floors-table");
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    //create row and it's cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCel = document.createElement("TD");
    let bedCell = document.createElement("TD");
    let bathCell = document.createElement("TD");
    let hauntedCell = document.createElement("TD");
    let priceCell = document.createElement("TD");


    //populate cells
    idCell.innerText = newRow.id;
    nameCel.innerText = newRow.type_name;
    bedCell.innerText = newRow.num_beds;
    bathCell.innerText = newRow.num_baths;
    hauntedCell.innerText = newRow.is_haunted;
    priceCell.innerText = newRow.price_per_night;


    //add cells to row
    row.appendChild(idCell);
    row.appendChild(nameCel);
    row.appendChild(bedCell);
    row.appendChild(bathCell);
    row.appendChild(hauntedCell);
    row.appendChild(priceCell);

    currentTable.appendChild(row);
}