oM=new makeCM("oM");
oM.resizeCheck=1;
oM.rows=1;
oM.onlineRoot="";
oM.pxBetween=0;
oM.fillImg="cm_fill.gif";
oM.fromTop=10;
oM.fromLeft=155;
oM.wait=300;
oM.zIndex=400;
oM.useBar=1;
oM.barWidth="100%";
oM.barHeight="menu";
oM.barX=0;
oM.barY="menu";
oM.barClass="clBar";
oM.barBorderX=0;
oM.barBorderY=0;
oM.level[0]=new cm_makeLevel(90,21,"clT","clTover",1,1,"clB",0,"bottom",0,0,0,0,0);
oM.level[1]=new cm_makeLevel(102,22,"clS","clSover",1,1,"clB",0,"right",0,0,"menu_arrow.gif",10,10);
oM.makeMenu('m2','','Individus','');
oM.makeMenu('m7','m2','Patronymes','','',150,0);
oM.makeMenu('m8','m2','Liste des individus','','',150,0);
oM.makeMenu('m9','m2','Fiches individuelles','','',150,0);
oM.makeMenu('m10','m2','Mon ascendance','','',150,0);
oM.makeMenu('m11','m2','Liste �clair','','',150,0);
var avail="40+((cmpage.x2-45)/2)";
oM.menuPlacement=new Array(42,avail+"-11");
oM.construct();