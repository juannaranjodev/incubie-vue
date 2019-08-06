(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d69b0"],{"72ed":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-form",{on:{submit:function(t){t.preventDefault(),e.acceptInvitation()}}},[a("v-card",[a("v-card-title",{attrs:{"primary-title":""}},[a("h3",{staticClass:"headline"},[e._v("\n        You are invited to join "),a("strong",[e._v(e._s(e.companyName))])])]),a("v-card-text",[a("v-text-field",{ref:"fullName",attrs:{rules:[e.$rules.required()],type:"text",label:"Enter your full name","validate-on-blur":""},model:{value:e.fullName,callback:function(t){e.fullName="string"===typeof t?t.trim():t},expression:"fullName"}}),a("v-text-field",{ref:"email",attrs:{rules:[e.$rules.required(),e.$rules.email()],type:"text",label:"Enter your Email","validate-on-blur":""},on:{keyup:function(t){e.checkUniqueEmail()}},model:{value:e.email,callback:function(t){e.email="string"===typeof t?t.trim():t},expression:"email"}}),a("v-text-field",{ref:"password",attrs:{rules:[e.$rules.required()],type:"password",label:"Choose a password","validate-on-blur":""},model:{value:e.password,callback:function(t){e.password="string"===typeof t?t.trim():t},expression:"password"}})],1),a("v-card-actions",[a("v-btn",{attrs:{block:"",large:"",color:"accent",type:"submit"}},[e._v("\n        Accept My Invitation\n      ")])],1)],1)],1)},r=[],i=(a("f751"),a("a481"),a("28a5"),a("96cf"),a("3040")),s=a("c93e"),o=a("2f62"),l=a("2ef0"),c=a("64ae"),u=a.n(c),p=a("279c"),d=a.n(p),m=a("2f10"),h={name:"InvitationLinkSignUp",components:{},props:{},data:function(){return{fullName:null,email:null,password:null,companyName:null,companyId:null,invitedBy:null,boardId:null,firstName:null,lastName:null}},computed:Object(s["a"])({},Object(o["c"])("companies",{getCompany:"get",getCompanies:"find",companies:"list",company:"current",getCompanyIdBySlug:"getIdBySlug",getCompanyById:"getCompanyById"}),{authenticateError:function(){return this.errorOnAuthenticate?this.errorOnAuthenticate.error:null},user:function(){return{fullName:this.fullName,email:this.email,password:this.password,strategy:"local",role:"member"}}}),watch:{},created:function(){},mounted:function(){this.init()},methods:Object(s["a"])({},Object(o["d"])("auth",["clearAuthenticateError","setAuthenticatePending","setAuthenticateError","unsetAuthenticatePending"]),Object(o["d"])("snackbar",{showSnackbar:"show"}),Object(o["b"])("auth",["authenticate"]),{checkUniqueEmail:Object(l["debounce"])(Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dispatchAction({type:this.$actionTypes.CHECK_UNIQUE_EMAIL,payload:this.user.email});case 2:case"end":return e.stop()}},e,this)})),300),acceptInvitation:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,a,n,r,i,s,o,c,p,h;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this.fullName.split(" "),this.firstName=t[0],this.lastName=t[1],e.prev=3,a={role:"member",company:{_id:this.companyId,name:this.companyName,slug:u.a.lowerCase(this.companyName.replace(/ /g,""))},invitedBy:{_id:this.invitedBy,firstName:this.firstName,lastName:this.lastName},board:this.boardId,linked:!0},e.next=7,this.$dispatchAction({type:this.$actionTypes.ACCEPT_LINK_INVITATION,payload:Object.assign(a,{user:this.user})});case 7:if(n=e.sent,console.log("ruby: response of link invitation",n),r=Object(l["get"])(n,"data.company.slug"),i=Object(l["get"])(n,"data.user.password"),s=Object(l["get"])(n,"data.board.slug"),console.log("ruby: BoardSlug",s),o=m["a"].BaseUrl+r+"/b/"+s,c=d.a.compareSync(this.password,i),c){e.next=20;break}this.password="",this.showSnackbar({color:"error",message:"Failed in Login"}),e.next=23;break;case 20:return e.next=22,this.authenticate(this.user);case 22:window.location=o;case 23:e.next=37;break;case 25:if(e.prev=25,e.t0=e["catch"](3),p=Object(l["get"])(e.t0,"code"),h=Object(l["get"])(e.t0,"data.message","error"),console.dir(e.t0),403!==p){e.next=34;break}this.$router.push({name:"unauthorized"}),e.next=36;break;case 34:return e.next=36,this.setAuthenticateError({error:h});case 36:console.log("ruby: here catch in here");case 37:case"end":return e.stop()}},e,this,[[3,25]])}));return function(){return e.apply(this,arguments)}}(),init:function(){console.log("ruby: mounted::&&::params",this.$route.path);var e=this.$route.path,t=e.split("/"),a=t[t.length-2],n=a.split("_FAI35_");console.log(n),this.companyName=n[3].replace("_"," "),this.companyId=n[0],this.invitedBy=n[1],this.boardId=n[2]}})},f=h,b=a("2877"),y=Object(b["a"])(f,n,r,!1,null,null,null);y.options.__file="InvitationLinkSignUp.vue";t["default"]=y.exports}}]);
//# sourceMappingURL=chunk-2d0d69b0.d52ad17f.js.map