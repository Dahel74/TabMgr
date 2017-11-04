var winID;

chrome.browserAction.onClicked.addListener(function () {
    openWindow();
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === "toggle-feature") {
        openWindow();
    }
});

function stockTabMaps() {
    localStorage['tabmaps'] = parseInt(localStorage['decompte']) - 2;// -2 car c'est toutes les 2 secondes
    if (parseInt(localStorage['decompte']) <= 0) {
        alert("driiiiiiiiing : 15 minutes écoulées ! Fini l'ordinateur");//le pauvre
        clearInterval(repetition);//on arrète le compte à rebours
    }
}
var repetition = setInterval(decompter, 2000);//toutes les 2 secondes -> ne pas surcharger le navigateur