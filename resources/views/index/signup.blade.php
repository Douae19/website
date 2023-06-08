<!Doctype HTML>
<html>
<head>
	<title>Inscription Polaris</title>
    <link rel="icon" href="/images/logoP.jpg" type="image/jpg">
	<link rel="stylesheet" href="{{ asset('css/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}">
	<style type="text/css">
		body{
			padding: 7.6px 2px;
            width: 92%;
            margin-left:8%;
            background-color: #217093;
		}
	</style>
</head>
<body>

<div id="signup_app" class="col-md-5 col-md-offset-3">
<div class="panel panel-default">
	<div class="panel-heading">
		<h2 style="color:#217093"> <img src="/images/logoP.jpg" style="margin: 0 auto; margin-right: 10%;
            width: 100px;border: 3px solid #d2d6de;"><b><i>Créer un Compte</b></i></h2>
	</div>

	<div class="panel-body">
		<form
			:action="baseURL+'api/v1/user/customer'"
			method="POST"
			@submit.prevent="submit"
			id="signup_form">

			<div class="form-group">
				<label for="name">Nom Complet</label>
				<input type="text" name="name" class="form-control" placeholder="votre nom et prénom" required/>
			</div>

			<div class="form-group">
				<label for="username">Nom d'utilisateur</label>
				<input type="text" name="username" class="form-control" placeholder="nom d'utilisateur" required/>
			</div>

			<div class="form-group">
				<label for="email">Adresse E-mail</label>
				<input type="email" name="email" class="form-control" placeholder="adresse e-mail" required/>
			</div>

			<div class="form-group">
				<label for="password">Mot de passe</label>
				<input type="password" name="password" class="form-control" placeholder="mot de passe" required/>
			</div>

			<div class="form-group">
				<label for="confirmpassword">Confirmation du Mot de passe saisi</label>
				<input type="password" name="confirmpassword" class="form-control" placeholder="confirmez votre mot de passe" required/>
			</div>

			<input type="submit" class="btn btn-primary form-control" value="S'inscrire" />

			<center>
				<h6>Vous avez déja un compte? Connectez-vous <a :href="baseURL+'login?ref='+ref">ici</a></h6>
			</center>

		</form>
	</div>
</div>
<div id="error"></div>
</div>

<script src="{{ asset('js/Vue.js') }}"></script>
<script src="{{ asset('js/vue-router.js') }}"></script>
<script src="{{ asset('js/axios.js') }}"></script>
<script src="{{ asset('js/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('js/jquery.form.js') }}"></script>
<script src="{{ asset('css/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/bootstrap-notify.js') }}"></script>
<script src="{{ asset('js/util.js') }}"></script>
<script src="{{ asset('js/data.js') }}"></script>
<script>
//config
var util = new util(true);
data.setBaseURL("{{ asset('') }}");
var app = new Vue({
	el: '#signup_app',
	data:{
		baseURL:data.getBaseURL(),
		ref:'{{ $request->ref }}'
	},

	methods:{
		submit: function() {
			var vm = this;

			if ($('[type=password]')[0].value != $('[type=password]')[1].value)
				return util.notify('Les mots de passes ne se correspondent pas', 'error');

			util.notify('Création du compte en cours, veuillez patienter...', 'loading');

			axios.post(this.baseURL+'api/v1/user/customer', $('#signup_form').serialize())
				.then( function(response){
					console.log(response)
					if(response.data.status == 'success') {
						util.notify(util.messageToString(response.data.message),'success');
						location.href = vm.baseURL+'login?ref='+vm.ref;
					} else {
						util.notify(util.messageToString(response.data.message), 'error');
					}
				})
				.catch(function(error){
					util.showResult(error);
				})
		}
	}
})

</script>

</body>
</html>
