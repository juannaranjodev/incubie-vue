(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a67df9d"],{"2cce":function(e,t,a){},9835:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("idea-create-dialog"),a("v-btn",{attrs:{disabled:!e.boards.length,to:{name:"feed/main",params:{createIdea:"create"}},color:"primary",dark:"",fab:"",large:"",fixed:"",bottom:"",right:""}},[a("v-icon",[e._v("lightbulb_outline")])],1),e.ideas.length||e.isFindPending?a("i-container",{staticClass:"u__main-container"},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[e.ideas.length?a("idea-list",{attrs:{ideas:e.ideas}}):e._e()],1)],1)],1):a("v-container",{staticClass:"u__main-container",attrs:{"fill-height":"",fluid:""}},[a("v-layout",{attrs:{"align-center":""}},[a("div",{staticClass:"u__empty-message"},[a("h1",{staticClass:"mb-4",class:{headline:e.breakpoint,"display-1":!e.breakpoint}},[e._v("\n          Welcome to Your Home Board!\n        ")]),a("p",{class:{subheading:e.breakpoint,headline:!e.breakpoint},domProps:{innerHTML:e._s(e.welcomeMessage)}})])])],1)],1)},n=[],r=a("c93e"),s=a("2f62"),o=a("e166"),c=a.n(o),d=a("933e"),l=a("d1b7"),u=a("4360"),h={name:"FeedMain",components:{InfiniteLoading:c.a,IdeaCreateDialog:l["a"],IdeaList:d["a"]},props:{createIdea:{type:String,required:!1,default:""}},data:function(){return{}},computed:Object(r["a"])({},Object(s["e"])("ui",["isCreateIdeaDialogOpen"]),Object(s["e"])("ideas",{isFindPending:"isFindPending",ideaIds:"ids",ideasPagination:"pagination"}),Object(s["c"])("companies",{company:"current"}),Object(s["c"])("boards",{boards:"list"}),Object(s["c"])("ideas",{hasMoreIdeas:"hasMore",ideas:"list"}),{breakpoint:function(){return this.$vuetify.breakpoint.xsOnly},welcomeMessage:function(){var e=this.boards.length?"Post the first ground-breaking idea now!":"But first, we need to create a new board.";return"This is where ideas from all of your boards will collect.<br>".concat(e)}}),watch:{createIdea:{immediate:!0,handler:function(e){e?this.setCreateIdeaDialogOpen():this.setCreateIdeaDialogOpen(!1)}},isCreateIdeaDialogOpen:function(e){e||this.$router.push({name:"feed/main"})}},created:function(){},beforeRouteEnter:function(e,t,a){u["a"].dispatch("feed/load"),a()},methods:Object(r["a"])({},Object(s["d"])("ui",["setCreateIdeaDialogOpen"]),Object(s["b"])("ideas",{getIdeas:"find",getNextIdeaPage:"findNextPage",findIdeasBySort:"findBySort"}))},p=h,g=a("2877"),b=Object(g["a"])(p,i,n,!1,null,null,null);b.options.__file="FeedMain.vue";t["default"]=b.exports},aa51:function(e,t,a){"use strict";var i=a("2cce"),n=a.n(i);n.a},b707:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{value:e.isOpen,width:"375",lazy:"",scrollable:""},on:{input:e.setOpen}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("\n      Invite Collaborators\n    ")]),a("v-card-text",[a("p",{staticClass:"caption"},[e._v("Invite Existing or New Members via Email ")]),e.showShareLink?a("v-text-field",{ref:"shareLink",attrs:{readonly:"","append-icon":"file_copy",outline:"",rules:[e.$rules.required(),e.$rules.maxLength(220)],color:"accent",label:"Share Link",required:""},on:{"click:append":e.copyShareLink},model:{value:e.linkUrl,callback:function(t){e.linkUrl=t},expression:"linkUrl"}}):e._e(),a("v-combobox",{attrs:{outline:"","hide-selected:":"",true:"",label:"Collaborators",multiple:"",color:"primary",chips:""},scopedSlots:e._u([{key:"selection",fn:function(t){return[a("v-chip",{key:JSON.stringify(t.item),staticClass:"v-chip--select-multi",attrs:{selected:t.selected,disabled:t.disabled,close:""},on:{input:function(e){t.parent.selectItem(t.item)}}},[a("v-avatar",{staticClass:"accent white--text",domProps:{textContent:e._s(t.item.slice(0,2).toUpperCase())}}),e._v("\n            "+e._s(t.item)+"\n          ")],1)]}}]),model:{value:e.select,callback:function(t){e.select=t},expression:"select"}})],1),a("v-card-actions",{staticClass:"justify-end"},[a("v-btn",{attrs:{color:"primary",flat:""},on:{click:function(t){t.stopPropagation(),e.setOpen(!1)}}},[e._v("Cancel\n      ")]),a("v-btn",{attrs:{loading:e.isActionPending,color:"accent",flat:""},on:{click:e.submit}},[e._v("Send Invites\n      ")])],1)],1)],1)},n=[],r=(a("96cf"),a("3040")),s=(a("7f7f"),a("28a5"),a("c93e")),o=(a("cadf"),a("551c"),a("097d"),a("2f62")),c=(a("2ef0"),a("2f10")),d={name:"BoardInviteMembersDialog",components:{},props:{showShareLink:{type:Boolean,default:!0}},data:function(){return{select:[],linkUrl:""}},computed:Object(s["a"])({},Object(o["e"])("auth",["actionTypes","roleTypes"]),Object(o["e"])("actions",["isActionPending"]),Object(o["e"])("ui",{isOpen:"isInviteToBoardDialogOpen"}),Object(o["c"])("auth",["roles","loggedInUser"]),Object(o["c"])("companies",{company:"current"}),Object(o["c"])("boards",{currentBoard:"current",boards:"list",shareLink:"shareLink"}),Object(o["c"])("ideas",{idea:"current"}),{invitations:function(){var e=this;return this.select.filter(function(e){return e}).map(function(t){return{email:t,role:"member",company:e.company._id,board:e.currentBoard._id,invitedBy:e.loggedInUser._id}})}}),watch:{isOpen:function(e){if(e){console.log("ruby: BoardInviteMemebersDialog opened , ",this.$route.path),console.log("ruby: this.idea",this.idea);var t=null;t=this.currentBoard?this.currentBoard._id:this.idea.board,this.linkUrl=c["a"].BaseUrl+"invitation/"+this.company._id+"_FAI35_"+this.loggedInUser._id+"_FAI35_"+t+"_FAI35_"+this.company.name.split(" ").join("_")}}},mounted:function(){console.log("ruby: test,mounted board",this.currentBoard),console.log("ruby: test, idea",this.idea);var e=null;e=this.currentBoard?this.currentBoard._id:this.idea.board,this.linkUrl=c["a"].BaseUrl+"invitation/"+this.company._id+"_FAI35_"+this.loggedInUser._id+"_FAI35_"+e+"_FAI35_"+this.company.name.split(" ").join("_")},methods:Object(s["a"])({},Object(o["d"])("ui",{setOpen:"setInviteToBoardDialogOpen"}),Object(o["b"])("invitations",{createInvitations:"create"}),Object(o["b"])("companyManagement",["inviteMembers"]),{submit:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dispatchAction({type:this.$actionTypes.INVITE_COMPANY_MEMBERS,entity:this.company._id,payload:this.invitations});case 2:return e.next=4,this.$dispatchAction({type:this.$actionTypes.INVITE_BOARD_MEMBERS,entity:this.company._id,payload:this.invitations});case 4:this.setOpen(!1);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),validateEmail:function(e){var t=/\S+@\S+\.\S+/;return t.test(e)},copyShareLink:function(){console.log("ruby: copyShareLink clicked",this.$refs.shareLink);var e=this.linkUrl,t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.focus(),t.select();try{var a=document.execCommand("copy"),i=a?"successful":"unsuccessful";console.log("Fallback: Copying text command was "+i)}catch(e){console.error("Fallback: Oops, unable to copy",e)}document.body.removeChild(t)}})},l=d,u=(a("aa51"),a("2877")),h=Object(u["a"])(l,i,n,!1,null,"2dab5698",null);h.options.__file="BoardInviteMembersDialog.vue";t["a"]=h.exports},d1b7:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{value:e.isOpen,"max-width":"525",lazy:""},on:{input:e.setOpen}},[a("v-form",{ref:"form",staticClass:"accent",on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[a("v-card",[a("v-alert",{staticClass:"mb-2",attrs:{value:!e.checkUpdate()&&!this.blnEditing,type:"error"}},[e._v("\n        Idea limit reached. New ideas are only visible to you.\n        "),a("v-btn",{attrs:{color:"primary",flat:""},on:{click:e.gotoUpgrade}},[a("h4",[e._v("UPGRADE")])])],1),a("v-card-title",{attrs:{"primary-title":""}},[a("h3",{staticClass:"title"},[e._v(e._s(e.blnEditing?"Edit":"New")+" Idea")])]),a("v-card-text",[e.currentBoard?e._e():a("v-select",{attrs:{items:e.boardsOptions,rules:[e.$rules.required()],autofocus:!e.currentBoard,color:"accent",label:"Board",required:""},model:{value:e.ideaModel.board,callback:function(t){e.$set(e.ideaModel,"board",t)},expression:"ideaModel.board"}}),a("v-text-field",{attrs:{rules:[e.$rules.required(),e.$rules.maxLength(120)],autofocus:!!e.currentBoard,counter:"120",color:"accent",label:"Title",required:""},model:{value:e.ideaModel.title,callback:function(t){e.$set(e.ideaModel,"title",t)},expression:"ideaModel.title"}}),a("v-textarea",{attrs:{rules:[e.$rules.maxLength(500)],"auto-grow":"",rows:"1",counter:"500",color:"accent",label:"Description"},model:{value:e.ideaModel.description,callback:function(t){e.$set(e.ideaModel,"description",t)},expression:"ideaModel.description"}}),a("i-image-picker",{staticClass:"mt-4",attrs:{loading:e.isImagePickerLoading},on:{"update:loading":function(t){e.isImagePickerLoading=t}},model:{value:e.ideaModel.images,callback:function(t){e.$set(e.ideaModel,"images",t)},expression:"ideaModel.images"}})],1),a("v-card-actions",{staticClass:"justify-end"},[a("v-btn",{attrs:{color:"primary",flat:""},on:{click:e.canceled}},[e._v("Cancel\n        ")]),a("v-btn",{attrs:{loading:e.isActionPending||e.isImagePickerLoading,type:"submit",color:"accent",flat:""}},[e._v(e._s(e.blnEditing?"Save":"Create")+"\n        ")]),a("p",[e._v(e._s(e.loggedInUser.ideasCount))])],1)],1)],1)],1)},n=[],r=(a("ac6a"),a("96cf"),a("3040")),s=(a("7f7f"),a("c93e")),o=(a("cadf"),a("551c"),a("097d"),a("2ef0")),c=a("2f62"),d=a("5fb0"),l=a("b707"),u={name:"IdeaCreateDialog",components:{BoardInviteMembersDialog:l["a"]},props:{value:{type:Object,default:function(){return{}}}},data:function(){return{board:null,title:null,userStory:null,description:null,ideaModel:{},images:[],isImagePickerLoading:!1,userStoryHint:"As a <em><strong>user type</strong></em>, I need to <em><strong>do something</strong></em> so that I can <em><strong>realize a reward</strong></em>."}},computed:Object(s["a"])({},Object(c["e"])("ui",{isOpen:"isCreateIdeaDialogOpen"}),Object(c["e"])("actions",["isActionPending"]),Object(c["c"])("auth",["loggedInUser"]),Object(c["c"])("companies",{company:"current"}),Object(c["c"])("boards",{currentBoard:"current",boards:"list",getUsers:"getUsers"}),Object(c["c"])("ideas",{trialIdeasCount:"trialIdeasCount"}),Object(c["e"])("ideas",{ideasPagination:"pagination"}),{myIdeasCount:function(){return Object(o["get"])(this.ideasPagination,"default.total",0)},blnEditing:function(){return!(!this.value||!this.value._id)},boardsOptions:function(){return this.boards.map(function(e){return{value:e._id,text:e.name}})},idea:function(){return{company:this.company._id,board:this.board||this.currentBoard,title:this.title,userStory:this.userStory,description:this.description,createdBy:this.loggedInUser._id}}}),watch:{isOpen:function(e){e||(this.$refs.form.reset(),this.images=[])},value:function(e,t){console.log("ruby: watch test",e," => ",t),e&&this.initForm()}},created:function(){console.log("ruby: here is created in Idea Create Dialog"),this.initForm()},methods:Object(s["a"])({},Object(c["d"])("ui",{setOpen:"setCreateIdeaDialogOpen"}),Object(c["d"])("snackbar",{showSnackbar:"show"}),Object(c["d"])("ui",{setInviteToBoardDialogOpen:"setInviteToBoardDialogOpen"}),Object(c["b"])("ideas",{patchIdea:"patch"}),{gotoUpgrade:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),checkUpdate:function(){return!!this.loggedInUser.stripe&&("Free"==this.loggedInUser.stripe.plan?!(this.loggedInUser.ideasCount>=this.trialIdeasCount):"Premium"==this.loggedInUser.stripe.plan)}},Object(c["b"])("uploads",{upload:"create"}),Object(c["b"])("ideas",{createIdea:"create",patchIdea:"patch"}),Object(c["b"])("votes",{vote:"create"}),{initForm:function(){var e=this,t=this.$FeathersVuex.Idea;if(this.value instanceof t)this.ideaModel=new t(this.value).clone(),console.log("ruby: here is Idea model clone check--if",this.ideaModel);else{var a=-2;this.loggedInUser.ideasCount<this.trialIdeasCount?a=1:this.loggedInUser.stripe&&"Free"!=this.loggedInUser.stripe.plan&&(a=2),this.ideaModel=new t({board:e.currentBoard?e.currentBoard._id:void 0,company:this.company._id,createdBy:this.loggedInUser._id,check:a})}},canceled:function(){this.setOpen(!1)},uploadImage:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,a){var i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dispatchAction({type:this.$actionTypes.UPLOAD_IMAGES,payload:{uri:a,bucket:"".concat(this.company._id,"/ideas/").concat(t),thumb:!0},entity:this.company._id});case 2:return i=e.sent,e.abrupt("return",i.data);case 4:case"end":return e.stop()}},e,this)}));return function(t,a){return e.apply(this,arguments)}}(),submit:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,a,i,n,s,c,l=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("ruby: idea create start! test for heroku"),t=this.$refs.form,!t.validate()){e.next=33;break}if(i=this.checkUpdate(),!this.blnEditing){e.next=10;break}return e.next=7,this.ideaModel.save();case 7:a=this.ideaModel._id,e.next=16;break;case 10:return e.next=12,this.createIdea(this.ideaModel);case 12:return n=e.sent,a=Object(o["get"])(n,"data._id"),e.next=16,this.vote({parent:a,kind:d["voteKinds"].ideas,owner:this.loggedInUser._id,voter:this.loggedInUser._id});case 16:if(!this.ideaModel.images.length){e.next=25;break}return console.log("ruby: images exist"),s=[],e.next=21,Promise.all(this.ideaModel.images.map(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!t.data){e.next=7;break}return e.next=3,l.uploadImage(a,t.data);case 3:i=e.sent,s.push(i),e.next=8;break;case 7:s.push(t);case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()));case 21:return this.ideaModel.images=s,console.log("ruby: ideaModel after",this.ideaModel),e.next=25,this.patchIdea([a,{images:this.ideaModel.images}]);case 25:return console.log("ruby: count of users",this.getUsers(this.currentBoard._id).length),this.blnEditing||1!=this.getUsers(this.currentBoard._id).length||this.setInviteToBoardDialogOpen(!0),e.next=29,this.setOpen(!1);case 29:c=this.loggedInUser,c.ideasCount=this.loggedInUser.ideasCount+1,i||this.blnEditing||this.showSnackbar({color:"error",message:"Warning! This will hide all ideas over the plan limit."}),this.$router.push({name:"idea",params:{idea:a}});case 33:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()})},h=u,p=a("2877"),g=Object(p["a"])(h,i,n,!1,null,null,null);g.options.__file="IdeaCreateDialog.vue";t["a"]=g.exports}}]);
//# sourceMappingURL=chunk-3a67df9d.a873ab75.js.map