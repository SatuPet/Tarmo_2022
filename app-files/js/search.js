let nimiLista = ['Komentosilta','Ruorihytti','Karttahytti','Päällikön toimisto',
'Päällikön hytti','Salonki','Emännoitsijän hytti','Pentteri','Radiohytti',
'Miehistön pesuhuone','Päällystömessi','Keittiö','Konetyöverstas'];

let nimetSorted = nimiLista.sort();
console.log(nimetSorted);

let input = document.getElementById("search");

input.addEventListener("keyup", e => {

    removeElements();

    for (let i of nimetSorted) {

        if (i.toLowerCase().startsWith(input.value.toLowerCase()) 
        && input.value != "") {

            let listItem = document.createElement("li");
            listItem.classList.add("list-item");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onClick", "displayNames('" + i + "')");

            let word = "<b>"+ i.substring(0,input.value.length) +"</b>";
            word += i.substring(input.value.length);
            console.log(word);

            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem);
        }
    }
});

function displayNames(value) {
    input.value = value;
    removeElements();
}

function removeElements() {
    let items = document.querySelectorAll(".list-item");
    items.forEach((item) => {
        item.remove();
    });
}