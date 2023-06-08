<template>
    <div class="panel panel-default col-md-8 col-md-offset-2">
        <div class="panel panel-body">
            <form
                @submit.prevent="submit"
                method="POST"
                :action="baseURL + 'api/v1/admin'"
                class="row"
                enctype="multipart/form-data"
                id="adminForm"
            >
                <div class="form-group">
                    <label for="admin_name">Nom</label>
                    <input
                        type="text"
                        name="admin_name"
                        class="form-control"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="admin_user">Nom d'utilisateur</label>
                    <input
                        type="text"
                        name="admin_user"
                        class="form-control"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="admin_type">Type</label>
                    <select name="admin_type" class="form-control" required>
                        <option value="0" selected>Co-admin</option>
                        <option value="1">Admin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="admin_pass">Mot de Passe</label>
                    <input
                        type="password"
                        name="admin_pass"
                        class="form-control"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="admin_pass1">Confirmer Mot de Passe</label>
                    <input
                        type="password"
                        name="admin_pass1"
                        class="form-control"
                        required
                    />
                </div>
                <div class="form-group pull-right">
                    <button
                        type="submit"
                        class="btn btn-info"
                        :class="{ disabled: loading.isLoading }"
                    >
                        {{ loading.value }}
                    </button>
                    <button type="button" class="btn btn-default" @click="back">
                        Annuler
                    </button>
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
            loading: {
                isLoading: false,
                value: "Soumettre",
            },
        };
    },

    methods: {
        submit: function () {
            if (!this.isPasswordMatch())
                return util.notify(
                    "Les mots de passes ne se correspondent pas",
                    "error"
                );
            else if (this.loading.isLoading) return;

            this.startLoading();

            var vm = this;
            var url = this.baseURL + "api/v1/admin";
            var params = $("#adminForm").serialize();

            axios
                .post(url, params)
                .then(function (response) {
                    vm.stopLoading();
                    if (util.showResult(response)) vm.back();
                })
                .catch(function (error) {
                    vm.stopLoading();
                    util.showResult(error);
                });
        },

        back: function () {
            this.$router.push("/admin");
        },

        isPasswordMatch: function () {
            return (
                $('[name="admin_pass1"]').val() ==
                $('[name="admin_pass"]').val()
            );
        },

        startLoading: function () {
            util.notify("Ajout admin", "loading");
            this.loading = {
                isLoading: true,
                value: "Ajout",
            };
        },

        stopLoading: function () {
            $.notifyClose();
            this.loading = {
                isLoading: false,
                value: "Submit",
            };
        },
    },
};
</script>
