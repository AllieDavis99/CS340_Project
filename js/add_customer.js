let add_customer_form = document.getElementById('addCustomerForm');

add_customer_form.addEventListener("submit", function(e){
    e.preventDefault();

    //get data from form
    let inputName = document.getElementById("name");
    let inputPhoneNumber = document.getElementById("phone_number");
    let inputAddress = document.getElementById("address");
    let inputEmail = document.getElementById("email");

    let nameValue = inputName.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let addressValue = inputAddress.value;
    let emailValue = inputEmail.value;

    let data = {
        name: nameValue,
        phone_number: phoneNumberValue,
        address: addressValue,
        email: emailValue
    }

    //AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/customers.hbs", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200){
            addRowToTable(xhttp.response);

            //clear input fields for next transaction
            inputName.value = '';
            inputPhoneNumber.value = '';
            inputAddress.value = '';
            inputEmail.value = '';
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
    let nameCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let emailCell = document.createElement("TD");

    //populate cells
    idCell.innerText = newRow.id;
    nameCell.innerText = newRow.name;
    phoneNumberCell.innerText = newRow.phone_number;
    addressCell.innerText = newRow.address;
    emailCell.innerText = newRow.email;

    //add cells to row
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(addressCell);
    row.appendChild(emailCell);

    currentTable.appendChild(row);
}