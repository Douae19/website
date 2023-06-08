<template>
    <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="table-responsive">
                    <table class="table table-hover" id="admin_table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nom</th>
                                <th>Nom d'utilisateur</th>
                                <th>Type</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isEmpty">
                                <td colspan="5" class="text-center">
                                    Aucune donnée disponible
                                </td>
                            </tr>
                            <tr v-else v-for="admin in admins" :key="admin.id">
                                <td>
                                    <img
                                        :src="
                                            data.getStorageURL() +
                                            admin.admin_image
                                        "
                                        class="thumbnail"
                                        height="60px"
                                        width="60px"
                                        :alt="admin.admin_name"
                                    />
                                </td>
                                <td>{{ admin.admin_name }}</td>
                                <td>{{ admin.admin_user }}</td>
                                <td v-html="getType(admin.admin_type)"></td>
                                <td v-html="deleteButton(admin.id)"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <modal id="deleteAdminModal">
            <modal-header>Supprimer Admin</modal-header>
            <modal-body>
                <h1>
                    Est-ce que vous êtes sûr(e) de vouloir supprimer cet Admin?
                </h1>
            </modal-body>
            <modal-footer>
                <button class="btn btn-danger" @click="deleteAdmin">
                    Supprimer Admin
                </button>
                <button
                    class="btn btn-default"
                    onclick="util.hideModal('#deleteAdminModal')"
                >
                    Annuler
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
            admins: [],
            admin_id: 0,
            isEmpty: true, // Nouvelle propriété pour indiquer si les données sont vides
        };
    },

    created: function () {
        this.$nextTick(function () {
            this.initDataTable();
        });

        this.refreshAdmin();
    },

    methods: {
        refreshAdmin: function () {
            var vm = this;
            util.notify("Actualisation admin", "loading");
            axios
                .get(data.getBaseURL() + "api/v1/admin")
                .then(function (response) {
                    $.notifyClose();
                    vm.admins = response.data;
                    vm.isEmpty = vm.admins.length === 0; // Mettre à jour isEmpty
                })
                .catch(function (error) {
                    util.notify("Erreur", "error");
                });
        },

        initDataTable: function () {
            var vm = this;
            $("#admin_table").DataTable({
                destroy: true,
                aaData: vm.data,
                autoWidth: false,
                info: false,
                searching: false,
                dom: "Bfrtip",
                buttons: [
                    {
                        text: '<i class="fa fa-plus"></i> Ajouter Admin',
                        action: function () {
                            vm.$router.push("/admin/add");
                        },
                        className: "btn btn-success",
                    },
                ],
            });

            this.addListener();
        },

        addListener: function () {
            var vm = this;

            $("#admin_table_next").click(function () {
                vm.addListener();
            });

            $(".delete").click(function () {
                var id = $(this).attr("id");
                vm.admin_id = id;
                util.showModal("#deleteAdminModal");
            });
        },

        deleteAdmin: function () {
            util.hideModal("#deleteAdminModal");
            util.notify("Suppression admin", "loading");
            var vm = this;
            axios
                .delete(data.getBaseURL() + "api/v1/admin/" + this.admin_id)
                .then(function (response) {
                    if (util.showResult(response)) vm.refreshAdmin();
                })
                .catch(function (error) {
                    util.showResult(error);
                });
        },

        getType: function (x) {
            var type = x == 1 ? "admin" : "co-admin";
            var label = x == 1 ? "success" : "info";
            return `<span class="label label-${label}">${type}</span>`;
        },

        isAdmin: function (x) {
            return x == 1;
        },

        deleteButton: function (id) {
            return `<i class="fa fa-trash delete" id="${id}"></i>`;
        },
    },

    watch: {
        admins: function (val) {
            this.initDataTable();
        },
    },

    computed: {
        data: function () {
            var admins = this.admins;
            var res = [];
            for (var i in admins) {
                var row = [];
                row.push(
                    `<img src="${
                        data.getStorageURL() + admins[i]["admin_image"]
                    }" class="thumbnail" heigh="60px" width="60px" alt="${
                        admins[i]["admin_name"]
                    }"/>`
                );
                row.push(admins[i]["admin_name"]);
                row.push(admins[i]["admin_user"]);
                row.push(this.getType(admins[i]["admin_type"]));
                row.push(this.deleteButton(admins[i]["id"]));
                res.push(row);
            }
            return res;
        },
    },
};
</script>
