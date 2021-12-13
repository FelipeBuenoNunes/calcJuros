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
        obj.fee = "";
        obj.all = "";
        clients.push(obj);
        print(obj);
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
            let teste1= 3, teste2=4;
            value += (value * 0.02)
            value += (value * (0.001 * allDate[index]));
            if(allDate[index] == 0)
                value = parseInt(elem.value);
            elem.fee = (value - elem.value).toFixed(2);
            elem.all = value.toFixed(2);
            const tds = document.querySelectorAll("td");
            teste1 += 5*index
            teste2 = teste1 + 1;
            tds[teste1].innerHTML = elem.fee;
            tds[teste2].innerHTML = elem.all;
        }
    );
}

function print(client){
    const table = document.getElementById("table");
    let tr = document.createElement("tr");
    //Transformar objeto em array
    Object.values(client).forEach(elem => {
        let td = document.createElement("td");
        td.innerText = elem;
        tr.appendChild(td);
        (elem);
    });
    table.appendChild(tr);
}
function printExi(){

}