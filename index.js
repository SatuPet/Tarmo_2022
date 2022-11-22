
// Open aside
document.getElementById("info-button").addEventListener("click", function () {
    document.getElementById('aside-window').classList.toggle('aside-open');

    // Info text change to sulje
    if (this.innerText == "Info") {
        this.innerText = "Sulje";
      } else {
        this.innerText = "Info";
      }

    // Open info content with timing
    let infoContent = document.getElementById('info-content');

    if (!infoContent.classList.contains('info-hidden')) {
        infoContent.classList.toggle('info-hidden');
    } else {
        setTimeout(function () {
            infoContent.classList.toggle('info-hidden');
        }, 1000);
    }

    // Open control buttons panel with timing
    let controls = document.getElementById('control-buttons');

if (!controls.classList.contains('controls-hidden')) {
    controls.classList.toggle('controls-hidden');
}else {
    setTimeout(function () {
        controls.classList.toggle('controls-hidden');
    }, 1000)
}

});

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}








