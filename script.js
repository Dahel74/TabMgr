var tabsMap = [];
var div = null;
document.addEventListener('DOMContentLoaded', function () {
    div = document.getElementById("container");
    if (div === null) {
        div = document.createElement("DIV");
        div.id = "container";
        document.body.appendChild(div);
    }
    chrome.windows.getAll({populate: true}, function (windows) {
        windows.forEach(function (window) {
            var id = window.id;
            tabsMap[id] = [];
            window.tabs.forEach(function (tab) {
                tabsMap[id][tab.id] = [];
                tabsMap[id][tab.id]["url"] = tab.url;
                tabsMap[id][tab.id]["icon"] = tab.favIconUrl;
                tabsMap[id][tab.id]["title"] = tab.title;
            });
        });
        loadTab();
    });
    document.getElementById("loader").addEventListener("click", function () {
        loadTab();
    })
});

var dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('dragElem');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('over');
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
        if (dragSrcEl != this) {
            this.parentNode.removeChild(dragSrcEl);
            var dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('beforebegin', dropHTML);
            var dropElem = this.previousSibling;
            addDnDHandlers(dropElem);
        }
    }
    this.classList.remove('over');
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('over');
}


function loadTab() {
    for (var tabsInWin in tabsMap) {
        var list = document.getElementById("listOfTab");
        if (list === null) {
            list = document.createElement("UL");
            list.id = "listOfTab";
            div.appendChild(list);
        }
        var nodeWindow = document.createElement("LI");
        nodeWindow.id = tabsInWin;
        var textNodeWindow = document.createTextNode("window " + tabsInWin);
        nodeWindow.appendChild(textNodeWindow);
        listTab = document.createElement("UL");
        for (var tabList in tabsMap[tabsInWin]) {
            var nodeTab = document.createElement("LI");
            nodeTab.id = tabList;
            nodeTab.draggable = "true";
            addDnDHandlers(nodeTab);
            nodeTab.windowid = tabsInWin;
            nodeTab.addEventListener("click", function () {
                chrome.tabs.update(parseInt(this.id), {active: true});
                chrome.windows.update(parseInt(this.windowid), {focused: true});
                window.close();
            });
            var image = document.createElement("img");
            image.setAttribute('src', tabsMap[tabsInWin][tabList]["icon"]);
            image.setAttribute('height', '16px');
            image.setAttribute('width', '16px');
            var textnode = document.createTextNode(" " + tabsMap[tabsInWin][tabList]["title"]);
            nodeTab.appendChild(image);
            nodeTab.appendChild(textnode);
            listTab.appendChild(nodeTab);
        }
        nodeWindow.appendChild(listTab);
        list.appendChild(nodeWindow)
    }
}
