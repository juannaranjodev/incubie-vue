(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ae968"],{"0b66":function(s,e,t){"use strict";t.r(e);var r=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("i-container",{staticClass:"i-account",attrs:{small:""}},[t("v-card",{staticClass:"mb-5"},[t("v-form",{on:{submit:function(e){return e.preventDefault(),s.updatePassword(e)}}},[t("v-card-text",[t("v-layout",{attrs:{wrap:""}},[t("v-flex",{attrs:{xs12:""}},[t("v-text-field",{attrs:{label:"Old Password",color:"accent",rules:[s.$rules.required()],type:"password"},model:{value:s.oldPassword,callback:function(e){s.oldPassword=e},expression:"oldPassword"}})],1),t("v-flex",{attrs:{xs12:""}},[t("v-text-field",{attrs:{label:"New Password",color:"accent",rules:[s.$rules.required()],type:"password"},model:{value:s.newPassword,callback:function(e){s.newPassword=e},expression:"newPassword"}})],1),t("v-flex",{attrs:{xs12:""}},[t("v-text-field",{attrs:{label:"Confirm Password",color:"accent",rules:[s.$rules.required()],type:"password"},model:{value:s.confirmPassword,callback:function(e){s.confirmPassword=e},expression:"confirmPassword"}})],1)],1)],1),t("v-card-actions",{staticClass:"justify-end"},[t("v-btn",{attrs:{loading:s.isUpdatePending,type:"submit",color:"accent",flat:""}},[s._v("\n          Change\n        ")])],1)],1)],1)],1)},a=[],o=(t("96cf"),t("3040")),n=t("c93e"),c=t("2f62"),d=(t("2ef0"),t("279c")),i=t.n(d),l={name:"AccountPassword",components:{},props:{},data:function(){return{isUpdatePending:!1,oldPassword:"",newPassword:"",confirmPassword:"",mutableUser:null}},computed:Object(n["a"])({},Object(c["c"])("auth",["loggedInUser"]),Object(c["c"])("companies",{company:"current"})),watch:{loggedInUser:{immediate:!0,handler:function(s){this.mutableUser={password:s.password}}}},created:function(){},methods:Object(n["a"])({},Object(c["b"])("users",{patchUser:"patch"}),Object(c["d"])("snackbar",{showSnackbar:"show"}),{updatePassword:function(){var s=Object(o["a"])(regeneratorRuntime.mark(function s(){var e;return regeneratorRuntime.wrap(function(s){while(1)switch(s.prev=s.next){case 0:if(console.log("ruby: update password : ",this.oldPassword),e=i.a.compareSync(this.oldPassword,this.loggedInUser.password),console.log("ruby: **** ",e),this.isUpdatePending=!0,console.log("new = ",this.newPassword," , ",this.confirmPassword),this.confirmPassword==this.newPassword&&e){s.next=9;break}return this.showSnackbar({color:"error",message:"Password is incorrect."}),this.isUpdatePending=!1,s.abrupt("return");case 9:return this.mutableUser.password=this.newPassword,s.next=12,this.patchUser([this.loggedInUser._id,this.mutableUser]);case 12:this.isUpdatePending=!1,this.showSnackbar({color:"success",message:"Password updated"});case 14:case"end":return s.stop()}},s,this)}));return function(){return s.apply(this,arguments)}}()})},u=l,w=t("2877"),p=Object(w["a"])(u,r,a,!1,null,null,null);p.options.__file="AccountPassword.vue";e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0ae968.6ab88818.js.map