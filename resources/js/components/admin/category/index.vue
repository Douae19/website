<template>
    <div class="panel panel-default col-md-8 col-md-offset-2">
        <div class="panel-body table-responsive">
            <table class="table table-hover" id="categories">
                <thead>
                    <tr>
                        <th width="50px"></th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <modal id="deleteCategoryModal">
            <modal-header>Supprimer Catégorie</modal-header>
            <modal-body>
                <p>
                    <b>Avertissement :</b> Suppression de la catégorie va aussi
                    supprimer ses sous-catégories et produits
                </p>
            </modal-body>
            <modal-footer>
                <button
                    class="btn btn-danger"
                    v-on:click="deleteCategory(getCategoryId())"
                >
                    Supprimer
                </button>
                <button class="btn btn-default" data-dismiss="modal">
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
            categoryId: 0,
        };
    },

    created() {
        if (this.categories.length < 1) this.refreshCategories();
        else
            this.$nextTick(function () {
                var rows = this.transformData(this.categories);
                this.initDatatable(rows);
            });
    },

    methods: {
        /**
         * Refresh categories
         *
         * @return Object[] categories
         */
        refreshCategories: function () {
            var vm = this;
            util.notify("Actualisation catégories", "loading");
            axios
                .get(data.getBaseURL() + "api/v1/category")
                .then(function (response) {
                    $.notifyClose();
                    data.setCategories(response.data);
                })
                .catch(function (error) {
                    util.showResult(error);
                });
        },

        /**
         * Delete an Item on categories
         * @param Int Category Id
         * @return JSON delete result
         */
        deleteCategory: function (id) {
            var vm = this;
            util.hideModal("#deleteCategoryModal");
            util.notify("Suppression Catégorie", "loading");
            axios
                .delete(data.getBaseURL() + "api/v1/category/" + id)
                .then(function (response) {
                    if (util.showResult(response)) vm.refreshCategories();
                })
                .catch(function (error) {
                    util.showResult(error);
                });
        },

        /**
         * Transform category data into html rows
         * @param Object[] categories
         * @return String[][] data
         */
        transformData: function (categories) {
            var result = [];
            for (var i in categories) {
                var row = [];
                var image =
                    data.getStorageURL() + categories[i]["category_image"];
                var id = categories[i]["id"];

                row.push(
                    '<img src="' +
                        image +
                        '" class="thumbnail" height="50px" width="50px" />'
                );
                row.push(util.minify(categories[i]["category_name"], 15));
                row.push(
                    util.minify(categories[i]["category_description"], 15)
                );
                row.push(
                    '<button class="btn btn-link edit" name="' +
                        id +
                        '"><span class="fa fa-edit"></span></button>'
                );
                row.push(
                    '<button class="btn btn-link delete" data-category-id="' +
                        id +
                        '"><span class="fa fa-trash"></span></button>'
                );

                result.push(row);
            }
            return result;
        },

        /**
         * Initialize Data Table
         * @param String[][] rows
         * @return Object Datatable
         */
        initDatatable: function (rows) {
            var vm = this;

            $("#categories").DataTable({
                destroy: true,
                aaData: rows,
                paging: true,
                ordering: false,
                searching: false,
                info: false,
                autoWidth: false,
                dom: "Bfrtip",
                buttons: [
                    {
                        text: '<span class="fa fa-plus"></span> Ajouter Catégorie',
                        action: function (e, dt, node, config) {
                            vm.$router.push("/category/add");
                        },
                        className: "btn btn-success",
                    },
                    {
                        text: '<span class="fa fa-refresh"></span> Actualiser',
                        className: "btn btn-primary",
                        action: function (a, b, c, d, e) {
                            vm.refreshCategories();
                        },
                    },
                ],
            });
            this.addListener();
        },

        /**
         * Set Category Id
         * @param Int Category Id
         *
         */
        setCategoryId: function (id) {
            this.categoryId = id;
        },

        /**
         * Get Category Id
         *
         * @return Int Category ID
         */
        getCategoryId: function () {
            return this.categoryId;
        },

        /**
         * Get Category by id
         * @param Int category id
         * @return Object category
         */
        getCategory: function (id) {
            var cat = this.categories;
            for (var i in cat) if (cat[i].id == id) return cat[i];
        },

        /**
         * Add listener on every edit and delete button
         *
         */
        addListener: function () {
            var vm = this;

            //Refresh Listener everytime the page change
            $("#categories_next").click(function () {
                vm.addListener();
            });

            $(".edit").click(function () {
                var id = $(this).attr("name");
                data.setCategory(vm.getCategory(id));
                vm.$router.push("/category/edit/" + id);
            });

            $("body").on("click", ".delete", function () {
                var id = $(this).data("category-id");
                util.showModal("#deleteCategoryModal");
                vm.setCategoryId(id);
            });
        },
    },

    watch: {
        categories: function (val) {
            var rows = this.transformData(val);
            this.initDatatable(rows);
        },
    },

    computed: {
        categories: function () {
            return data.getCategories();
        },
    },
};
</script>
