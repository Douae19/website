<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <h4>{{ title }}</h4>
            <div class="table-responsive">
                <table class="table table-hover" id="order-table">
                    <thead>
                        <tr>
                            <th>Nom Client</th>
                            <th>Prix</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    data: function () {
        return {
            orders: [],
        };
    },

    created: function () {
        this.$nextTick(function () {
            this.initDataTable(this._orders);
        });

        this.refreshOrders();
    },

    methods: {
        getOrders: function (type) {
            var orders = [];
            for (var i in this.orders)
                if (this.orders[i].order_status == type || type == "all")
                    orders.push(this.orders[i]);
            return orders;
        },

        refreshOrders: function () {
            var vm = this;
            util.notify("Actualisation commandes", "loading");
            axios
                .get(data.getBaseURL() + "api/v1/order")
                .then(function (response) {
                    $.notifyClose();
                    vm.orders = response.data;
                })
                .catch(function (response) {
                    util.log(response);
                    util.notify("Erreur", "error");
                });
        },

        initDataTable: function (rows) {
            var vm = this;
            var data = this.transformData(rows);
            $("#order-table").DataTable({
                destroy: true,
                aaData: data,
                paging: true,
                ordering: false,
                searching: false,
                info: false,
                autoWidth: false,
            });

            this.addListener();
        },

        transformData: function (orders) {
            var res = [];
            for (var i in orders) {
                var row = [];
                row.push(orders[i]["customer_name"]);
                row.push(util.toCurrency(orders[i]["order_price"]));
                row.push(this.getStatus(orders[i]["order_status"]));
                row.push(util.toDate(orders[i]["created_at"]));
                row.push(`<button class="btn btn-info details" id="${orders[i]["id"]}">\
							voir détails \
							<sup><span class="badge">${orders[i]["order_item"]}</span></sup>\
						  </button>`);
                res.push(row);
            }

            return res;
        },

        addListener: function () {
            var vm = this;

            $("#order-table_next").click(function () {
                vm.addListener();
            });

            $(".details").click(function () {
                var id = $(this).attr("id");
                vm.$router.push(`/order/${vm.type}/details/${id}`);
            });
        },

        getStatus: function (type) {
            switch (type) {
                case "complete":
                    return `<span class="label label-success">Complétée</span>`;
                    break;
                case "cancel":
                    return `<span class="label label-danger">Annulée</span>`;
                    break;
                default:
                    return `<span class="label label-info">Nouvelle</span>`;
                    break;
            }
        },
    },

    watch: {
        _orders: function (val) {
            this.initDataTable(val);
        },
    },

    computed: {
        _orders: function () {
            return this.getOrders(this.type);
        },

        type: function () {
            return this.$route.params.type;
        },

        title: function () {
            switch (this.type) {
                case "new":
                    return "Nouvelles commandes";
                    break;
                case "complete":
                    return "Commandes complétées";
                    break;
                case "cancel":
                    return "Commandes annulées";
                default:
                    return "Toutes les commandes";
                    break;
            }
        },
    },
};
</script>
