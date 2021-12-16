const x = document.getElementById("table");

const clients = [];

function cadastro(){
    const register = document.querySelectorAll(".register");
    const listElements = [];
    register.forEach((element) => listElements.push(element.value));
    if(listElements.every((elem) => elem != "")){
        const obj = new Object();
        obj.nameClient = listElements[0];
        obj.date = listElements[1];
        obj.value = listElements[2];
        obj.days = "";
        obj.fee = "";
        obj.all = "";
        clients.push(obj);
        print(clients);
    }
    document.querySelector("form").reset();
}

function calcDate(){
    const allDate = clients.map(
        (element) => {
            let mili = Date.parse(element.date);
            mili = new Date(mili);
            let mile = new Date(Date.now());
            let dif = parseInt((mile - mili)/86400000)
            element.days = dif;
            return (dif < 0 ? 0 : dif);
        }
    );
    return allDate;
}

function calc(){
    const allDate = calcDate();
    clients.forEach(
        (elem, index) => {
            let value = parseInt(elem.value);
            // let firstId= 4, secondId=5;
            value += (value * 0.02)
            value += (value * (0.001 * allDate[index]));
            if(allDate[index] == 0)
                value = parseInt(elem.value);
            elem.fee = (value - elem.value).toFixed(2);
            elem.all = value.toFixed(2);
            // const tds = document.querySelectorAll("td");
            // firstId += 6*index
            // secondId = firstId + 1;
            // tds[firstId].innerHTML = elem.fee;
            // tds[secondId].innerHTML = elem.all;
        }
    );
    print(clients);
}

function print(client){
    const table = document.getElementById("table");
    table.innerHTML = `<tr id="headerTable">
    <th>Nome do cliente</th>
    <th>Data do vencimento</th>
    <th>Valor da compra</th>
    <th>Dias</th>
    <th>Juros</th>
    <th>Total</th>
    </tr>`;
    //Transformar objeto em array
    client.forEach(element => {
        let tr = document.createElement("tr");
        Object.values(element).forEach(
            (elem) => {
                let td = document.createElement("td");
                td.innerText = elem;
                tr.appendChild(td);
                (elem);
            }
        );
        table.appendChild(tr);
    });
}
var ola = "";
function orden(arr, item){
    let ord = ordenar(arr, item);
    ola = Object.values(ord);
    console.log(ord);
    let x = [];
    Object.values(ord).forEach(
        (elem) => {
            elem.forEach(
                (element) => {
                    x.push(element);
                }
            );
        }
    );
    print(x);
}

function teste2(itenA, itenB){
    return itenA.nameClient < itenB.nameClient ? -1 : itenA.nameClient > itenB.nameClient ? 1 : 0;
}

function teste4(itenA, itenB){
    return itenA.days < itenB.days ? -1 : itenA.days > itenB.days ? 1 : 0;
}

function testando(){
    const x = clients.slice();
    x.sort(teste2);
    ordenar();
    print(x);
}

function testao(){
    const x = clients.slice();
    x.sort(teste4);
    print(x);
}

function testinho(acc, cur){
    let x = cur["nameClient"];
    if(!acc[x])
        acc[x] = {nameClient: x, cont: 0};
    acc[x].cont += parseFloat(cur["all"]);

    return acc;
}

function ordenar(){
    const arrClient = clients.reduce(testinho, {});
    console.log(arrClient);
    let table = document.querySelector(".tableLast");
    if(!table){
        table = document.createElement("table");
        table.className = "tableLast";
    }else{
        
    }
    table.innerHTML = `<tr id="headerTable">
    <th>Nome do cliente</th>
    <th>Valor a pagar</th>
    </tr>
    `;
    Object.values(arrClient).forEach(
        (elem) => {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.innerText = elem.nameClient;
            let td2 = document.createElement("td");
            td2.innerText = elem.cont.toFixed(2);
            tr.appendChild(td);
            tr.appendChild(td2);
            table.appendChild(tr);
        }
    );
    document.querySelector("main").appendChild(table);
}
