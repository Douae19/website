<template>
    <div class="container">
        <div v-if="cart_quantity > 0">
            <h1><b>Panier</b></h1>
            <div class="panel panel-default col-md-8">
                <div class="panel-body">
                    <h6>
                        Vous avez {{ cart_quantity }} produit(s) dans votre
                        panier.
                    </h6>
                    <div class="table table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th width="80px"></th>
                                    <th>Produit</th>
                                    <th><center>Quantité</center></th>
                                    <th>
                                        <span class="pull-right">Price</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <cart-card
                                    v-for="(cart, index) in carts"
                                    :key="index"
                                    :index="index"
                                    :value="cart"
                                ></cart-card>
                                <tr>
                                    <td colspan="4">
                                        <span class="pull-right"
                                            ><b>{{
                                                toCurrency(totalPrice)
                                            }}</b></span
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <router-link
                        class="btn btn-success"
                        tag="button"
                        to="/check-out"
                        >Vérifier</router-link
                    >
                </div>
            </div>
        </div>
        <div v-if="cart_quantity < 1" class="jumbotron">
            <h1>Aucun produit dans le panier</h1>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    created: function () {
        this.refreshCart();
    },

    methods: {
        refreshCart: function () {
            var vm = this;
            util.notify("Refreshing cart...", "loading");
            axios
                .get(this.baseURL + "api/v1/user/category")
                .then(function (response) {
                    $.notifyClose();
                    data.setCategories(util.getResponse(response));
                })
                .catch(function (error) {
                    $.notifyClose();
                });
        },

        toCurrency: function (x) {
            return util.toCurrency(x);
        },
    },

    computed: {
        cart_quantity: function () {
            if (data.getStatus().LOG != "IN") return this.$router.push("/");
            var quantity = 0;
            var carts = data.getStatus().CARTS;
            for (var i in carts) quantity += carts[i].cart_quantity;
            return quantity;
        },

        carts: function () {
            return data.getStatus().CARTS;
        },

        totalPrice: function () {
            var price = 0;
            var carts = this.carts;
            for (var i in carts) {
                price +=
                    carts[i].cart_quantity * carts[i].product.product_price;
            }
            return price;
        },
    },
};
</script>
