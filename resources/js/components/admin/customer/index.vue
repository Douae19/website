<template>
    <div class="col-md-9 panel panel-default">
        <div class="panel-body">
            <h4><b>Client</b></h4>
            <div class="table-responsive">
                <table class="table table-hover" id="customerTable">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Utilisateur</th>
                            <th>Adresse E-mail</th>
                            <th>Commandes</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            customers: [],
        };
    },

    created: function () {
        this.refreshCustomer();
    },

    methods: {
        refreshCustomer: function () {
            var vm = this;
            util.notify("Actualisation Clients", "loading");
            axios
                .get(data.getBaseURL() + "api/v1/customer")
                .then(function (response) {
                    $.notifyClose();
                    vm.customers = response.data;
                    vm.initDataTable();
                })
                .catch(function (error) {
                    util.notify("Erreur", "error");
                });
        },

        initDataTable: function () {
            $("#customerTable").DataTable({
                destroy: true,
                aaData: this.data,
                ordering: false,
                searching: true,
                info: false,
                autoWidth: false,
            });

            this.addListener();
        },

        addListener: function () {
            var vm = this;

            $("#customerTable_next").click(function () {
                vm.addListener();
            });

            $(".details").click(function () {
                var id = $(this).attr("id");
                vm.$router.push("/customer/orders/" + id);
            });
        },
    },

    computed: {
        data: function () {
            var customers = this.customers;
            var data = [];
            for (var i in customers) {
                var row = [];
                row.push(customers[i]["customer_name"]);
                row.push(customers[i]["customer_user"]);
                row.push(customers[i]["customer_email"]);
                row.push(
                    '<button class="btn btn-info details" id="' +
                        customers[i]["id"] +
                        '">\
							' +
                        customers[i]["orders"] +
                        " commandes\
						  </button>"
                );
                data.push(row);
            }
            return data;
        },
    },
};
</script>
