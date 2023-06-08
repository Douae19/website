<!Doctype HTML>
<html>
<head>
	<title>Espace Membre</title>
    <link rel="icon" href="/images/logoP.jpg" type="image/jpg">
	<link rel="stylesheet" href="{{ asset('css/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}">
	<style type="text/css">
		body{
			padding: 50px 5px;
            width: 92%;
            margin-left:8%;
            margin-top: 5%;
            background-color: #217093;
		}
	</style>
</head>
<body>
<div id="login_app" class="col-md-5 col-md-offset-3">
	<div class="panel panel-default">
		<div class="panel-heading">
			<h2 style="color:#217093"> <img src="/images/logoP.jpg" style="margin: 0 auto; margin-right: 10%;
                width: 100px;padding: 3px;border: 3px solid #d2d6de;"><b><i>Connexion Membre</b></i></h2>
		</div>
		<div class="panel-body">
			<form @submit.prevent="submit" id="login_form">
				<div class="form-group">
					<label for="user">Nom d'utilisateur ou Adresse E-mail</label>
					<input type="text" name="user" class="form-control" placeholder="nom d'utilisateur ou adresse e-mail" required/>
				</div>
				<div class="form-group">
					<label for="password">Mot de passe</label>
					<input type="password" name="password" class="form-control" id="password" placeholder="mot de passe" required/>
				</div>

				<label>
					<input
						type="checkbox"
						id="visibility"
						onclick=" $(this)[0].checked ?
									$('#password').attr('type','text'):
									$('#password').attr('type','password')"/> Montrer le mot de passe
				</label>
                <br>
                <br>
				<div class="form-group">
					<input type="submit" class="btn btn-primary form-control" value="Se Connecter"/>
				</div>
				<center>
					<h6>Vous n'avez toujours pas de compte? Inscrivez-vous <a :href="baseURL+'signup?ref='+ref">ici</a></h6>
				</center>
			</form>
		</div>
	</div>
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
	el: '#login_app',
	data:{
		baseURL:data.getBaseURL(),
		ref: '{{ $request->ref }}'
	},

	methods:{
		submit: function() {
			var vm = this;
			util.notify('Connexion en cours, veuillez patienter...', 'loading');
			axios.post(this.baseURL+'api/v1/user/customer/login', $('#login_form').serialize())
				.then(function(response){
					if (response.data.status == 'success') {
						util.notify(util.messageToString(response.data.message),'success');
						location.href = vm.baseURL+'#'+vm.ref;
					}  else {
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
