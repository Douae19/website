webpackJsonp([0],{37:function(t,s,e){var a=e(0)(e(68),e(69),!1,function(t){e(66)},null,null);
t.exports=a.exports},66:function(t,s,e){var a=e(67);"string"==typeof a&&(a=[[t.i,a,""]]),
a.locals&&(t.exports=a.locals);e(2)("65ce7d4c",a,!0,{})},67:function(t,s,e)
{(t.exports=e(1)(!1)).push([t.i,".carousel-inner>.item>a>img,.carousel-inner>.item>img{margin:auto}#myCarousel{margin-top:-20px}",""])},
68:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),
s.default={data:function(t){function s(){return t.apply(this,arguments)}return s.toString=function()
{return t.toString()},s}(function(){return{storageURL:data.getStorageURL()}}),
computed:{categories:function(){return data.getCategories()}}}},69:function(t,s){
    t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",
    [e("div",{staticClass:"carousel slide",attrs:{id:"myCarousel","data-ride":"carousel"}},
    [t._m(0),t._v(" "),e("div",{staticClass:"carousel-inner",attrs:{role:"listbox"}},
    [e("div",{staticClass:"item active"},[e("img",{staticStyle:{"max-height":"350px"},
    attrs:{src:t.storageURL+"images/slide/slide1.png"}})]),t._v(" "),e("div",{staticClass:"item"},
    [e("img",{staticStyle:{"max-height":"350px"},attrs:{src:t.storageURL+"images/slide/slide2.png"}})]),
    t._v(" "),e("div",{staticClass:"item"},[e("img",{staticStyle:{"max-height":"350px"},
    attrs:{src:t.storageURL+"images/slide/slide3.png"}})])]),t._v(" "),t._m(1),t._v(" "),t._m(2)]),
    t._v(" "),e("div",{staticStyle:{"text-align":"left"}},t._l(t.categories,function(s,a){
        return e("category-card",{key:s.id,attrs:{
            name:s.category_name,src:t.storageURL+s.category_image,id:s.id}},
            [t._v("\n\t\t\t"+t._s(s.category_description)+"\n\t\t")])}),1)])},
            staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;
                return s("ol",{staticClass:"carousel-indicators"},
                [s("li",{staticClass:"active",attrs:
                {"data-target":"#myCarousel","data-slide-to":"0"}}),
                this._v(" "),s("li",{attrs:{"data-target":"#myCarousel","data-slide-to":"1"}}),
                this._v(" "),s("li",{attrs:{"data-target":"#myCarousel","data-slide-to":"2"}})])}
                ,function(){var t=this.$createElement,s=this._self._c||t;
                    return s("a",{staticClass:"left carousel-control",
                    attrs:{href:"#myCarousel","data-slide":"prev"}},
                    [s("span",{staticClass:"glyphicon glyphicon-chevron-left"}),
                    this._v(" "),s("span",{staticClass:"sr-only"},[this._v("Previous")])])},
                    function(){var t=this.$createElement,s=this._self._c||t;
                        return s("a",{staticClass:"right carousel-control",attrs:{
                            href:"#myCarousel","data-slide":"next"}}
    ,[s("span",{staticClass:"glyphicon glyphicon-chevron-right"}),
this._v(" "),s("span",{staticClass:"sr-only"},[this._v("Next")])])}]}}});
