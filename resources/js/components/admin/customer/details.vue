<template>
    <div>
        <div class="form-group">
            <button @click="back" class="btn btn-default white">
                &lt; Retour
            </button>
            <button
                class="btn btn-danger"
                v-if="isNew"
                onclick="util.showModal('#cancelModal')"
            >
                <i class="fa fa-trash"></i> Annuler Commande
            </button>
            <button
                class="btn btn-success"
                v-if="isNew"
                onclick="util.showModal('#completeModal')"
            >
                <i class="fa fa-check"></i> Compléter Commande
            </button>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h4><b>Détails de Clients</b></h4>
                        <table>
                            <info _key="Nom" :value="fullname" />
                            <info
                                _key="Adresse1"
                                :value="order_detail.order_address1"
                            />
                            <info
                                _key="Adresse2"
                                :value="order_detail.order_address2"
                            />
                            <info
                                _key="Numéro de Téléphone"
                                :value="order_detail.order_phone"
                            />
                            <info
                                _key="Ville"
                                :value="order_detail.order_city"
                            />
                            <info
                                _key="État"
                                :value="order_detail.order_state"
                            />
                            <info
                                _key="Code Postal"
                                :value="order_detail.order_postalcode"
                            />
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h4><b>Détails de Commande</b></h4>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <tr v-for="item in items">
                                    <td>
                                        <h5>{{ getItem(item) }}</h5>
                                    </td>
                                    <td>
                                        <h5 class="pull-right">
                                            {{ toCurrency(item) }}
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5><b>Total</b></h5>
                                    </td>
                                    <td>
                                        <h5 class="pull-right">
                                            <b>{{ totalPrice }}</b>
                                        </h5>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal id="cancelModal">
            <modal-header><h4>Annuler Commande</h4></modal-header>
            <modal-body>
                <h1>
                    Est-ce que vous êtes sûr(e) de bien vouloir annuler cette
                    commande?
                </h1>
            </modal-body>
            <modal-footer>
                <button class="btn btn-danger" @click="cancelOrder()">
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

        <modal id="completeModal">
            <modal-header><h4>Compléter Commande</h4></modal-header>
            <modal-body>
                <h1>
                    Est-ce que vous êtes sûr(e) que cette commande est complète?
                </h1>
            </modal-body>
            <modal-footer>
                <button class="btn btn-success" @click="completeOrder()">
                    Compléter commande
                </button>
                <button
                    class="btn btn-default"
                    onclick="util.hideModal('#completeModal')"
                >
                    Retour
                </button>
            </modal-footer>
        </modal>
    </div>
</template>

<script>
import Modal from "../../mycomponents/modal/modal.vue";
import ModalHeader from "../../mycomponents/modal/header.vue";
import ModalBody from "../../mycomponents/modal/body.vue";
import ModalFooter from "../../mycomponents/modal/footer.vue";
export default {
    components: {
        // Enregistrez les composants modal, modal-header, modal-body et modal-footer dans les composants locaux
        Modal,
        "modal-header": ModalHeader,
        "modal-body": ModalBody,
        "modal-footer": ModalFooter,
    },
    data: function () {
        return {
            order_detail: {},
        };
    },

    created: function () {
        this.refreshOrderDetails();
    },

    methods: {
        refreshOrderDetails: function () {
            var vm = this;
            util.notify("Récupération détails, veuillez patienter", "loading");
            axios
                .get(data.getBaseURL() + "api/v1/order/" + this.id)
                .then(function (response) {
                    $.notifyClose();
                    vm.order_detail = response.data;
                })
                .catch(function (error) {
                    util.notify("Erreur", "error");
                });
        },

        getItem: function (item) {
            return (
                item.order_item_quantity + "  x  " + item.product.product_name
            );
        },

        toCurrency: function (item) {
            return util.toCurrency(
                item.order_item_quantity * item.product.product_price
            );
        },

        back: function () {
            this.$router.push(`/customer/orders/${this.customer_id}`);
        },

        cancelOrder: function () {
            var vm = this;
            util.hideModal("#cancelModal");
            util.notify("Annuler Commande, veuillez patienter...", "loading");
            axios
                .get(data.getBaseURL() + "api/v1/order/cancel/" + this.id)
                .then(function (response) {
                    if (response.data.status) {
                        if (response.data.status == "success") {
                            util.notify("Commande annulée");
                            vm.back();
                        } else util.notify("Erreur", "error");
                    } else {
                        util.notify("Erreur", "error");
                    }
                })
                .catch(function (error) {
                    util.notify("Erreur", "error");
                });
        },

        completeOrder: function () {
            var vm = this;
            util.hideModal("#completeModal");
            util.notify("En cours de téléchargement...", "loading");
            axios
                .get(data.getBaseURL() + "api/v1/order/complete/" + this.id)
                .then(function (response) {
                    if (response.data.status) {
                        if (response.data.status == "success") {
                            util.notify("Commande complétée", "success");
                            vm.back();
                        } else util.notify("Erreur", "error");
                    } else {
                        util.notify("Erreur", "error");
                    }
                })
                .catch(function (error) {
                    util.notify("Erreur", "error");
                });
        },
    },

    computed: {
        fullname: function () {
            var firstname = this.order_detail.order_firstname;
            var lastname = this.order_detail.order_lastname;
            var fullname = firstname + " " + lastname;
            return this.order_detail.order_status ? fullname : "";
        },

        customer_id: function () {
            return this.$route.params.customer_id;
        },

        id: function () {
            return this.$route.query.id;
        },

        isNew: function () {
            return this.order_detail.order_status == "new";
        },

        items: function () {
            var item = [];
            if (this.order_detail.order_item)
                item = this.order_detail.order_item;
            return item;
        },

        totalPrice: function () {
            var price = 0;
            for (var i in this.items) {
                price +=
                    this.items[i].order_item_quantity *
                    parseFloat(this.items[i].product.product_price);
            }
            return util.toCurrency(price);
        },
    },

    components: {
        info: {
            props: ["_key", "value"],
            template:
                "<tr>\
						<td>\
							<h5><b>{{ _key }}&nbsp;&nbsp;</b></h5>\
						</td>\
						<td>\
							<h5>{{ value }}</h5>\
						</td>\
					   </tr>",
        },
    },
};
</script>
