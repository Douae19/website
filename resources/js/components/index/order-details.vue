<template>
    <div class="container">
        <div class="col-md-9">
            <div class="panel panel-default">
                <div class="panel-body">
                    <router-link class="btn btn-default" to="/order">
                        &lt; Retour</router-link
                    >
                    <button
                        class="btn btn-danger"
                        v-if="_new"
                        onclick="util.showModal('#cancelModal')"
                    >
                        Cancel Order
                    </button>
                    <h2>Détails de la Commande</h2>
                    <h6>Vous avez {{ totalItem }} article(s).</h6>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <tbody>
                                <tr
                                    v-for="(order, index) in order_item"
                                    v-if="index != 'order'"
                                >
                                    <td>
                                        <h5>
                                            {{ order.order_item_quantity }} x
                                            {{ order.product.product_name }}
                                        </h5>
                                    </td>
                                    <td>
                                        <h5 class="pull-right">
                                            {{
                                                toCurrency(
                                                    order.order_item_quantity *
                                                        order.product
                                                            .product_price
                                                )
                                            }}
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5><b>Total</b></h5>
                                    </td>
                                    <td>
                                        <h5 class="pull-right">
                                            <b>{{ toCurrency(totalPrice) }}</b>
                                        </h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <modal id="cancelModal">
            <modal-header>Annuler Commande</modal-header>
            <modal-body>
                <h1>
                    Est-ce que vous êtes sûr(e) de bien vouloir annuler votre
                    commande?
                </h1>
            </modal-body>
            <modal-footer>
                <button class="btn btn-danger" @click="cancel">
                    Annuler Commande
                </button>
                <button
                    class="btn btn-default"
                    onclick="util.hideModal('#cancelModal')"
                >
                    Retour
                </button>
            </modal-footer>
        </modal>
    </div>
</template>

<script type="text/javascript">
export default {
    data: function () {
        return {
            order_item: [],
        };
    },

    created: function () {
        if (!this.$route.query.id) {
            this.$router.push("/order");
            return;
        }
        this.refreshOrder();
    },

    methods: {
        refreshOrder: function () {
            var id = this.$route.query.id;
            var vm = this;
            util.notify(
                "Récupération des informations, veuillez patienter",
                "loading"
            );
            axios
                .get(data.getBaseURL() + "api/v1/user/order/" + id)
                .then(function (response) {
                    $.notifyClose();
                    response = util.getResponse(response);
                    vm.order_item = response;
                })
                .catch(function (error) {
                    util.notify("Erreur", error);
                });
        },

        cancel: function () {
            util.hideModal("#cancelModal");
            var id = this.$route.query.id;
            var vm = this;
            util.notify(
                "Annulation de votre commande, veuillez patienter",
                "loading"
            );
            axios
                .get(data.getBaseURL() + "api/v1/user/order/cancel/" + id)
                .then(function (response) {
                    response = util.getResponse(response);
                    if (response.status) {
                        if (response.status == "success") {
                            util.notify(
                                "Votre commande a été annulée",
                                "success"
                            );
                            vm.$router.push("/order");
                        } else util.notify("Erreur", "error");
                    } else util.notify("Erreur", "error");
                })
                .catch(function (error) {
                    util.notify("Erreur", "error");
                });
        },

        toCurrency: function (x) {
            return util.toCurrency(x);
        },
    },

    computed: {
        totalItem: function () {
            if (data.getStatus().LOG != "IN") this.$router.push("/");
            var orders = this.order_item;
            var totalItem = 0;
            for (var i in orders)
                if (i != "order") totalItem += orders[i].order_item_quantity;

            return totalItem;
        },

        totalPrice: function () {
            var orders = this.order_item;
            var totalPrice = 0;
            for (var i in orders)
                if (i != "order")
                    totalPrice +=
                        orders[i].order_item_quantity *
                        orders[i].product.product_price;
            return totalPrice;
        },

        _new: function () {
            var _new = false;
            if (this.order_item.order)
                _new =
                    this.order_item.order.order_status == "new" ? true : false;
            return _new;
        },
    },
};
</script>
