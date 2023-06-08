<template>
    <div class="panel panel-default col-md-8 col-md-offset-2">
        <div class="panel-body">
            <form
                v-on:submit.prevent="submit()"
                :action="baseURL + 'api/v1/category/' + id"
                class="row"
                id="catForm"
                enctype="multipart/form-data"
                method="POST"
            >
                <input type="hidden" name="_method" value="PUT" />
                <div class="form-group">
                    <label>Nom de la Catégorie</label>
                    <input
                        type="text"
                        class="form-control"
                        name="category_name"
                        :value="unescapeHTML(category.category_name)"
                        required
                    />
                </div>
                <div class="form-group">
                    <label>Description de la Catégorie</label>
                    <textarea
                        class="form-control"
                        style="height: 100%"
                        name="category_description"
                        :value="unescapeHTML(category.category_description)"
                    ></textarea>
                </div>
                <div class="form-group">
                    <label>Image de la Catégorie</label>
                    <input
                        type="file"
                        name="category_image"
                        accept="image/jpeg,image/png"
                        src="storageURL + category.category_image"
                    />
                </div>
                <div class="form-group pull-right">
                    <button
                        class="btn btn-primary"
                        v-bind:class="{ disabled: submitButton.loading }"
                        type="submit"
                    >
                        {{ submitButton.message }}
                    </button>
                    <span class="btn btn-default" v-on:click="back()"
                        >Retour</span
                    >
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            baseURL: data.getBaseURL(),
            storageURL: data.getStorageURL(),
            id: this.$route.params.category_id,
            submitButton: {
                loading: false,
                message: "Soumettre",
            },
        };
    },

    created() {
        $("#catForm").ajaxForm();
        if (!data.getCategory().id) this.getCategory(this.id);
    },

    methods: {
        back: function () {
            //data.getCategories() = this.escapeHTML(this.category)
            this.$router.push("/category");
        },

        /**
         * Update Category
         *
         */
        submit: function () {
            if (this.submitButton.loading) return;
            var notif = util.notify(
                util.getProgressbarMessage("Mise à jour de la catégorie", 0),
                "loading"
            );
            this.startLoading();
            var vm = this;
            $("#catForm").ajaxSubmit({
                success: function (response, status, xhr, $form) {
                    vm.stopLoading();
                    if (util.showResult(response, "ajax")) {
                        data.setCategories([]);
                        vm.back();
                    }
                },

                error: function (response) {
                    util.showResult(response, "ajax");
                    vm.stopLoading();
                },

                uploadProgress: function (a, b, c, d) {
                    notif.update(
                        "message",
                        util.getProgressbarMessage(
                            "Mise à jour de la catégorie",
                            d
                        )
                    );
                },
            });
        },

        /**
         * Get Category
         * @param Int $id Category id
         * @return Object Category
         */
        getCategory: function (id) {
            var vm = this;
            util.notify("En cours de téléchargement", "loading");
            axios
                .get(this.baseURL + "api/v1/category/" + id)
                .then(function (response) {
                    util.log(response);
                    vm.stopLoading();
                    data.setCategory(response.data);
                })
                .catch(function (response) {
                    vm.stopLoading();
                    util.showResult(response);
                });
        },

        /**
         * Start Loading
         *
         */
        startLoading: function () {
            this.submitButton = {
                loading: true,
                message: "Loading",
            };
        },

        /**
         * Stop Loading
         *
         */
        stopLoading: function () {
            $.notifyClose();
            this.submitButton = {
                loading: false,
                message: "Submit",
            };
        },

        /**
         * Unescape HTML
         * @param Object subcategory
         * @return Object unescape html
         */
        unescapeHTML: function (subcategory) {
            return util.unescapeHTML(subcategory);
        },
    },

    computed: {
        category: function () {
            return data.getCategory();
        },
    },
};
</script>
