
function deleteCustomer(customerID){
    let link = '/delete_customer/';
    let data = {
        id: customerID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result){
            deleteRow(customerID);
        }
    });
};

function deleteRow(customerID){
    let table = document.getElementById("customer-table");
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == personID){
            table.deleteRow(i);
            break;
        }
    }
};