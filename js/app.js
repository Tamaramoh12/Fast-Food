'use strict';

//big array
var allOrders = [];

//get from loal storage
if(localStorage.getItem('All Orders')){
    var localStorageData = JSON.parse(localStorage.getItem('All Orders'));
    for(var i = 0; i < localStorageData.length; i++){
        new Order (localStorageData[i].name , localStorageData[i].quantity);
    }
}

//constructor
function Order(name , quantity){
    this.name = name;
    this.quantity = quantity;
    allOrders.push(this);
}

//form
var form = document.getElementById('ordersForm');
form.addEventListener('submit',submitOrder);

function submitOrder(event){
    event.preventDefault();

    var name = event.target.name.value;
    var quantity = event.target.quantity.value;

    var orderObject = new Order(name , quantity);
    orderObject.render();
    totalQuantities();

    localStorage.setItem('All Orders' , JSON.stringify(allOrders));
}

//table to display results
var table = document.getElementById('ordersTable');
//table header 
function tableHeader(){
    var header = document.createElement('tr');
    table.appendChild(header);

    var cell1 = document.createElement('th');
    cell1.textContent = 'Item';
    header.appendChild(cell1);

    var cell2 = document.createElement('th');
    cell2.textContent = 'Quantity';
    header.appendChild(cell2);
}
tableHeader();

//table content - render
Order.prototype.render = function(){
    var row = document.createElement('tr');
    table.appendChild(row);

    var cell1 = document.createElement('td');
    cell1.textContent = this.name;
    row.appendChild(cell1);

    var cell2 = document.createElement('td');
    cell2.textContent = this.quantity;
    row.appendChild(cell2);
}

//table footer
var footer = document.createElement('tr');
var totalCell = document.createElement('td');
var totalCell2 = document.createElement('td');

function totalQuantities(){
    
    table.appendChild(footer);
    var total = 0;
    for(var i = 0; i < allOrders.length; i++){
        total += Number(allOrders[i].quantity);
    }

    totalCell.textContent = 'Total Quantity';
    footer.appendChild(totalCell);

    totalCell2.textContent = total;
    footer.appendChild(totalCell2);
}


//display the data from localstorage
function display(){
    for(var i = 0; i < allOrders.length; i++){
        allOrders[i].render();
    }
}
display();
totalQuantities();