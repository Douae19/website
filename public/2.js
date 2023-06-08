webpackJsonp([2],{41:function(e,r,t){var n=t(0)(t(76),t(77),!1,null,null,null);e.exports=n.exports},
76:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),
r.default={created:function(){this.quantity<1?this.$router.push("/"):this.refreshOrder()},
methods:{refreshOrder:function(){util.notify("Actualisation Commande(s)","loading"),
axios.get(data.getBaseURL()+"api/v1/user/order").then(function(e){
    $.notifyClose();e=util.getResponse(e);data.setOrders(e)}).catch(function(e){
        util.log(e),util.notify("Erreur","error")})},getOrder:function(e,r){
            var t=[];for(var n in e)e[n].order_status==r&&t.push(e[n]);return t}},
            computed:{quantity:function(){return"IN"!=data.getStatus().LOG?this.$router.push("/"):
            data.getStatus().ORDER_QUANTITY},orders:function(){return data.getOrders()},
            newOrder:function(){return this.getOrder(this.orders,"new")},
            cancelOrder:function(){return this.getOrder(this.orders,"cancel")},
            completeOrder:function(){return this.getOrder(this.orders,"complete")}}}},
            77:function(e,r){e.exports={render:function(){var e=this,r=e.$createElement,
                t=e._self._c||r;return t("div",{staticClass:"container"},
                [e.orders.length>0?t("div",[e._m(0),e._v(" "),t("order",
                {attrs:{name:"Nouvelle(s) Commande(s)",orders:e.newOrder}}),
                e._v(" "),t("order",{attrs:{name:"Commande(s) Complétée(s)",
                orders:e.completeOrder}}),e._v(" "),
                t("order",{attrs:{name:"Commande(s) Annulée(s)",orders:e.cancelOrder}})],1):
                t("div",[e._m(1)])])},staticRenderFns:[function(){var e=this.$createElement,
                    r=this._self._c||e;return r("h1",[r("b",[this._v("Liste des Commandes")])])},
                    function(){var e=this.$createElement,r=this._self._c||e;
                        return r("div",{staticClass:"jumbotron"},
                        [r("h2",[this._v("Aucune Commande")])])}]}}});
