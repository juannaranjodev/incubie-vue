(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a4746f6"],{"3b7f":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-flex",{attrs:{xs12:"",sm8:"",lg6:""}},[a("v-container",{staticClass:"i-board",attrs:{small:""}},[a("v-card",{staticClass:"mb-5"},[a("v-form",{ref:"updateBoardForm",on:{submit:function(t){return t.preventDefault(),e.updateImage(t)}}},[a("v-card-text",[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("div",{staticClass:"i-board__image"},[a("i-board-icon",{attrs:{board:e.mutableBoard,size:155}}),a("v-btn",{staticClass:"i-board__image-edit",attrs:{color:"accent",small:"",fab:""},on:{click:function(t){return t.preventDefault(),e.chooseImage(t)}}},[a("v-icon",[e._v("edit")])],1),a("input",{ref:"imageFileInput",staticClass:"i-board__image-input",attrs:{type:"file"},on:{change:e.handleImageFile}})],1)]),a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{label:"Name",color:"accent",rules:[e.$rules.required()]},model:{value:e.mutableBoard.name,callback:function(t){e.$set(e.mutableBoard,"name",t)},expression:"mutableBoard.name"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{label:"Description",color:"accent"},model:{value:e.mutableBoard.description,callback:function(t){e.$set(e.mutableBoard,"description",t)},expression:"mutableBoard.description"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{label:"Created At",color:"accent"},model:{value:e.mutableBoard.createdDate,callback:function(t){e.$set(e.mutableBoard,"createdDate",t)},expression:"mutableBoard.createdDate"}})],1)],1)],1),a("v-card-actions",{staticClass:"justify-end"},[a("v-btn",{attrs:{loading:e.isUpdatePending,type:"submit",color:"accent",flat:""}},[e._v("\n            Update\n          ")])],1)],1)],1)],1)],1)},n=[],i=(a("96cf"),a("3040")),c=(a("7f7f"),a("c93e")),s=(a("cadf"),a("551c"),a("097d"),a("2f62")),o=a("2ef0"),u={name:"BoardUpdate",components:{},props:{},data:function(){return{tmpImage:null,mutableBoard:null,isUpdatePending:!1}},computed:Object(c["a"])({},Object(s["c"])("auth",["loggedInUser"]),Object(s["c"])("companies",{company:"current"}),Object(s["c"])("boards",{currentBoard:"current"}),{image:function(){return this.tmpImage||this.currentBoard.image}}),watch:{currentBoard:{immediate:!0,handler:function(e){this.mutableBoard={name:e.name,description:e.description,createdDate:e.createdDate,image:e.image}}}},created:function(){},methods:Object(c["a"])({},Object(s["b"])("boards",{patchBoard:"patch"}),Object(s["d"])("snackbar",{showSnackbar:"show"}),{chooseImage:function(){this.$refs.imageFileInput.click()},handleImageFile:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var a,r,n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:a=Object(o["get"])(t,"currentTarget.files[0]"),a&&(r=new FileReader,r.readAsDataURL(a),r.onload=function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:a=t.target.result,n.mutableBoard.image=a;case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),updateImage:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.isUpdatePending=!0,t=this.$refs.updateBoardForm,this.mutableBoard.image===this.currentBoard.image){e.next=7;break}return e.next=5,this.$dispatchAction({type:this.$actionTypes.UPLOAD_IMAGES,payload:{uri:this.mutableBoard.image,bucket:"".concat(this.company._id,"/boards/").concat(this.currentBoard._id),thumb:!1},entity:this.company._id});case 5:a=e.sent,this.mutableBoard.image=Object(o["get"])(a,"data.url");case 7:if(!t.validate()){e.next=14;break}return e.next=10,this.patchBoard([this.currentBoard._id,this.mutableBoard]);case 10:this.showSnackbar({message:"Board details updated"}),this.$router.push({name:"board/settings",params:{boardSlug:this.currentBoard.slug}}),e.next=15;break;case 14:this.showSnackbar({message:"Invalid validation",color:"error"});case 15:this.isUpdatePending=!1;case 16:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()})},d=u,l=(a("bc6f"),a("2877")),m=Object(l["a"])(d,r,n,!1,null,"8c07376c",null);m.options.__file="BoardUpdate.vue";t["default"]=m.exports},bc6f:function(e,t,a){"use strict";var r=a("fde6"),n=a.n(r);n.a},fde6:function(e,t,a){}}]);
//# sourceMappingURL=chunk-6a4746f6.d020b353.js.map