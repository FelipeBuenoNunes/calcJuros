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
    // for(let i = 0; i < Object.values(ord).length; i++){
    //     for(let j = 0; j < Object.values(ord)[i].length; j++){
    //         console.log(Object.values(ord)[i][j]);
    //     }
    // }
    Object.values(ord).forEach(
        (elem) => {
            elem.forEach(
                (element) => {
                    x.push(element);
                }
            );
        }
    );
    console.log("X");
    console.log(x);
    print(x);
}

function ordenar(arr, item){
    let teste =  arr.reduce(
        (acc, cur) =>   {
            let x = cur[item];
            if(!acc[x]){
                acc[x] = [];
            }
            acc[x].push(cur);
            return acc;
        },{}
    );
    return teste;
}
