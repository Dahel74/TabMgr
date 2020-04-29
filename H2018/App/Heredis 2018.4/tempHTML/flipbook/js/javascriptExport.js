//
// javascript.js
// 17/04/2014
// Fonctions pour masquer les boutons lecture et pause - Céline LEYRIT
//

function etatChangePause()
{
	document.getElementById("pause").style.visibility = "hidden";
	document.getElementById("play").style.visibility = "visible";
}

function etatChangePlay()
{
	document.getElementById("play").style.visibility = "hidden";
	document.getElementById("pause").style.visibility = "visible";
}

$(document).ready(function () {
                  
    $(function(){
        $('#mybook').booklet({width: '98%',
                             height: '98%',
                             auto: true,
                             play: '#play',
                             pause: '#pause',
                             delay: 5000,
                             closed: true,
                             arrows: true,
                             covers: true,
                             arrowsHide: true,
                             menu: '#custom-menu',
                             chapterSelector: true,
                             pageSelector: false
                             });
//          var nbPages= $('#mybook').find('.b-page');
//          $("#NBPages").html(nbPages.length - 4 + " " +LocalStrings["nbPage"]);
  });
});
