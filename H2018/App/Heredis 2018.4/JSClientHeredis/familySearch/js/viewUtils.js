function viewUtils(controller,stringsLocalised,htmlTemplates){this.aux=controller.getAuxFunctions(),this.stringsLocalised=stringsLocalised,this.htmlTemplates=htmlTemplates,this.controller=controller,this.NocontentMessage=this.stringsLocalised.HNLOC_FS_TAB_RESULT_NO_DATA,this.mapSexeStringsIndi={63:stringsLocalised.HNLOC_FS_SEXE_UNDETERMINED,102:stringsLocalised.HNLOC_FS_SEXE_WOMAN,109:stringsLocalised.HNLOC_FS_SEXE_MAN},this.primaryPersonController=new primaryPersonController(this),this.importBranchController=new importBrancheController(this),this.activeTab=""}viewUtils.prototype.aux=null,viewUtils.prototype.stringsLocalised=null,viewUtils.prototype.htmlTemplates=null,viewUtils.prototype.NocontentMessage=null,viewUtils.prototype.primaryPersonController=null,viewUtils.prototype.importBranchController=null,viewUtils.prototype.activeTab=null,viewUtils.prototype.mainPageModel=null,viewUtils.prototype.progressionFormModel=null,viewUtils.prototype.mapSexeStringsIndi=null,viewUtils.prototype.hasPrimaryPerson=!1,viewUtils.prototype.loginFormModel=null,viewUtils.prototype.NeedRefreshToken=!1,viewUtils.prototype.displayLoginView=function(idElement,callback){var idContainer="#mainContent";""!==idElement&&(idContainer=idElement);var self=this;this.htmlTemplates.getHtmlFileTemplate("./html/login.html",idContainer,function(){self.loginFormModel=kendo.observable({loginSectionTitle:self.stringsLocalised.HNLOC_FS_SECTION_LOGIN_TITLE,newUserSectionTitle:self.stringsLocalised.HNLOC_FS_SECTION_NEWUSER_TITLE,usernameLabel:self.stringsLocalised.HNLOC_FS_USERNAME_LABEL,pwdLabel:self.stringsLocalised.HNLOC_FS_PASSWORD_LABEL,usernamePlaceholder:self.stringsLocalised.HNLOC_FS_USERNAME_LABEL,pwdInputPlaceholder:self.stringsLocalised.HNLOC_FS_PASSWORD_LABEL,buttonConnectText:self.stringsLocalised.HNLOC_FS_BUTTON_CONNECT,buttonCreateAccountText:self.stringsLocalised.HNLOC_FS_BUTTON_CREATE_ACCOUNT,noAccountText:self.stringsLocalised.HNLOC_FS_LOGIN_NO_ACCOUNT,rememberMeText:self.stringsLocalised.HNLOC_FS_LOGIN_CHECKBOX_REMEMBERME,RememberIsChecked:!1,usernameForgotLinktext:self.stringsLocalised.HNLOC_FS_LOGIN_USERNAME_LINK_TEXT,pwdForgotLinkLabelText:self.stringsLocalised.HNLOC_FS_LOGIN_PWD_LINK_TEXT,orText:self.stringsLocalised.HNLOC_FS_LOGIN_OR,forgotText:self.stringsLocalised.HNLOC_FS_FORGOT,Requirements_1:self.stringsLocalised.HNLOC_FS_MODALWINDOW_REQUIREMENTS_1,Requirements_2:self.stringsLocalised.HNLOC_FS_MODALWINDOW_REQUIREMENTS_2,privacyPolicyString:self.stringsLocalised.HNLOC_FS_PRIVACY_POLICY,privacyPolicyHref:"#",dotString:self.stringsLocalised.HNLOC_FS_TAB_POINT,connect:function(){self.aux.submitFormLogin(this.get("usernameValue"),this.get("pwdInputValue"),this.get("RememberIsChecked"))},keypress:function(e){13===e.keyCode&&self.aux.submitFormLogin(e.data.get("usernameValue"),e.data.get("pwdInputValue"),e.data.get("RememberIsChecked"))}}),kendo.bind($(idContainer),self.loginFormModel),self.aux.getPrivacyPolicy(function(url){self.loginFormModel.set("privacyPolicyHref",url)}),self.aux.callbackLogin(self.aux),void 0!==callback&&callback()})},viewUtils.prototype.displayMainPageFs=function(callback){var self=this;this.NeedRefreshToken?this.NeedRefreshToken&&(this.setActiveSection(this.activeTab),this.NeedRefreshToken=!1,void 0!==callback&&callback()):this.htmlTemplates.getHtmlFileTemplate("./html/mainPage.html","#mainContent",function(){self.mainPageModel=kendo.observable({searchPCTextMenuLabel:self.stringsLocalised.HNLOC_FS_NAVBAR_PC,pcMenuLabel:self.stringsLocalised.HNLOC_FS_NAVBAR_PC_ONLY,importMenuLabel:self.stringsLocalised.HNLOC_FS_NAVBAR_IMPORT,titleSectionSearchByFSID:self.stringsLocalised.HNLOC_FS_SEARCHBYFSID_TITLE,ButtonLogoutText:self.stringsLocalised.HNLOC_FS_LOGOUT_BUTTON_LABEL,showPrimaryPersonSection:function(){self.displayPrimaryPersonView()},showSearchSection:function(){self.displaySearchView(function(){})},showImportSection:function(){self.displayImportFSView()},logout:function(){self.aux.logoutUser(),self.NeedRefreshToken=!0}}),kendo.bind($("#header"),self.mainPageModel),self.aux.getCurrentUserInfo(),self.changeCentral(),void 0!==callback&&callback()})},viewUtils.prototype.changeCentral=function(){this.primaryPersonController.shouldReload=!0,this.importBranchController.shouldReload=!0,console.log("Active TAB : "+this.activeTab),""===this.activeTab&&(this.activeTab="navTabPc"),console.log("Active TAB : "+this.activeTab);var self=this;self.aux.getPC(self,function(infoPC){void 0===infoPC||0===infoPC.codeID?self.hasPrimaryPerson=!1:self.hasPrimaryPerson=!0,"navTabPc"===self.activeTab?self.displayPrimaryPersonView():"navTabImport"===self.activeTab?self.displayImportFSView():self.displaySearchView()})},viewUtils.prototype.displayPrimaryPersonView=function(callback){!1!==this.hasPrimaryPerson?(this.setActiveSection("navTabPc"),this.primaryPersonController.displayPrimaryPersonView(function(data){})):this.displayImportFSView(callback)},viewUtils.prototype.displayImportFSView=function(callback){var self=this;this.showLoadingText(""),self.setActiveSection("navTabImport"),this.importBranchController.displayImportFSView(function(data){self.disableLoadingText(""),void 0!==callback&&callback()})},viewUtils.prototype.displaySearchView=function(callback){this.setActiveSection("navTabSearch"),this.personSearchController.displaySearchView(callback)},viewUtils.prototype.showCurrentUserFsInfo=function(data){var info=this.stringsLocalised.HNLOC_FS_INFO_USER;$("#currentUserInfo").html(info.replace("%displayName",data.displayName))},viewUtils.prototype.errorLoginHandler=function(msgKeyArray){var self=this;this.htmlTemplates.getHtmlFileTemplate("../Common/htmlTemplate/alertMsgLogin.html","#logError",function(){var msg="";msgKeyArray.length>=1&&msgKeyArray.forEach(function(e,index){index<msgKeyArray.length?msg=msg+self.stringsLocalised[e]+"<br/>":msg+=self.stringsLocalised[e]}),$("#logError").find("#detailError").html(msg)})},viewUtils.prototype.missingFieldLoginCallback=function(){var self=this;this.htmlTemplates.getHtmlFileTemplate("../Common/htmlTemplate/alertMsgLogin.html","#logError",function(){$("#logError").find("#detailError").html(self.stringsLocalised.HNLOC_FS_LOGIN_ERROR_MSG_MISSING_FIELD)})},viewUtils.prototype.setActiveSection=function(composantId){if("fullScreenModalView"===composantId)return $("#part1").hide(),void $("#modalMainPage").show();$("#part1").show(),$("#modalMainPage").hide(),$("#header .nav-tabs li").each(function(){$(this).removeClass("active");var tmp=$(this).attr("id"),tabIdenfier="tabPcMainForm";"navTabImport"===tmp?tabIdenfier="tabImportMainForm":"navTabSearch"==tmp&&(tabIdenfier="tabSearchMainForm"),$(this).attr("id")===composantId?$("#"+tabIdenfier).show():$("#"+tabIdenfier).hide()}),$(".nav #"+composantId).addClass("active"),this.activeTab=composantId,self.controller.setWindowContext(composantId)},viewUtils.prototype.showFullScreenModal=function(callback){this.controller.getHeredisApiCall().lockUnlockInterface("lock","familySearch",function(){}),this.setActiveSection("fullScreenModalView"),void 0!==callback&&callback()},viewUtils.prototype.hideFullScreenModal=function(){this.setActiveSection(this.activeTab),this.controller.getHeredisApiCall().lockUnlockInterface("unlock","familySearch",function(){})},viewUtils.prototype.getMoreResults=function(callback){kendo.ui.progress($("#searchResult"),!0),void 0!==callback&&callback()},viewUtils.prototype.showMsgNoInternet=function(){"undefined"!=typeof callback?callback():(alert(this.stringsLocalised.HNLOC_ALERT_NO_INTERNET_MSG),kendo.ui.progress($("#searchResult"),!1))},viewUtils.prototype.showLoadingText=function(idContainer,keyLocalisedStringMsg){""===idContainer?kendo.ui.progress($("body"),!0):kendo.ui.progress($(idContainer),!0)},viewUtils.prototype.disableLoadingText=function(idContainer){""===idContainer?kendo.ui.progress($("body"),!1):kendo.ui.progress($(idContainer),!1)},viewUtils.prototype.reloadViewAfterLink=function(){"navTabPc"===this.activeTab&&this.primaryPersonController.reloadViewAfterLink()},viewUtils.prototype.ErrorRequestHandler=function(errorCode,pid){504===errorCode||500===errorCode?alert(this.stringsLocalised.HNLOC_FS_ERROR_MSG_503_PART1+"\n"+this.stringsLocalised.HNLOC_FS_ERROR_MSG_503_PART2):410===errorCode?alert(this.stringsLocalised.HNLOC_FS_COMPARE_UNEXISTING_PERSON_TEXT_PART2.replace("%fsid",pid)):401===errorCode&&this.refreshToken()},viewUtils.prototype.refreshToken=function(){this.disableLoadingText(""),alert(this.stringsLocalised.HNLOC_FS_COMPARE_SESSION_EXPIRED_TEXT_PART1+"\n"+this.stringsLocalised.HNLOC_FS_COMPARE_SESSION_EXPIRED_TEXT_PART2),$("#modalMainPage").show(),this.setActiveSection("fullScreenModalView"),this.displayLoginView("#modalMainPage"),this.NeedRefreshToken=!0};