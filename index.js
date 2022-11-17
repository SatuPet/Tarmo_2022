
// Open aside
document.getElementById("info-button").addEventListener("click", function () {
    document.getElementById('aside-window').classList.toggle('aside-open');

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





