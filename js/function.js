// Variable initialize when working without chrome extensions
var tabsMap = [];

function loadMockGroup() {
    tabsMap[48] = [];
    tabsMap[48][57] = [];
    tabsMap[48][57]["url"] = "http://www.cpabien.cx/torrents/films";
    tabsMap[48][57]["icon"] = "http://www.cpabien.cx/themes/default/img/favicon.ico";
    tabsMap[48][57]["title"] = "Torrent";
    tabsMap[48][59] = [];
    tabsMap[48][59]["url"] = "http://www.cpabien.cx/torrents/series";
    tabsMap[48][59]["icon"] = "http://www.cpabien.cx/themes/default/img/favicon.ico";
    tabsMap[48][59]["title"] = "Torrent";
    tabsMap[48][61] = [];
    tabsMap[48][61]["url"] = "http://www.cpabien.cx/torrents/jeux";
    tabsMap[48][61]["icon"] = "http://www.cpabien.cx/themes/default/img/favicon.ico";
    tabsMap[48][61]["title"] = "Torrent";
    tabsMap[48][63] = [];
    tabsMap[48][63]["url"] = "http://www.cpabien.cx/torrents/musiques";
    tabsMap[48][63]["icon"] = "http://www.cpabien.cx/themes/default/img/favicon.ico";
    tabsMap[48][63]["title"] = "Torrent";
    tabsMap[48][65] = [];
    tabsMap[48][65]["url"] = "https://yggtorrent.com/torrents/filmvideo/2184-serie-tv?&page=25";
    tabsMap[48][65]["icon"] = "https://yggtorrent.com/static/images/favicon.png";
    tabsMap[48][65]["title"] = "Yggtorrent";
    tabsMap[48][1053] = [];
    tabsMap[48][1053]["url"] = "https://yggtorrent.com/torrent/filmvid%C3%A9o/s%C3%A9rie-tv/113903-ncis+s14e21+french+720p+hdtv+x264-sh0w";
    tabsMap[48][1053]["icon"] = "https://yggtorrent.com/static/images/favicon.png";
    tabsMap[48][1053]["title"] = "Télécharger NCIS.S14E21.FRENCH.720p.HDTV.x264-SH0W - Yggtorrent";
    tabsMap[48][67] = [];
    tabsMap[48][67]["url"] = "https://yggtorrent.com/engine/search?q=webstorm";
    tabsMap[48][67]["icon"] = "https://yggtorrent.com/static/images/favicon.png";
    tabsMap[48][67]["title"] = "Yggtorrent";
    tabsMap[48][69] = [];
    tabsMap[48][69]["url"] = "http://www.torrents9.pe/torrents_films.html";
    tabsMap[48][69]["icon"] = "http://www.torrents9.pe/favicon.ico";
    tabsMap[48][69]["title"] = "Torrents9.pe - Films";
    tabsMap[48][985] = [];
    tabsMap[48][985]["url"] = "http://www.torrents9.pe/torrents_series.html";
    tabsMap[48][985]["icon"] = "http://www.torrents9.pe/favicon.ico";
    tabsMap[48][985]["title"] = "Torrents9.pe - Séries";
    tabsMap[48][73] = [];
    tabsMap[48][73]["url"] = "http://www.torrents9.pe/torrents_musique.html";
    tabsMap[48][73]["icon"] = "http://www.torrents9.pe/favicon.ico";
    tabsMap[48][73]["title"] = "Torrents9.pe - Musique";
    tabsMap[48][75] = [];
    tabsMap[48][75]["url"] = "http://www.torrents9.pe/torrents_musique.html";
    tabsMap[48][75]["icon"] = "http://www.torrents9.pe/favicon.ico";
    tabsMap[48][75]["title"] = "Torrents9.pe - Musique";
    tabsMap[48][1029] = [];
    tabsMap[48][1029]["url"] = "https://mobile.free.fr/moncompte/index.php?page=telephones";
    tabsMap[48][1029]["icon"] = "https://mobile.free.fr/images/favicon.ico";
    tabsMap[48][1029]["title"] = "Free Mobile - Bienvenue dans votre Espace Abonné";
    tabsMap[611] = [];
    tabsMap[611][49] = [];
    tabsMap[611][49]["url"] = "https://www.facebook.com/";
    tabsMap[611][49]["icon"] = "https://www.facebook.com/rsrc.php/yl/r/H3nktOa7ZMg.ico";
    tabsMap[611][49]["title"] = "(42) Facebook";
    tabsMap[611][51] = [];
    tabsMap[611][51]["url"] = "https://www.flickr.com/";
    tabsMap[611][51]["icon"] = "https://s.yimg.com/pw/favicon.ico";
    tabsMap[611][51]["title"] = "Accueil | Flickr";
    tabsMap[611][589] = [];
    tabsMap[611][589]["url"] = "https://www.ecoledirecte.com/Eleves/6351/CahierDeTexte";
    tabsMap[611][589]["icon"] = "https://www.ecoledirecte.com/favicon.ico";
    tabsMap[611][589]["title"] = "EcoleDirecte";
    tabsMap[611][804] = [];
    tabsMap[611][804]["url"] = "https://developer.chrome.com/extensions/tabs#method-update";
    tabsMap[611][804]["icon"] = "https://www.google.com/images/icons/product/chrome-32.png";
    tabsMap[611][804]["title"] = "chrome.tabs - Google Chrome";
    tabsMap[611][906] = [];
    tabsMap[611][906]["url"] = "http://jsfiddle.net/54QM2/1/";
    tabsMap[611][906]["icon"] = "http://jsfiddle.net/favicon.png";
    tabsMap[611][906]["title"] = "Edit fiddle - JSFiddle";
    tabsMap[611][910] = [];
    tabsMap[611][910]["url"] = "https://code.jquery.com/jquery/";
    tabsMap[611][910]["icon"] = "undefined";
    tabsMap[611][910]["title"] = "jQuery Core – All Versions | jQuery CDN";
    tabsMap[611][1064] = [];
    tabsMap[611][1064]["url"] = "http://localhost/web/Damien/test/";
    tabsMap[611][1064]["icon"] = "http://localhost/favicon.ico";
    tabsMap[611][1064]["title"] = "Test Interface Tab Manager";
    tabsMap[611][1068] = [];
    tabsMap[611][1068]["url"] = "http://getbootstrap.com/docs/3.3/examples/theme/";
    tabsMap[611][1068]["icon"] = "http://getbootstrap.com/favicon.ico";
    tabsMap[611][1068]["title"] = "Theme Template for Bootstrap";
    tabsMap[611][1074] = [];
    tabsMap[611][1074]["url"] = "https://stackoverflow.com/questions/16965780/concatenating-numbers-as-string-in-javascript";
    tabsMap[611][1074]["icon"] = "https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico?v=4f32ecc8f43d";
    tabsMap[611][1074]["title"] = "Concatenating numbers as string in Javascript - Stack Overflow";
    tabsMap[617] = [];
    tabsMap[617][53] = [];
    tabsMap[617][53]["url"] = "https://www.rtbf.be/sport/direct/motor/formule-1/85/grand-prix-du-mexique/result/4107/course";
    tabsMap[617][53]["icon"] = "https://www.static.rtbf.be/news/sport/ico/favicon-sport-32x32.png";
    tabsMap[617][53]["title"] = "Résultats - Grand Prix du Mexique - Formule 1 - Sports mécaniques - RTBF";
    tabsMap[617][55] = [];
    tabsMap[617][55]["url"] = "https://www.rtbf.be/sport/direct/motor/formule-1/classement";
    tabsMap[617][55]["icon"] = "https://www.static.rtbf.be/news/sport/ico/favicon-sport-32x32.png";
    tabsMap[617][55]["title"] = "Classement - Formule 1 - Sports mécaniques - RTBF";
    tabsMap[618] = [];
    tabsMap[618][56] = [];
    tabsMap[618][56]["url"] = "https://www.rtbf.be/sport/direct/motor/formule-1/85/grand-prix-du-mexique/result/4107/course";
    tabsMap[618][56]["icon"] = "https://www.static.rtbf.be/news/sport/ico/favicon-sport-32x32.png";
    tabsMap[618][56]["title"] = "Résultats - Grand Prix du Mexique - Formule 1 - Sports mécaniques - RTBF";
    displayGroup();
}

function loadGroup() {
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
        displayGroup();
    });
}

//  Launche the window
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
    // todo: use of chrome.windows.getAll in extensions
    if (window.location.toString().indexOf("extension") > 0) {
        loadGroup();
    } else {
        loadMockGroup();
    }
    // call an array instead when test page
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
    group.className += " panel panel-primary";
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
    group.appendChild(content);
    column.appendChild(group);
    return column;
}

function createGroup() {
    var container = document.getElementById("main");
    var group = createPanel();
    container.appendChild(group);
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
    var title = document.createElement("H6");
    title.className += " panel-title";
    title.style.whiteSpace = "nowrap";
    title.style.textOverflow = "ellipsis";
    title.style.overflow = "hidden";
    var icon = document.createElement("IMG");
    icon.setAttribute('src', tabArray["icon"]);
    icon.setAttribute('height', '16px');
    icon.setAttribute('width', '16px');
    icon.addEventListener('error', function () {
        this.setAttribute('src', "image/404.png");
    });
    title.appendChild(icon);
    title.appendChild(document.createTextNode(" " + tabArray["title"]));
    tabTitle.appendChild(title);
    // todo: get an image of the tab content
    var content = document.createElement("DIV");
    content.className += " panel-boby";
    content.style.height = "50px";
    content.style.whiteSpace = "nowrap";
    content.style.textOverflow = "ellipsis";
    content.style.overflow = "hidden";
    content.style.fontSize = "10px";
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

