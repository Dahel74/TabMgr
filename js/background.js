var winID;

chrome.browserAction.onClicked.addListener(function () {
    openWindow();
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === "toggle-feature") {
        openWindow();
    }
});

var repetition = setInterval(stockTabsMap, 1000);//toutes les 2 secondes -> ne pas surcharger le navigateur