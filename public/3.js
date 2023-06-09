webpackJsonp([3],{42:function(t,e,r){var o=r(0)(r(78),r(79),!1,null,null,null);
    t.exports=o.exports},78:function(t,e,r){
        "use strict";Object.defineProperty(e,"__esModule",{value:!0}),
        e.default={data:function(){return{order_item:[]}},
        created:function(){this.$route.query.id?this.refreshOrder():this.$router.push("/order")},
        methods:{refreshOrder:function(){var t=this.$route.query.id,e=this;
            util.notify("Récupération des Informations, veuillez patienter","loading"),
            axios.get(data.getBaseURL()+"api/v1/user/order/"+t).then(function(t){$.notifyClose(),
                t=util.getResponse(t),e.order_item=t}).catch(function(t){
                    util.notify("Erreur",t)})},cancel:function(){util.hideModal("#cancelModal");
                    var t=this.$route.query.id,e=this;util.notify(
                        "Annulation de votre commande, veuillez patienter","loading"),
                        axios.get(data.getBaseURL()+"api/v1/user/order/cancel/"+t).then(function(t){(
                            t=util.getResponse(t)).status&&"success"==t.status?(
                                util.notify("Votre commande a été annulée","success"),e.$router.push("/order"))
                                :util.notify("Erreur","error")}).catch(function(t){
                                    util.notify("Erreur","error")})},
                                    toCurrency:function(t){return util.toCurrency(t)}},
                                    computed:{totalItem:function(){
                                        "IN"!=data.getStatus().LOG&&this.$router.push("/");
                                        var t=this.order_item,e=0;
                                        for(var r in t)"order"!=r&&(e+=t[r].order_item_quantity);
                                        return e},totalPrice:function(){
                                            var t=this.order_item,e=0;
                                            for(var r in t)"order"!=r&&(e+=t[r].order_item_quantity*t[r].product.product_price);
                                            return e},_new:function(){var t=!1;return this.order_item.order&&
                                                (t="new"==this.order_item.order.order_status),t}}}},
                                                79:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;
                                                    return r("div",{staticClass:"container"},[r("div",{staticClass:"col-md-9"},
                                                    [r("div",{staticClass:"panel panel-default"},[r("div",{staticClass:"panel-body"},
                                                    [r("router-link",{staticClass:"btn btn-default",attrs:{to:"/order"}},[t._v(" < Retour")]),
                                                    t._v(" "),t._new?r("button",
                                                    {staticClass:"btn btn-danger",
                                                    attrs:{onclick:"util.showModal('#cancelModal')"}},
                                                    [t._v("Annuler Commande")]):t._e(),t._v(" "),
                                                    r("h2",[t._v("Détails de la Commande")]),t._v(" "),r("h6",
                                                    [t._v("Vous avez "+t._s(t.totalItem)+" article(s).")]),t._v(" "),
                                                    r("div",{staticClass:"table-responsive"},
                                                    [r("table",{staticClass:"table table-hover"},
                                                    [r("tbody",[t._l(t.order_item,function(e,o){return"order"!=o?r("tr",
                                                    [r("td",[r("h5",[t._v(t._s(e.order_item_quantity)+" x "+
                                                    t._s(e.product.product_name))])]),t._v(" "),
                                                    r("td",[r("h5",{staticClass:"pull-right"},
                                                    [t._v("\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.toCurrency(e.order_item_quantity*e.product.product_price))+"\n\t\t\t\t\t\t\t\t\t")])])]):t._e()}),t._v(" "),
                                                    r("tr",[t._m(0),t._v(" "),r("td",[r("h5",{staticClass:"pull-right"},[r("b",
                                                    [t._v(t._s(t.toCurrency(t.totalPrice)))])])])])],2)])])],1)])]),
                                                    t._v(" "),r("modal",{attrs:{id:"cancelModal"}},
                                                    [r("modal-header",[t._v("Annuler Commande")]),t._v(" "),r("modal-body",
                                                    [r("h1",[t._v("Est-ce que vous êtes sûr(e) de bien vouloir annuler votre commande?")])]),
                                                    t._v(" "),r("modal-footer",[r("button",{staticClass:"btn btn-danger",on:{click:t.cancel}},
                                                    [t._v("Annuler Commande")]),t._v(" "),r("button",{staticClass:"btn btn-default",
                                                    attrs:{onclick:"util.hideModal('#cancelModal')"}},[t._v("Retour")])])],1)],1)},
                                                    staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;
                                                        return e("td",[e("h5",[e("b",[this._v("Total")])])])}]}}});
