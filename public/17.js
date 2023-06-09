webpackJsonp([17],{45:function(t,e,a){var n=a(0)(a(82),a(83),!1,null,null,null);
    t.exports=n.exports},82:function(t,e,a){"use strict";
    Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){
        return{categoryId:0}},created:function(){this.categories.length<1?this.refreshCategories():
            this.$nextTick(function(){
                var t=this.transformData(this.categories);this.initDatatable(t)})},
                methods:{refreshCategories:function(){
                    util.notify("Refreshing categories","loading"),
                    axios.get(data.getBaseURL()+"api/v1/category").then(
                        function(t){$.notifyClose(),data.setCategories(t.data)}).catch(
                            function(t){util.showResult(t)})},deleteCategory:function(t){
                                var e=this;util.hideModal("#deleteCategoryModal"),
                                util.notify("Deleting Category","loading"),
                                axios.delete(data.getBaseURL()+"api/v1/category/"+t).then(
                                    function(t){util.showResult(t)&&e.refreshCategories()}).catch(
                                        function(t){util.showResult(t)})},transformData:function(t){
                                            var e=[];for(var a in t){
                                                var n=[],i=data.getStorageURL()+t[a].category_image,
                                                s=t[a].id;n.push('<img src="'+i+'" class="thumbnail" height="50px" width="50px" />'),
                                                n.push(util.minify(t[a].category_name,15)),n.push(util.minify(t[a].category_description,15)),
                                                n.push('<button class="btn btn-link edit" name="'+s+'"><span class="fa fa-edit"></span></button>'),
                                                n.push('<button class="btn btn-link delete" name="'+s+'"><span class="fa fa-trash"></span></button>'),
                                                e.push(n)}return e},initDatatable:function(t){var e=this;$("#categories").DataTable({destroy:!0,aaData:t,paging:!0,ordering:!1,searching:!1,info:!1,autoWidth:!1,dom:"Bfrtip",
                                                buttons:[{text:'<span class="fa fa-plus"></span> Add Category',action:function(t,a,n,i){
                                                    e.$router.push("/category/add")},className:"btn btn-success"},
                                                    {text:'<span class="fa fa-refresh"></span> Refresh',className:"btn btn-primary",
                                                    action:function(t,a,n,i,s){e.refreshCategories()}}]}),
                                                    this.addListener()},setCategoryId:function(t){this.categoryId=t},
                                                    getCategoryId:function(){return this.categoryId},getCategory:function(t){
                                                        var e=this.categories;for(var a in e)if(e[a].id==t)return e[a]},addListener:function(){
                                                            var t=this;$("#categories_next").click(function(){t.addListener()}),
                                                            $(".edit").click(function(){var e=$(this).attr("name");
                                                            data.setCategory(t.getCategory(e)),t.$router.push("/category/edit/"+e)}),
                                                            $(".delete").click(function(){util.showModal("#deleteCategoryModal"),
                                                            t.setCategoryId($(this).attr("name"))})}},watch:{
                                                                categories:function(t){var e=this.transformData(t);this.initDatatable(e)}},
                                                                computed:{categories:function(){return data.getCategories()}}}},
                                                                83:function(t,e){t.exports={render:function(){
                                                                    var t=this,e=t.$createElement,a=t._self._c||e;
                                                                    return a("div",{staticClass:"panel panel-default col-md-8 col-md-offset-2"},
                                                                    [t._m(0),t._v(" "),a("modal",{attrs:{id:"deleteCategoryModal"}},
                                                                    [a("modal-header",[t._v("Delete Category")]),t._v(" "),a("modal-body",
                                                                    [a("p",[a("b",[t._v("Warning :")]),
                                                                    t._v(" Deleting category will also delete Subcategory and products under it")])]),
                                                                    t._v(" "),a("modal-footer",[a("button",{staticClass:"btn btn-danger",
                                                                    on:{click:function(e){t.deleteCategory(t.getCategoryId())}}},[t._v("Delete")]),
                                                                    t._v(" "),a("button",{staticClass:"btn btn-default",attrs:{"data-dismiss":"modal"}},
                                                                    [t._v("Cancel")])])],1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;
                                                                        return a("div",{staticClass:"panel-body table-responsive"},
                                                                        [a("table",{staticClass:"table table-hover",attrs:{id:"categories"}},
                                                                        [a("thead",[a("tr",[a("th",{attrs:{width:"50px"}}),t._v(" "),a("th",[t._v("Name")]),
                                                                        t._v(" "),a("th",[t._v("Description")]),t._v(" "),a("th",[t._v("Edit")]),
                                                     t._v(" "),a("th",[t._v("Delete")])])]),t._v(" "),a("tbody")])])}]}}});
