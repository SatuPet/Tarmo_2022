let nimiLista = ['Komentosilta','Ruorihytti','Karttahytti','Päällikön toimisto',
'Päällikön hytti','Salonki','Emännoitsijän hytti','Pentteri','Radiohytti',
'Miehistön pesuhuone','Päällystömessi','Keittiö','Konetyöverstas'];

let jsonNimet = [];
let jsonNimetSorted = [];
let jsonHref = [];
let jsonHrefSorted = [];

let nimetSorted = nimiLista.sort();
//console.log(nimetSorted);

let input = document.getElementById("search");
let lista = document.getElementById("results");
console.log(lista.innerHTML === "");

if (lista.innerHTML === "") {
    lista.classList.toggle("lista-piiloon");
};

fetch('./dataFI.json').then((response) => response.json()).then((json) => getDatData(json));

const getDatData = (data) => {
    for (let i of data) {
        jsonNimet.push(i.name);
        jsonHref.push(i.href);
    }
    //console.log(jsonNimet);
    jsonNimetSorted = jsonNimet.sort();
    //console.log(jsonHref);
    jsonHrefSorted = jsonHref.sort();
    console.log(jsonNimetSorted);
    console.log(jsonHrefSorted);
};

input.addEventListener("keyup", e => {

    lista.classList.remove("lista-piiloon");

    removeElements();

    for (let i of jsonNimetSorted) {

        if (i.toLowerCase().startsWith(input.value.toLowerCase()) 
        && input.value != "") {

            //paikka listalla, href listalla melkein samalla paikalla vastaava linkki ->HUOM
            console.log(jsonNimetSorted.indexOf(i), 'hakutulosten paikka listalla');
            console.log(i);
            console.log(jsonHrefSorted[jsonNimetSorted.indexOf(i)], 'hakutulosten paikka href listalla');

            //HUOM! ä ja ö sekottaa järjestyksen, jsonii pitää lisää index minkä perusteella se järjestää
            
            let listItem = document.createElement("li");
            listItem.classList.add("list-item");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onClick", "displayNames('" + i + "', '"+ 
            jsonHrefSorted[jsonNimetSorted.indexOf(i)] +"')");

            let word = i.substring(0,input.value.length);
            word += i.substring(input.value.length);
            console.log(word, 'word alkuperäsestä koodista');

            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem);
        }


    }
});

function displayNames(value, where) {
    input.value = value;
    //console.log(value, 'value ja where', where);
    removeElements();
    if (lista.innerHTML === "") {
        lista.classList.toggle("lista-piiloon");
    };
    //klikkaamisen jälkeen relocate vai vasta enterin jälkeen?
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