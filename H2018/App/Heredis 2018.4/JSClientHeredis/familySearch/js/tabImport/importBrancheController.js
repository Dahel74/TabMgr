function importBrancheController(viewUtilsController){mainTabController.call(this,viewUtilsController),this.mainController=viewUtilsController.controller,this.aux=viewUtilsController.aux,this.stringsLocalised=viewUtilsController.stringsLocalised}importBrancheController.prototype=new mainTabController,importBrancheController.prototype.mainController=null,importBrancheController.prototype.fsApi=null,importBrancheController.prototype.stringsLocalised=null,importBrancheController.prototype.importFormModel=null,importBrancheController.prototype.importBrancheManager=null,importBrancheController.prototype.isImportCancelled=!1,importBrancheController.prototype.progressionFormModel=null,importBrancheController.prototype.displayImportFSView=function(callback){if(this.shouldReload){var self=this;self.viewUtilsController.aux.getCurrentUserNameAndFsid(function(userInfo){self.viewUtilsController.aux.getPC(self,function(infosPC){var chaineformateUserFS=self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_CURRENTUSER_LABEL+self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_FSID_OF_PERSON.replace("%s",userInfo.fsid),chaineFormatePC=self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_PC_LABEL+self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_FSID_OF_PERSON.replace("%s",infosPC.fsid),disablePcFsid=!1;""===infosPC.fsid&&(disablePcFsid=!0,chaineFormatePC=self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_PC_LABEL),""===userInfo.fsid&&(chaineformateUserFS=self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_CURRENTUSER_LABEL),self.viewUtilsController.htmlTemplates.getHtmlFileTemplate("./html/importBranche.html","#tabImportMainForm",function(){$("#part1").css("min-height","550px"),kendo.ui.NumericTextBox&&(kendo.ui.NumericTextBox.prototype.options=$.extend(!0,kendo.ui.NumericTextBox.prototype.options,{upArrowText:"",downArrowText:""}));var importCallback=function(context){var param={fsid:"",nbGenAsc:context.get("nbAscInputValue"),nbGenDesc:context.get("nbDescInputValue"),ancestorsChildren:context.get("importAncestorsChildren"),alternateNames:context.get("importAlternateNames")};"inputFsid"===context.get("selectedFsid")?param.fsid=context.get("importInputValue"):"currentUser"===context.get("selectedFsid")?param.fsid=context.get("currentUserFsFsid"):"pc"===context.get("selectedFsid")&&(param.fsid=param.fsid=context.get("fsidPC")),param.fsid=param.fsid.trim(),""===param.fsid?self.logErrorImport(404,param.fsid):null===param.nbGenAsc||null===param.nbGenDesc?self.logErrorImport(100,param.fsid):($("#logError").empty(),self.beginImport(param))},disableTextPCChoice=function(){self.importFormModel.disablePcFsid?$("#labelPc").css("opacity","0.5"):$("#labelPc").css("opacity","1")};self.importFormModel=kendo.observable({importWindowTitle:self.stringsLocalised.HNLOC_FS_IMPORT_FORM_TITLE,radioButtonSectionTitle:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_CHOICE_INDIVIDUAL_SECTION_TITLE,optionsSectionTitle:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_OPTIONS_SECTION_TITLE,labelInputFsid:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_INPUTFSID_LABEL,labelPc:chaineFormatePC,labelCurrentUser:chaineformateUserFS,labelNbGenAsc:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_NBGEN_ASC,labelNbGenDesc:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_NBGEN_DESC,labelImportAncestorChildren:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_CHILDREN_ANCESTOR,labelImportAlternateNames:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_ALTERNATE_NAMES,selectedFsid:"currentUser",disablePcFsid:disablePcFsid,disableInputFsid:!0,currentUserFsFsid:userInfo.fsid,fsidPC:infosPC.fsid,importInputValue:"",nbAscInputValue:4,nbDescInputValue:1,importAncestorsChildren:!1,importAlternateNames:!1,importTextButton:self.stringsLocalised.HNLOC_FS_IMPORT_BUTTON_TEXT,importAction:function(){importCallback(this)},keypress:function(e){13===e.keyCode&&importCallback(e.data)}}),self.importFormModel.bind("change",function(e){"inputFsid"===self.importFormModel.selectedFsid?(self.importFormModel.set("disableInputFsid",!1),$("#tfImportFSID").focus()):"currentUser"!==self.importFormModel.selectedFsid&&"pc"!==self.importFormModel.selectedFsid||self.importFormModel.set("disableInputFsid",!0),null===self.importFormModel.get("nbAscInputValue")&&self.importFormModel.set("nbAscInputValue",1),null===self.importFormModel.get("nbDescInputValue")&&self.importFormModel.set("nbDescInputValue",1),disableTextPCChoice(),self.saveFormImport()}),$("#tempDivImport").focus(function(){$(this).css("outline","none")}),self.getFormImportLastValues(),kendo.bind($("#tabImportMainForm"),self.importFormModel),disableTextPCChoice(),void 0!==callback&&callback(),self.shouldReload=!1})})})}else callback()},importBrancheController.prototype.saveFormImport=function(){var param={nbAsc:this.importFormModel.get("nbAscInputValue"),nbDesc:this.importFormModel.get("nbDescInputValue"),importAncestorsChildren:this.importFormModel.get("importAncestorsChildren"),importAlternateNames:this.importFormModel.get("importAlternateNames")};localStorage.setItem("fsid",this.importFormModel.get("importInputValue")),this.mainController.getEncryption().saveItemInCookie("form",JSON.stringify(param))},importBrancheController.prototype.getFormImportLastValues=function(){var params=null;""!==this.mainController.getEncryption().getItemInCookie("form")&&(params=JSON.parse(this.viewUtilsController.aux.getItemInCookie("form"))),null!==params&&(this.importFormModel.set("nbAscInputValue",params.nbAsc),this.importFormModel.set("nbDescInputValue",params.nbDesc),this.importFormModel.set("importAncestorsChildren",params.importAncestorsChildren),this.importFormModel.set("importAlternateNames",params.importAlternateNames));var fsid=localStorage.getItem("fsid");null!==fsid&&this.importFormModel.set("importInputValue",fsid)},importBrancheController.prototype.beginImport=function(params){var self=this,heredisApi=this.mainController.getHeredisApiCall();self.aux.IsConnectedToInternet(function(){self.importBrancheManager=new importBranche(self,params,self.mainController.getFsApiCall(),heredisApi),heredisApi.importFamilySearch("begin",""),self.isImportCancelled=!1,self.displayProgressionView("#progressionModalView",function(){self.startImport()})})},importBrancheController.prototype.startImport=function(){var self=this,heredisApiCall=this.mainController.getHeredisApiCall();self.importBrancheManager.getRootPersonInfo(function(state,data){"success"===state||"cancel"===state&&heredisApiCall.abortAllPendingRequests(function(){heredisApiCall.importFamilySearch(state,data),self.successCancelAction()})}),"undefined"!=typeof callback&&callback()},importBrancheController.prototype.cancelImport=function(){var self=this;if(this.isImportCancelled=!0,this.importBrancheManager.isStoppedByInternalError){var heredisApiCall=self.mainController.getHeredisApiCall();heredisApiCall.abortAllPendingRequests(function(){heredisApiCall.importFamilySearch("cancel",""),self.closeProgressionView("#progressionModalView")})}},importBrancheController.prototype.finishImport=function(){this.mainController.getHeredisApiCall().importFamilySearch(this.importBrancheManager.stateImport,this.importBrancheManager.dataImport.primaryPersonId,function(){})},importBrancheController.prototype.startSaveToLibImport=function(){this.progressionFormModel.set("isProgressMsgVisible",!0),this.progressionFormModel.set("isCancelEnabled",!1),this.progressionFormModel.set("logContainer",this.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_MSG_LOADING)},importBrancheController.prototype.successSaveToLibImport=function(nbIndi){this.progressionFormModel.set("isProgressMsgVisible",!0),this.progressionFormModel.set("logContainer",this.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_MSG_SUCCESS.replace("%s",nbIndi)),this.progressionFormModel.set("isCancelVisible",!1),this.progressionFormModel.set("isCloseVisible",!0),this.progressionFormModel.set("isSpinVisible",!1),kendo.ui.progress($("#spin"),!1)},importBrancheController.prototype.displayProgressionView=function(idContainer,callback){var self=this;this.viewUtilsController.htmlTemplates.getHtmlFileTemplate("./html/progressionImportView.html",idContainer,function(){self.progressionFormModel=kendo.observable({numberImportedPerson:0,indiName:"",isCancelEnabled:!0,isContinueVisible:!1,isProgressMsgVisible:!1,isCancelVisible:!0,isCloseVisible:!1,isSpinVisible:!1,nbImportedIndis:0,labelindiNameField:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_LABEL_INDINAME+self.stringsLocalised.HNLOC_FS_TAB_2_POINT,labelNumberImportedPersonField:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_LABEL_INDINUMBER+self.stringsLocalised.HNLOC_FS_TAB_2_POINT,cancelTextButton:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_BUTTON_CANCEL,continueTextButton:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_BUTTON_CONTINUE,closeTextButton:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_BUTTON_CLOSE,cancelAction:function(){self.startCancelAction(),self.cancelImport()},continueAction:function(){self.startImport(function(){self.progressionFormModel.set("isContinueVisible",!1)})},closeAction:function(){self.closeProgressionView(idContainer),self.finishImport()}}),kendo.bind($(idContainer),self.progressionFormModel);var window=$(idContainer);window.data("kendoWindow")?(window.data("kendoWindow").center(),window.data("kendoWindow").open()):window.kendoWindow({width:"450px",minWidth:"450px",maxWidth:"450px",height:"300px",maxHeight:"300px",minHeight:"300px",autoFocus:!0,actions:{},title:self.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_WINDOW_TITLE,position:{top:"5%",left:"30%"},modal:!0,activate:function(){self.progressionFormModel.set("isSpinVisible",!0),kendo.ui.progress($("#spin"),!0),$(document.body).keyup(function(e){e.keyCode===kendo.keys.ENTER?self.progressionFormModel.get("isCloseVisible")&&(self.closeProgressionView(idContainer),self.finishImport()):e.keyCode===kendo.keys.ESC&&(self.progressionFormModel.get("isCloseVisible")?(self.closeProgressionView(idContainer),self.finishImport()):self.progressionFormModel.get("isCloseVisible")||(self.startCancelAction(),self.cancelImport()))}),void 0!==callback&&callback()},close:function(){$(document.body).unbind("keyup")}}).data("kendoWindow").center().open()})},importBrancheController.prototype.updateProgressImport=function(name,nbIndividus){this.progressionFormModel.set("indiName",name),this.progressionFormModel.set("numberImportedPerson",nbIndividus)},importBrancheController.prototype.startCancelAction=function(){this.updateProgressImport("-","-"),this.progressionFormModel.set("isProgressMsgVisible",!0),this.progressionFormModel.set("logContainer",this.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_MSG_CANCELLING),this.progressionFormModel.set("isCancelEnabled",!1)},importBrancheController.prototype.successCancelAction=function(){this.progressionFormModel.set("logContainer",this.stringsLocalised.HNLOC_FS_PROGRESS_IMPORT_MSG_CANCELLING_DONE),this.closeProgressionView("#progressionModalView")},importBrancheController.prototype.closeProgressionView=function(idContainer){$(idContainer).data("kendoWindow").close()},importBrancheController.prototype.showContinueButtonImport=function(){this.progressionFormModel.set("isContinueVisible",!0)},importBrancheController.prototype.getMsgErrorImport=function(errorCode){var msg="";return msg=404===errorCode||403===errorCode?this.stringsLocalised.HNLOC_FS_TAB_RESULT_NO_DATA:410===errorCode?this.stringsLocalised.HNLOC_FS_COMPARE_UNEXISTING_PERSON_TEXT_PART2:400===errorCode?this.stringsLocalised.HNLOC_FS_ERROR_MSG_404_400:503===errorCode?this.stringsLocalised.HNLOC_FS_ERROR_MSG_503_PART1+"</br>"+this.stringsLocalised.HNLOC_FS_ERROR_MSG_503_PART2:504===errorCode?this.stringsLocalised.HNLOC_FS_ERROR_MSG_503_PART1+"</br>"+this.stringsLocalised.HNLOC_FS_ERROR_MSG_503_PART2:100===errorCode?this.stringsLocalised.HNLOC_FS_LOGIN_ERROR_MSG_MISSING_FIELD:this.stringsLocalised.HNLOC_FS_ERROR_MSG_503_PART1+"</br>"+this.stringsLocalised.HNLOC_FS_ERROR_MSG_503_PART2,console.log(errorCode),msg},importBrancheController.prototype.logErrorImport=function(errorCode,fsid){console.log(this.getMsgErrorImport(errorCode));var msg=this.getMsgErrorImport(errorCode).replace("%s",'<span id="fsidContainer" >'+fsid+"</span>");msg=msg.replace("%fsid",fsid),401===errorCode?self.mainController.getViewManager.refreshToken():this.viewUtilsController.htmlTemplates.getHtmlFileTemplate("../Common/htmlTemplate/alertMsgLogin.html","#logError",function(){$("#logError").find("#detailError").html(msg)})};