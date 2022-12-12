let jsonNimet = [];
let jsonHref = [];

let input = document.getElementById("search");
let lista = document.getElementById("results");

if (lista.innerHTML === "") {
    lista.classList.toggle("lista-piiloon");
};

fetch('./dataFI.json').then((response) => response.json()).then((json) => getDatData(json));

const getDatData = (data) => {
    for (let i of data) {
        jsonNimet.push(i.name);
        jsonHref.push(i.href);
    }
};

input.addEventListener("keyup", e => {
    e.preventDefault();

    lista.classList.remove("lista-piiloon");

    removeElements();

    for (let i of jsonNimet) {

        if (i.toLowerCase().startsWith(input.value.toLowerCase()) 
        && input.value != "") {
            
            let listItem = document.createElement("li");
            listItem.classList.add("list-item");
            listItem.style.cursor = "pointer";
            listItem.tabIndex = 0;
            listItem.setAttribute("onClick", "displayNames('" + i + "', '"+ 
            jsonHref[jsonNimet.indexOf(i)] +"')");
            where = jsonHref[jsonNimet.indexOf(i)];

            let word = i.substring(0,input.value.length);
            word += i.substring(input.value.length);

            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem);
        }

    }

});

let bars = document.querySelector('#burgerBars');

document.addEventListener("keyup", e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        
        if (e.target === bars) {
            bars.click();
        }

        if (document.activeElement.innerHTML === "") {
            return; 
        } else if (e.target.matches('.list-item')){
            relocate(jsonHref[jsonNimet.indexOf(document.activeElement.innerHTML)]);
        }
    }
});

function displayNames(value, where) {
    input.value = value;
    removeElements();
    if (lista.innerHTML === "") {
        lista.classList.toggle("lista-piiloon");
    };
    input.focus();
    relocate(where);
}

function removeElements() {
    let items = document.querySelectorAll(".list-item");
    items.forEach((item) => {
        item.remove();
    });
    
}

const relocate = (where) => {
    console.log(where, 'relocate funkt sisältä');
    location.replace(`./${where}`);
};
