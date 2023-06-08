<!Doctype HTML>
<html>
<head>
	<title>Connexion Admin</title>
    <link rel="icon" href="/images/logoP.jpg" type="image/jpg">

    <link rel="stylesheet" href="{{ asset('css/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}">
	<style type="text/css">
		body{
			padding: 50px 5px;
            width: 92%;
            margin-left:8%;
            margin-top: 3%;
            background-color: #217093;
		}
	</style>
</head>
<body>
<div id="login_app" class="col-md-5 col-md-offset-3">
	<div class="panel panel-default">
		<div class="panel-heading">
			<h2 style="color:#217093"> <img src="/images/logoP.jpg" style="margin: 0 auto; margin-right: 10%;
            width: 100px;padding: 3px;border: 3px solid #d2d6de;"><b><i>Connexion Admin</b></i></h2>
		</div>
		<div class="panel-body">
			<form @submit.prevent="submit" id="login_form">
				<div class="form-group">
					<label for="user">Nom d'utilisateur ou Adresse E-mail</label>
					<input type="text" name="email" class="form-control" placeholder="nom d'utilisateur ou adresse e-mail" required/>
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
<script src="{{ asset('js/login_app.js') }}"></script>
<script>
//config
var util = new util(true);
data.setBaseURL("{{ asset('') }}");
</script>

</body>
</html>
