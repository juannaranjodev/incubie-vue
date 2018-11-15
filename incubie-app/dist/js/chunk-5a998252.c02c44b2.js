(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a998252"],{"31be":function(t,e,n){},"73af":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("i-container",{staticClass:"i-company-settings",attrs:{small:""}},[n("v-card",[n("v-form",{on:{submit:function(e){return e.preventDefault(),t.updateCompany(e)}}},[n("v-card-text",[n("v-layout",{attrs:{wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("div",{staticClass:"i-company-settings__logo"},[n("i-company-icon",{attrs:{company:t.mutableCompany,size:155}}),n("v-btn",{staticClass:"i-company-settings__logo-edit",attrs:{color:"accent",small:"",fab:""},on:{click:function(e){return e.preventDefault(),t.chooseAvatar(e)}}},[n("v-icon",[t._v("edit")])],1),n("input",{ref:"avatarFileInput",staticClass:"i-company-settings__logo-input",attrs:{type:"file"},on:{change:t.handleAvatarFile}})],1)]),n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{attrs:{label:"Name",color:"accent"},model:{value:t.mutableCompany.name,callback:function(e){t.$set(t.mutableCompany,"name",e)},expression:"mutableCompany.name"}})],1),t.isAdmin(t.loggedInUser,t.company._id)?n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{attrs:{label:"Slack Token",placeholder:"xxxx-xxxxxx-xxxx",color:"accent"},model:{value:t.token,callback:function(e){t.token=e},expression:"token"}})],1):t._e()],1)],1),n("v-card-actions",{staticClass:"justify-end"},[n("v-btn",{attrs:{loading:t.isUpdatePending,type:"submit",color:"accent",flat:""}},[t._v("\n          Update\n        ")])],1)],1)],1)],1)},o=[],i=(n("96cf"),n("3040")),s=(n("7f7f"),n("c93e")),r=n("2f62"),c=n("2ef0"),u={name:"CompanyHome",components:{},props:{},data:function(){return{isUpdatePending:!1,mutableCompany:null,token:null}},computed:Object(s["a"])({},Object(r["c"])("users",{users:"list"}),Object(r["c"])("users",{isAdmin:"isAdmin"}),Object(r["c"])("companies",{company:"current"}),{breakpoint:function(){return this.$vuetify.breakpoint.xsOnly}},Object(r["c"])("auth",["loggedInUser"])),watch:{company:{immediate:!0,handler:function(t){this.mutableCompany={name:t.name,logo:t.logo}}}},created:function(){},methods:Object(s["a"])({},Object(r["d"])("snackbar",{showSnackbar:"show"}),Object(r["b"])("companies",{patchCompany:"patch"}),{chooseAvatar:function(){this.$refs.avatarFileInput.click()},handleAvatarFile:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var n,a,o=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:n=Object(c["get"])(e,"currentTarget.files[0]"),n&&(a=new FileReader,a.readAsDataURL(n),a.onload=function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:n=e.target.result,o.mutableCompany.logo=n;case 2:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),updateCompany:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(console.log("ruby: update company"),this.isUpdatePending=!0,console.log(this.loggedInUser),this.isAdmin(this.loggedInUser,this.company._id)){t.next=7;break}return console.log("ruby: you are not an admin"),this.showSnackbar({message:"You have no permission.",color:"error"}),t.abrupt("return");case 7:if(this.mutableCompany.logo===this.company.logo){t.next=12;break}return t.next=10,this.$dispatchAction({type:this.$actionTypes.UPLOAD_IMAGES,payload:{uri:this.mutableCompany.logo,bucket:"".concat(this.company._id,"/companies/").concat(this.company._id),thumb:!1},entity:this.company._id});case 10:e=t.sent,this.mutableCompany.logo=Object(c["get"])(e,"data.url");case 12:return t.next=14,this.patchCompany([this.company._id,this.mutableCompany]);case 14:if(""==this.token){t.next=17;break}return t.next=17,this.$dispatchAction({type:this.$actionTypes.UPDATE_SLACK_TOKEN,payload:{token:this.token,company:this.company._id},entity:this.company._id});case 17:this.isUpdatePending=!1,this.showSnackbar({message:"Company data updated"});case 19:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()})},l=u,p=(n("8809"),n("2877")),m=Object(p["a"])(l,a,o,!1,null,"4d330a0a",null);m.options.__file="CompanyHome.vue";e["default"]=m.exports},8809:function(t,e,n){"use strict";var a=n("31be"),o=n.n(a);o.a}}]);
//# sourceMappingURL=chunk-5a998252.c02c44b2.js.map