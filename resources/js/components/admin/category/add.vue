<template>
    <div class="panel panel-default col-md-8 col-md-offset-2">
        <div class="panel-body">
            <form
                v-on:submit.prevent="submit()"
                :action="baseURL + 'api/v1/category'"
                class="row"
                id="catForm"
                enctype="multipart/form-data"
                method="POST"
            >
                <div class="form-group">
                    <label>Image de la Catégorie</label>
                    <input
                        type="file"
                        name="category_image"
                        accept="image/jpeg,image/png"
                    />
                </div>
                <div class="form-group">
                    <label>Nom de la Catégorie</label>
                    <input
                        type="text"
                        class="form-control"
                        name="category_name"
                        required
                    />
                </div>
                <div class="form-group">
                    <label>Description de la Catégorie</label>
                    <textarea
                        class="form-control"
                        style="height: 100%"
                        name="category_description"
                    ></textarea>
                </div>
                <div class="form-group pull-right">
                    <button
                        class="btn btn-primary"
                        v-bind:class="{ disabled: submitButton.loading }"
                        type="submit"
                    >
                        {{ submitButton.message }}
                    </button>
                    <router-link
                        class="btn btn-default"
                        type="button"
                        to="/category"
                        >Retour</router-link
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
            submitButton: { loading: false, message: "Soumettre" },
        };
    },

    created() {
        $("#catForm").ajaxForm();
    },

    methods: {
        submit: function () {
            if (this.submitButton.loading) return;
            var vm = this;
            var notif = util.notify(
                util.getProgressbarMessage("Ajout catégorie", 0),
                "loading"
            );
            this.startLoading();
            $("#catForm").ajaxSubmit({
                success: function (response, status, xhr, $form) {
                    vm.stopLoading();
                    if (util.showResult(response, "ajax")) {
                        data.setCategories([]);
                        vm.$router.push("/category");
                    }
                },

                error: function (response) {
                    util.showResult(response, "ajax");
                    vm.stopLoading();
                },

                uploadProgress: function (a, b, c, d) {
                    notif.update(
                        "message",
                        util.getProgressbarMessage("Ajout catégorie", d)
                    );
                },
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
            this.submitButton = {
                loading: false,
                message: "Submit",
            };
        },
    },
};
</script>
