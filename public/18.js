webpackJsonp([18],{47:function(t,a,e){var s=e(0)(e(86),e(87),!1,null,null,null);t.exports=s.exports},86:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(t){function a(){return t.apply(this,arguments)}return a.toString=function(){return t.toString()},a}(function(){return{baseURL:data.getBaseURL(),storageURL:data.getStorageURL(),id:this.$route.params.category_id,submitButton:{loading:!1,message:"Submit"}}}),created:function(){$("#catForm").ajaxForm(),data.getCategory().id||this.getCategory(this.id)},methods:{back:function(){this.$router.push("/category")},submit:function(){if(!this.submitButton.loading){var t=util.notify(util.getProgressbarMessage("Updating category",0),"loading");this.startLoading();var a=this;$("#catForm").ajaxSubmit({success:function(t,e,s,o){a.stopLoading(),util.showResult(t,"ajax")&&(data.setCategories([]),a.back())},error:function(t){util.showResult(t,"ajax"),a.stopLoading()},uploadProgress:function(a,e,s,o){t.update("message",util.getProgressbarMessage("Updating category",o))}})}},getCategory:function(t){var a=this;util.notify("Loading please wait","loading"),axios.get(this.baseURL+"api/v1/category/"+t).then(function(t){util.log(t),a.stopLoading(),data.setCategory(t.data)}).catch(function(t){a.stopLoading(),util.showResult(t)})},startLoading:function(){this.submitButton={loading:!0,message:"Loading"}},stopLoading:function(){$.notifyClose(),this.submitButton={loading:!1,message:"Submit"}},unescapeHTML:function(t){return util.unescapeHTML(t)}},computed:{category:function(){return data.getCategory()}}}},87:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel panel-default col-md-8 col-md-offset-2"},[e("div",{staticClass:"panel-body"},[e("form",{staticClass:"row",attrs:{action:t.baseURL+"api/v1/category/"+t.id,id:"catForm",enctype:"multipart/form-data",method:"POST"},on:{submit:function(a){return a.preventDefault(),t.submit()}}},[e("input",{attrs:{type:"hidden",name:"_method",value:"PUT"}}),t._v(" "),e("div",{staticClass:"col-md-4"},[e("uploader",{attrs:{fileId:"categoryImageFile",fileName:"category_image",imageId:"selectedCategoryImage",imageSrc:t.storageURL+t.category.category_image}})],1),t._v(" "),e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Category Name")]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text",name:"category_name",required:""},domProps:{value:t.unescapeHTML(t.category.category_name)}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",[t._v("Category Description")]),t._v(" "),e("textarea",{staticClass:"form-control",staticStyle:{height:"100%"},attrs:{name:"category_description"}},[t._v(t._s(t.unescapeHTML(t.category.category_description)))])]),t._v(" "),e("div",{staticClass:"form-group pull-right"},[e("button",{staticClass:"btn btn-primary",class:{disabled:t.submitButton.loading},attrs:{type:"submit"}},[t._v(t._s(t.submitButton.message))]),t._v(" "),e("span",{staticClass:"btn btn-default",on:{click:function(a){return t.back()}}},[t._v("Back")])])])])])])},staticRenderFns:[]}}});