AjaxController.prototype.getNodelist=function(centralid,callback){$.ajax({url:this.getBaseUrl()+"/libheredis/extendedFamilly/nodelist",type:"POST",dataType:"json",data:{uuid:this.uuid,centralId:centralid},success:function(data){void 0!==callback&&callback(data)},error:function(){callback({nodeList:{},individuList:{}})}})},AjaxController.prototype.getCurrentTheme=function(callback){$.ajax({url:this.getBaseUrl()+"/libheredis/theme/core",type:"POST",dataType:"json",success:function(data){void 0!==callback&&callback(data)},error:function(e){console.log(e)}})},AjaxController.prototype.getContextMenuContent=function(codeIdIndi,callback){$.ajax({url:this.getBaseUrl()+"/libheredis/extendedFamilly/contextMenu",type:"POST",dataType:"json",data:{uuid:this.uuid,individuId:codeIdIndi},success:function(data){void 0!==callback&&callback(data)},error:function(){callback({nodeList:{},individuList:{}})}})},AjaxController.prototype.navigSaisieIndi=function(individuId,callback){individuId<=0||$.ajax({url:this.getBaseUrl()+"/libheredis/appServices/navigate/individu",type:"POST",data:{uuid:this.uuid,codeIdIndi:individuId,sousOnglet:"saisieIndividu"},success:function(data){void 0!==callback&&callback(data)},error:function(e){console.log("Action not implemented !")}})},AjaxController.prototype.changeCentralIndividu=function(individuId,callback){$.ajax({url:this.getBaseUrl()+"/libheredis/appServices/navigate/individu",type:"POST",data:{uuid:this.uuid,codeIdIndi:individuId},success:function(data){void 0!==callback&&callback(data)},error:function(e){console.log("Action not implemented !")}})},AjaxController.prototype.changeRootIndividu=function(individuId,callback){$.ajax({url:this.getBaseUrl()+"/libheredis/appServices/navigate/changeRootIndividu",type:"POST",data:{uuid:this.uuid,individuId:individuId},success:function(data){void 0!==callback&&callback(data)},error:function(e){console.log("Action not implemented !")}})},AjaxController.prototype.addToFavorites=function(individuId,callback){$.ajax({url:this.getBaseUrl()+"/libheredis/appServices/navigate/addToFavorites",type:"POST",data:{uuid:this.uuid,individuId:individuId},success:function(data){void 0!==callback&&callback(data)},error:function(e){console.log("Action not implemented !")}})},AjaxController.prototype.printFicheIndividu=function(individuId,callback){$.ajax({url:this.getBaseUrl()+"/libheredis/appServices/navigate/printFicheIndividu",type:"POST",data:{uuid:this.uuid,individuId:individuId},success:function(data){void 0!==callback&&callback(data)},error:function(e){console.log("Action not implemented !")}})},AjaxController.prototype.printFicheUnion=function(unionId,individuId,callback){$.ajax({url:this.getBaseUrl()+"/libheredis/appServices/navigate/printFicheUnion",type:"POST",data:{uuid:this.uuid,unionId:unionId,individuId:individuId},success:function(data){void 0!==callback&&callback(data)},error:function(e){console.log("Action not implemented !")}})},AjaxController.prototype.addNewIndividu=function(callback){$.ajax({url:this.getBaseUrl()+"/libheredis/appServices/navigate/addNewIndividu",type:"POST",data:{uuid:this.uuid},success:function(data){void 0!==callback&&callback(data)},error:function(e){console.log("Action addNewIndividu not implemented !")}})},AjaxController.prototype.addNewParent=function(childId,parentType,callback){$.ajax({url:this.getBaseUrl()+"/libheredis/appServices/navigate/addNewParent",type:"POST",data:{uuid:this.uuid,childId:childId,parentType:parentType},success:function(data){void 0!==callback&&callback(data)},error:function(e){console.log("Action addNewParent not implemented !")}})};