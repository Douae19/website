<template>
    <div class="panel panel-default col-md-8 col-md-offset-2">
        <div class="panel-body">
            <form
                @submit.prevent="submit()"
                :action="baseURL + 'api/v1/product'"
                method="POST"
                id="productForm"
                enctype="mutlipart/formdata"
                class="row"
            >
                <div class="form-group">
                    <label>Sélectionner Sous-catégorie</label>
                    <select
                        class="form-control"
                        name="subcategory_id"
                        v-model="subcategory_id"
                        required
                    >
                        <option value="0" disabled>
                            -- Aucune Sous-catégorie sélectionnée --
                        </option>
                        <option
                            v-for="subcategory in subcategories"
                            :value="subcategory.id"
                        >
                            {{ minify(subcategory.subcategory_name) }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Image Produit</label>
                    <input
                        type="file"
                        name="product_image"
                        accept="image/jpeg,image/png"
                    />
                </div>
                <div class="form-group">
                    <label>Nom Produit</label>
                    <input
                        type="text"
                        name="product_name"
                        class="form-control"
                        required
                    />
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea
                        name="product_description"
                        class="form-control"
                    ></textarea>
                </div>

                <div class="form-group">
                    <label>Prix</label>
                    <input
                        type="text"
                        name="product_price"
                        class="form-control"
                        required
                    />
                </div>

                <div class="form-group">
                    <label>Quantité</label>
                    <div class="input-group">
                        <div class="input-group-btn">
                            <span
                                @click="product_quantity--"
                                class="btn btn-info"
                            >
                                <i class="fa fa-minus"></i>
                            </span>
                        </div>
                        <div class="form-control" style="text-align: center">
                            <input
                                type="hidden"
                                name="product_quantity"
                                v-model="product_quantity"
                            />
                            <b
                                ><span>{{ product_quantity }}</span> en stock</b
                            >
                        </div>
                        <div class="input-group-btn">
                            <span
                                class="btn btn-info"
                                @click="product_quantity++"
                            >
                                <i class="fa fa-plus"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="pull-right">
                    <input
                        type="submit"
                        class="btn btn-primary"
                        :value="submitButton.message"
                        :class="{ disabled: submitButton.loading }"
                    />
                    <input
                        type="button"
                        class="btn btn-default"
                        value="Retour"
                        @click="back()"
                    />
                </div>
            </form>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    data: function () {
        return {
            quantity: 1,
            baseURL: data.getBaseURL(),
            submitButton: {
                loading: false,
                message: "Soumettre",
            },
        };
    },

    methods: {
        back: function () {
            this.$router.push(
                `/products/${this.category_id}/${this.subcategory_id}`
            );
        },

        /**
         * Start Loading
         *
         */
        startLoading: function () {
            this.submitButton = {
                message: "Loading",
                loading: true,
            };
        },

        /**
         * Stop Loading
         *
         */
        stopLoading: function () {
            $.notifyClose();
            this.submitButton = {
                message: "Submit",
                loading: false,
            };
        },

        /**
         * Submit the form and add product
         *
         */
        submit: function () {
            var vm = this;
            if (vm.submitButton.loading) return;
            this.startLoading();
            var notif = util.notify(
                util.getProgressbarMessage("Ajout produit", 0),
                "loading"
            );
            $("#productForm").ajaxSubmit({
                success: function (response, a, b, c) {
                    if (util.showResult(response, "ajax")) vm.back();
                    vm.stopLoading();
                },

                error: function (response) {
                    vm.stopLoading();
                    util.showResult(response, "ajax");
                },

                uploadProgress: function (a, b, c, percentCompleted) {
                    notif.update(
                        "message",
                        util.getProgressbarMessage(
                            "Ajout produit",
                            percentCompleted
                        )
                    );
                },
            });
        },

        /**
         * Unescape HTML
         * @param "String" html
         * @return "String" unescaped html
         */
        minify: function (html) {
            return util.minify(util.unescapeHTML(html), 20);
        },
    },

    computed: {
        subcategories: function () {
            var x = data.subcategories;
            var y = [];
            for (var i in x)
                if (x[i].category_id == this.category_id) y.push(x[i]);
            return y;
        },

        category_id: function () {
            return this.$route.params.category_id;
        },

        subcategory_id: {
            get: function () {
                return this.$route.params.subcategory_id;
            },
            set: function (value) {
                this.$router.push({ params: { subcategory_id: value } });
            },
        },

        product_quantity: {
            get: function () {
                return this.quantity;
            },
            set: function (value) {
                if (value < 1) this.quantity = 0;
                else this.quantity = value;
            },
        },
    },
};
</script>
