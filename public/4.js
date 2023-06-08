webpackJsonp([4],{40:function(t,s,r){var e=r(0)(r(74),r(75),!1,null,null,null);
    t.exports=e.exports},74:function(t,s,r){"use strict";
    Object.defineProperty(s,"__esModule",{value:!0}),
    s.default={created:function(){this.totalItem<1&&this.$router.push("/")},
    methods:{submit:function(){var t=this;util.notify("Soumission de votre commande, veuillez patienter...",
    "loading");var s=data.getBaseURL()+"api/v1/user/order/add",
    r=$("#checkoutForm").serialize();axios.post(s,r).then(function(s){
        if((s=util.getResponse(s)).status)"success"==s.status?(
            util.notify("Commande soumise avec succès","success"),t.$router.push("/")):
            util.notify("Erreur","success");else{var r=util.validateErrorMessage(s);util.notify(r,"error")}})
            .catch(function(t){util.notify("Erreur","error"),
            util.log(t)})},toCurrency:function(t){return util.toCurrency(t)}},
            computed:{totalItem:function(){if("IN"!=data.getStatus().LOG)return this.$router.push("/");
            var t=0,s=data.getStatus().CARTS;for(var r in s)t+=s[r].cart_quantity;return t},
            carts:function(){return data.getStatus().CARTS},totalPrice:function(){var t=0;
                for(var s in this.carts)t+=this.carts[s].cart_quantity*this.carts[s].product.product_price;
                return t}}}},75:function(t,s){t.exports={render:function(){
                    var t=this,s=t.$createElement,r=t._self._c||s;
                    return r("div",{staticClass:"container"},[t._m(0),t._v(" "),
                    r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"}
                    ,[r("form",{attrs:{id:"checkoutForm"},
                    on:{submit:function(s){return s.preventDefault(),t.submit(s)}}},
                    [t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),
                    t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),
                    t._m(9)])]),t._v(" "),r("div",{staticClass:"col-md-6"},
                    [r("div",{staticClass:"panel panel-default"},
                    [r("div",{staticClass:"panel-body"},[r("h2",[t._v("Résumé de la Commande")]),
                    t._v(" "),r("h6",[t._v("Vous avez "+t._s(t.totalItem)+" article(s) dans votre panier.")]),
                    t._v(" "),r("div",{staticClass:"table-responsive"},
                    [r("table",{staticClass:"table table-hover"},[r("tbody",[t._l(t.carts,function(s){
                        return r("tr",[r("td",[r("h5",[t._v(t._s(s.cart_quantity)
                            +" x "+t._s(s.product.product_name))])]),t._v(" "),
                            r("td",[r("h5",{staticClass:"pull-right"},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t"+
                            t._s(t.toCurrency(s.cart_quantity*s.product.product_price))+
                            "\n\t\t\t\t\t\t\t\t\t\t")])])])}),t._v(" "),r("tr",[t._m(10),t._v(" "),
                            r("td",[r("b",{staticClass:"pull-right"},[t._v(t._s(t.toCurrency(t.totalPrice)))])])])],2)])])])])])])])},
                            staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;
                                return s("h1",[s("b",[this._v("Livraison")])])},
                                function(){var t=this.$createElement,s=this._self._c||t;
                                    return s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"firstname"}},
                                    [this._v("Prénom")]),this._v(" "),s("input",{staticClass:"form-control",
                                    attrs:{type:"text",name:"firstname",required:""}})])},
                                    function(){var t=this.$createElement,s=this._self._c||t;
                                        return s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"lastname"}},
                                        [this._v("Nom")]),this._v(" "),s("input",{staticClass:"form-control",
                                        attrs:{type:"text",name:"lastname",required:""}})])},
                                        function(){var t=this.$createElement,s=this._self._c||t;
                                            return s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"address1"}},
                                            [this._v("Adresse1")]),this._v(" "),s("input",{staticClass:"form-control",
                                            attrs:{type:"text",name:"address1",required:""}})])},
                                            function(){var t=this.$createElement,s=this._self._c||t;
                                                return s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"address2"}},
                                                [this._v("Adresse2")]),this._v(" "),s("input",{staticClass:"form-control",
                                                attrs:{type:"text",name:"address2",placeholder:"Optional"}})])},
                                                function(){var t=this.$createElement,s=this._self._c||t;
                                                    return s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"phone"}},
                                                    [this._v("Numéro de Téléphone")]),this._v(" "),
                                                    s("input",{staticClass:"form-control",attrs:{type:"text",name:"phone",
                                                    required:""}})])},function(){var t=this.$createElement,s=this._self._c||t;
                                                        return s("div",{staticClass:"form-group"},
                                                        [s("label",{attrs:{for:"city"}},[this._v("Ville")]),
                                                        this._v(" "),s("input",{staticClass:"form-control",
                                                        attrs:{type:"text",name:"city",required:""}})])},
                                                        function(){var t=this.$createElement,s=this._self._c||t;
                                                            return s("div",{staticClass:"form-group"},
                                                            [s("label",{attrs:{for:"state"}},[this._v("État")]),this._v(" "),
                                                            s("input",{staticClass:"form-control",
                                                            attrs:{type:"text",name:"state",required:""}})])},
                                                            function(){var t=this.$createElement,s=this._self._c||t;
                                                                return s("div",{staticClass:"form-group"},
                                                                [s("label",{attrs:{for:"postalcode"}},[this._v("Code Postal")]),
                                                                this._v(" "),s("input",{staticClass:"form-control",
                                                                attrs:{type:"text",name:"postalcode",required:""}})])},
                                                                function(){var t=this.$createElement,s=this._self._c||t;
                                                                    return s("div",{staticClass:"form-group"},
                                                                    [s("button",{staticClass:"btn btn-info",
                                                                    attrs:{type:"submit"}},[s("b",[this._v("Placer la Commande")])])])},
                                                                    function(){var t=this.$createElement,s=this._self._c||t;
                                                                        return s("td",[s("b",[this._v("Total")])])}]}}});
