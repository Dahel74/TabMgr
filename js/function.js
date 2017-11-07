// Variable initialize when working without chrome extensions
var tabsMap = [];

function convertArrayToJSON(arr) {
    var result = "{";
    var subresult = "";
    for (var i in arr) {
        if (arr[i] instanceof Array) {
            subresult = convertArrayToJSON(arr[i]);
        } else {
            subresult = '"' + encodeURI(arr[i]) + '"';
        }
        result += "\"" + i + "\": " + subresult + ","
    }
    result = result.substr(0, result.length - 1);
    result += "}";
    return result;
}

function convertJSONToArray(str) {
    var result = JSON.parse(str);
    return result;
}

function stockTabsMap() {
    var tabsMapTmp = [];
    chrome.windows.getAll({populate: true}, function (windows) {
        windows.forEach(function (window) {
            var id = window.id;
            tabsMapTmp[id] = [];
            window.tabs.forEach(function (tab) {
                tabsMapTmp[id][tab.id] = [];
                tabsMapTmp[id][tab.id]["url"] = tab.url;
                tabsMapTmp[id][tab.id]["icon"] = tab.favIconUrl;
                tabsMapTmp[id][tab.id]["title"] = tab.title;
            });
        });
        var result = convertArrayToJSON(tabsMapTmp);
        chrome.storage.sync.set({"tabsMap": result}, function () {
            console.log("dataIsStore " + result);
        });
    });
}

function loadGroup() {
    var result = "";
    chrome.storage.sync.get("tabsMap", function (object) {
        result = object['tabsMap'];
        tabsMap = convertJSONToArray(result);
        displayGroup();
    });
}

//  Launch the window
function openWindow() {
    chrome.windows.create(
        {
            type: "popup",
            url: chrome.extension.getURL('index.html'),
            state: "maximized",
            focused: true
        },
        function (window) {
            winID = window.id;
        }
    )
}

// Launch when the document is ready
function ready() {
    // Code to run when the document is ready.
    // add action on click
    var button = document.getElementById("addGroup");
    button.addEventListener("click", function () {
        addGroup();
    });
    // get the current group on the client
    getGroup();
}

// Get the list of group with tab in it
// return: boolean
function getGroup() {
    loadGroup();
}

// Add a new group
function addGroup() {
    createGroup();
}

function displayGroup() {
    var container = document.getElementById("main");
    for (var windowId in tabsMap) {
        var column = createPanel(windowId, tabsMap);
        container.appendChild(column);
    }
}

function createPanel(windowId, tabsMap) {
    if (typeof windowId === 'undefined') windowId = "new";
    if (typeof tabsMap === 'undefined') {
        tabsMap = [];
        tabsMap["new"] = [];
    }
    var column = document.createElement("DIV");
    column.className += " col-md-6 col-xs-6";
    var group = document.createElement("DIV");
    group.id = windowId;
    group.className += " panel panel-primary ";
    var groupTitle = document.createElement("DIV");
    groupTitle.className += " panel-heading";
    var title = document.createElement("H4");
    title.className += " panel-title";
    title.appendChild(document.createTextNode("Group " + windowId));
    groupTitle.appendChild(title);
    group.appendChild(groupTitle);
    var content = document.createElement(("DIV"));
    content.className += " panel-body";
    var tabsWin = tabsMap[windowId];
    for (var tabId in tabsWin) {
        if (tabsWin.hasOwnProperty(tabId)) {
            content.appendChild(createMiniTab(tabId, windowId, tabsMap[windowId][tabId]));
        }
    }
    content.appendChild(createInvisibleMiniTab());
    group.appendChild(content);
    column.appendChild(group);
    return column;
}

function createGroup() {
    var container = document.getElementById("main");
    var group = createPanel();
    container.appendChild(group);
}

function createInvisibleMiniTab() {
    var column = document.createElement("DIV");
    column.id = "0";
    column.className += " col-md-3 col-xs-3 masked";
    column.draggable = true;
    var tab = document.createElement("DIV");
    tab.className += " panel panel-success";
    var tabTitle = document.createElement("DIV");
    tabTitle.className += " panel-heading";
    var title = document.createElement("H6");
    title.className += " panel-title";
    title.style.whiteSpace = "nowrap";
    title.style.textOverflow = "ellipsis";
    title.style.overflow = "hidden";
    title.appendChild(document.createTextNode("empty"));
    tabTitle.appendChild(title);
    // todo: get an image of the tab content
    var content = document.createElement("DIV");
    content.className += " panel-boby";
    content.style.height = "40px";
    tab.appendChild(tabTitle);
    tab.appendChild(content);
    column.appendChild(tab);
    addDnDHandlers(column);
    return column;
}

function createMiniTab(tabId, windowId, tabArray) {
    var column = document.createElement("DIV");
    column.id = tabId;
    column.className += " col-md-3 col-xs-3";
    column.draggable = true;
    column.windowId = windowId;
    var tab = document.createElement("DIV");
    tab.className += " panel panel-success";
    var tabTitle = document.createElement("DIV");
    tabTitle.className += " panel-heading";
    tabTitle.title = decodeURI(tabArray["title"]);
    var title = document.createElement("H6");
    title.className += " panel-title";
    title.style.whiteSpace = "nowrap";
    title.style.textOverflow = "ellipsis";
    title.style.overflow = "hidden";
    var icon = document.createElement("IMG");
    icon.setAttribute('src', tabArray["icon"]);
    icon.setAttribute('height', '12px');
    icon.setAttribute('width', '12px');
    icon.addEventListener('error', function () {
        this.setAttribute('src', "image/404.png");
    });
    title.appendChild(icon);
    title.appendChild(document.createTextNode(" " + decodeURI(tabArray["title"])));
    tabTitle.appendChild(title);
    // todo: get an image of the tab content
    var content = document.createElement("DIV");
    content.className += " panel-boby";
    content.style.height = "40px";
    content.style.whiteSpace = "nowrap";
    content.style.textOverflow = "ellipsis";
    content.style.overflow = "hidden";
    content.style.fontSize = "10px";
    content.title = tabArray["url"];
    content.appendChild(document.createTextNode(tabArray["url"]));
    tab.appendChild(tabTitle);
    tab.appendChild(content);
    column.appendChild(tab);
    addDnDHandlers(column);
    column.addEventListener("click", function () {
        chrome.tabs.update(parseInt(this.id), {active: true});
        chrome.windows.update(parseInt(this.windowId), {focused: true});
        window.close();
    });
    return column;
}

// drag and drop
var dragSrcEl = null;

function handleDragStart(e) {
    // Target (this) element is the source node.
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('dragElem');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.classList.add('over');
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
}

function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }
    if (dragSrcEl !== this) {
        dragSrcEl.parentNode.removeChild(dragSrcEl);
        var dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        var dropElem = this.previousSibling;
        addDnDHandlers(dropElem);
    }
    this.classList.remove('over');
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('over');
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
}

