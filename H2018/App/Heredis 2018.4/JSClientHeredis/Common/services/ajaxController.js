function AjaxController(port,uuid,password){this.port=port,this.uuid=uuid,$.xhrPool=[],$.xhrPool.abortAll=function(callback){$(this).each(function(i,xhr){xhr.abort(),$.xhrPool.splice(i,1)}),void 0!==callback&&callback()},this.setupHeredisPassword=function(password){$.ajaxSetup({beforeSend:function(xhr){xhr.setRequestHeader("Authorization","Basic "+btoa("Heredis:"+password)),$.xhrPool.push(xhr)},complete:function(xhr){var i=$.xhrPool.indexOf(xhr);i>-1&&$.xhrPool.splice(i,1)}})},this.setupHeredisPassword(password),this.getBaseUrl=function(){return"http://127.0.0.1:"+this.port},this.getToken=function(){return"Basic "+btoa("Heredis:"+password)},this.username="Heredis"}AjaxController.prototype.username="",AjaxController.prototype.test=function(){$.ajax({url:this.getBaseUrl()+"/libheredis/request/test",type:"POST",data:{uuid:uuid},success:function(data){console.log(data)}})},AjaxController.prototype.abortAll=function(callback){$.xhrPool.abortAll(callback)};