//
// javascript.js
// 17/04/2014
// Fonctions pour masquer les boutons lecture et pause - C�line LEYRIT
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
                  
   
    var datasHTML=null;

    $(function(){
      datasHTML=$('#mybook').html();
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
      //var nbPages= $('#mybook').find('.b-page');
      //$("#NBPages").html(nbPages.length - 4 + " " +LocalStrings["nbPage"]);
      //initFiltre();
      
    });
    
    
            /*############ SON ###################*/
    //r�cup�re le volume de la derni�re session
    if(typeof Cookies.get("volume") !== "undefined" && Cookies.get("volume") !== "undefined" ){
        $('#playerAudioDiapo')[0].volume = Cookies.get("volume");
    }
    //par defaut le son est � 0.5
    else{
        $('#playerAudioDiapo')[0].volume = "0.5";
        Cookies.set("volume", this.volume, {expires: 365});
    }
       
    //v�rifie si le son est d�activ� au d�marrage
    if(typeof Cookies.get("volumeIsMuted") !== "undefined"){
        if(Cookies.get("volumeIsMuted") === "true"){
            $('#playerAudioDiapo')[0].muted = true;
        }
        else if(Cookies.get("volumeIsMuted") === "false"){
            $('#playerAudioDiapo')[0].muted = false;
        }
     
    }
    //par d�faut on active le son
    else{
        $('#playerAudioDiapo')[0].isMuted = false;
        Cookies.set("volumeIsMuted", this.muted , {expires: 365});
    }
                  
    $('#playerAudioDiapo')[0].play();
    $('#playerAudioDiapo')[0].onvolumechange = function(){
        Cookies.set("volumeIsMuted", this.muted , {expires: 365});
        Cookies.set("volume", this.volume, {expires: 365});
    }
    /*#################### FENETRE PARAMETRE #######################*/
    $("#dialog-form").html(templateForm);
                  
    dialog = $( "#dialog-form" ).dialog({
                autoOpen: false,
                height: 480,
                width: 452,
                modal: true,
                title:LocalStrings["title"],
                close:function(){
                        // et on le remet en marche � la sortie
                        $('#mybook').booklet("enable") ;
                },
                open:function(){
                    // on met en pause le diaporama
                    $('#mybook').booklet("disable") ;
                    
                    $("#dialog-form").html(templateForm);
                    var listeFiltreApplique=[];
                    if(getFiltre("prive")==="0"){
                        $('input[name=prive]').attr('checked','checked');
                    }
                                        
                    if(getFiltre("prive")==="2"){
                        mediaPrive=true;
                    }
                                        
                    for(var i=0;i<IndiFilters.length;i++){
                        $('input[name="' + IndiFilters[i] + '"][value='+getFiltre(IndiFilters[i])+']').attr('checked','checked');
                    }
                    $(".ui-dialog-titlebar-close").css( {
                        visibility: "hidden"
                    });
                    
                    $("#cancel").css({
                        position: "absolute",
                        left: "22px"
                    });
                    $(".tabParametre").css({
                        "margin-top":"40px"
                    });
                    $(".tabParametre td ").css("height",'50px');
                    $(".tabParametre td ").css("text-align",'center');
                    $(".tabParametre th ").css("height",'30px');
                    $(".tabParametre th ").css("width",'100px');
                    $(".tabParametre th ").css("font-weight",'normal');
                    $(".tabParametre th#checkBoxPrivate ").css("width",'10px');
                                        
                    $(".labelfiltre").css("text-align",'left');
                    $("#LabelPrivateMedia").css({
                            "text-align":'left',
                            width:"260px"
                    });
                },
                buttons: {
                    "annuler":{
                           text: StringCancelButton,
                           id: "cancel",
                           click:function(){
                                        dialog.dialog( "close" );
                           }
                    },
                    "Ok":{
                      id:"ok",
                      text:StringOkButton,
                      click:function(){
                         var filterValues= "";
                         var mediaPrive="";
                         
                         if($('input[name="prive"]').is(":checked") === false){
                            saveFiltre("prive", "1");
                            mediaPrive="1";
                         }
                         else if($('input[name="prive"]').is(":checked") === true){
                            saveFiltre("prive", "0");
                            mediaPrive="0";
                         }
                         for(var i=0;i<IndiFilters.length;i++){
                            filterValues += IndiFilters[i] + "=" + $('input[name="'+ IndiFilters[i] +'"]:checked').val()+"&";
                            saveFiltre(IndiFilters[i] ,$('input[name=' + '"' + IndiFilters[i] + '"' + ']:checked').val());
                         }
                         location.href="hcommand-filter?" + filterValues  + "private="+mediaPrive;
                         dialog.dialog( "close" );
                      }
                    }
                    
                 }
                });
    $( "#BtnParam" ).click(function(){
        dialog.dialog( "open" );
    });
    $("#BtnExport").click(function(){
        var filterValues= "";
        for(var i=0;i<IndiFilters.length;i++){
            filterValues += IndiFilters[i] + "=" + getFiltre(IndiFilters[i])+"&";
        }
        location.href="hcommand-export?" + filterValues  + "private="+getFiltre("prive");
    });
                  
    /*########### SAUVEGARDE PARAMETRE DANS LES COOKIES ################*/
    function resetCookies(){
        
        for(var i=0;i<IndiFilters.length;i++){
            Cookies.remove(IndiFilters[i]);
        }
        Cookies.remove("evt ");
        Cookies.remove("prive");
        Cookies.remove("profession");
        Cookies.remove("union");
        Cookies.remove("volume");
        Cookies.remove("volumeIsMuted");
    }
     function getFiltre(index){
        if(typeof Cookies.get(index) !== 'undefined'){
            return Cookies.get(index);
        }
        else{
            if(index === "prive") return "0";
            else return "1";
           
            
        }
     };
     function saveFiltre(index,value){
        Cookies.set(index, value, {expires: 365});
     };
     
     //inititalisation des valeurs des �l�ments du formulaire par rapport au donn�e du cache
     function initFiltre(){
        /*var listeFiltreApplique=[];
        var mediaPrive=false;
        if(getFiltre("prive")==="1"){
            mediaPrive=true;
        }
        else{
             $('input[name=prive]').attr('checked','checked');
             mediaPrive=false;
        }
                  
        for(var i=0;i<IndiFilters.length;i++){
           $('input[name="' + IndiFilters[i] + '"][value='+getFiltre(IndiFilters[i])+']').attr('checked','checked');
           if(getFiltre(IndiFilters[i]) !== "3"){
                listeFiltreApplique.push([IndiFilters[i] ,getFiltre(IndiFilters[i])]);
           }
        }*/
        //filtrerMedia(listeFiltreApplique , mediaPrive);
     }
      
     /*####### GESTION DU FILTRE DU DIAPORAMA###################*/
     function filtrerMedia(listFiltre, mediaPrive){
        var selectorFiltre = ".PageTitre , .PageFin ";//chaine des s�lecteurs par d�faut lorsque le filtre n'est pas vide
        var selectorMediaPrive="";
       
        // on v�rifie que le filtre prive ne rentre pas dans le selecteur , les m�dias priv�s sont a exclure si on choisit l'option dans les param�tres
        if(mediaPrive) selectorMediaPrive=".prive";
        else selectorMediaPrive="";
        
        //lorsque des filtres ont �t� appliqu�s sur le diaporama
        if(listFiltre.length>0){
            //on parcourt chaque �l�ment de la liste et on remplit le selecteur jquery
            for(var i=0; i<listFiltre.length;i++){
                    if(i === 0  &&  listFiltre.length === 1){
                  
                        selectorFiltre += ' , ';
                        if(listFiltre[i][1] === "2"){
                            selectorFiltre += '.'+ listFiltre[i][0] + '.principal' ;
                        }
                        else if(listFiltre[i][1] === "1"){
                            selectorFiltre +='.' + listFiltre[i][0];
                        }
                    }
                    //lorsqu'on se trouve sur le premier �l�ment on rajoute une virgule � la fin du s�l�cteur si il y a un autre s�lecteur apr�s
                    else if(i === 0  &&  listFiltre.length >1){
                        selectorFiltre += ' , ';
                        if(listFiltre[i][1] === "2"){
                            selectorFiltre += '.'+ listFiltre[i][0] + '.principal' ;
                        }
                        else if(listFiltre[i][1] === "1"){
                  
                            selectorFiltre +=  '.' + listFiltre[i][0];
                        }
                        selectorFiltre += ' , ';
                  
                    }
                    else if(i !== 0){//on se trouve dans le cas o� on n'est pas sur le premier �l�ment
                        //on place un s�parateur avant le selecteur lorsque son �l�ment pr�c�dent est non vide
                        if(listFiltre[i][1] === "2"){
                            selectorFiltre += '.' + listFiltre[i][0] + '.principal';
                        }
                        else if(listFiltre[i][1] === "1"){
                            selectorFiltre += '.' + listFiltre[i][0];
                  
                        }
                  
                        //on place un s�parateur avant le selecteur lorsque son �l�ment suivant  est non vide
                        if(listFiltre[i+1] !== undefined){
                            selectorFiltre += ' , ';
                        }
                    }
          }
          for (var j = 0 ; j< listFiltre.length;j++){
                  if(listFiltre.length === 1){
                    selectorFiltre+= ', .PageChapitre.'+listFiltre[j][0];
                  }
                  else{
                    if(j === 0){
                        selectorFiltre+= ', ';
                        selectorFiltre+= '.PageChapitre.'+listFiltre[j][0]+' ,';
                    }
                    else if(j > 0 && j<listFiltre.length-1){
                        selectorFiltre+= '.PageChapitre.'+listFiltre[j][0]+' ,';
                    }
                    else if(j === listFiltre.length-1){
                        selectorFiltre+= '.PageChapitre.'+listFiltre[j][0];
                    }
                  }
          }
          
            
        }
        else{
            selectorFiltre = ".PageTitre , .PageFin";
        }
                
        if(typeof $('#mybook').data('booklet') !== "undefined") $('#mybook').data('booklet').destroy();
        $('#mybook').html(datasHTML);//on remplit le booklet par les donn�es de base et on se base la dessus pour s�lectionner les �l�ments dans la chaine de s�lecteurs
        if(selectorFiltre !== ""){
            var f=null;
            //$('#mybook').find('.PageChapitre')[1].remove();
                 
            /*On exclut les m�dias priv�s du r�sultat du filtre sinon on affiche le r�sultat du filtre */
            if(mediaPrive){
                  f=$('#mybook').find(selectorFiltre);
            }
            else if(!mediaPrive){
                  f=$('#mybook').find(selectorFiltre).not('.prive');
            }
            $('#mybook').html(f);
            
        }
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
          //var nbPages= $('#mybook').find('.b-page');
          //$("#NBPages").html(nbPages.length - 4 + " " +LocalStrings["nbPage"]);
    }
});
