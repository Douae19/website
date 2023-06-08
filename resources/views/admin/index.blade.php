<!Doctype HTML>
<html>
<head>
	<title>Compte Admin</title>
    <link rel="icon" href="/images/logoP.jpg" type="image/jpg">
	<link rel="stylesheet" href="{{ asset('css/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/datatables.net-bs/datatables.bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/Ionicons/css/ionicons.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/AdminLTE/dist/css/AdminLTE.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/AdminLTE/dist/css/skins/skin-blue.min.css') }}">
	<style type="text/css">
		.child-active {
			color: #fff !important;
		}

		.white {
			background-color: #fff;
		}

		.lime {
			color: lime;
		}
	</style>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div id="app" class="wrapper">
	<header class="main-header">

		<!-- Logo-->
		<a href="" class="logo">
			<span class="logo-lg"><img src="/images/logoP.jpg" style="width: 50px;
                height: 30px;margin-right:7%;">Vente en ligne</span>
		</a>

		<!-- Header Navbar -->
		<nav class="navbar navbar-static-top" role="navigation">
			<!-- Sidebar toggle button-->
			<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
				<span class="sr-only">Toggle navigation</span>
			</a>

			<!-- Navbar Right Menu -->
			<div class="navbar-custom-menu">
				<ul class="nav navbar-nav">
					<!-- User Account Menu -->
					<li class="dropdown user user-menu">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<img v-bind:src="admin.admin_image" class="user-image" alt="User Image">
							<span class="hidden-xs">@{{ admin.admin_name }}</span>
						</a>
						<ul class="dropdown-menu">
							<!-- The user image in the menu -->
							<li class="user-header" style="color:#fff;">
								<img v-bind:src="admin.admin_image" class="img-circle" alt="User Image">
                                <h4>@{{ admin.admin_name }} - @{{ admin.admin_type==1?'Admin':'Co-admin' }}</h4>
                                <small>Admin depuis @{{ admin.created_at }}</small>
							</li>
							<!-- Menu Footer-->
							<li class="user-footer">
                                <center>
                                    <button class="btn btn-danger" v-on:click="logout()" data-dismiss="modal">Se déconnecter</button>
                                </center>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</header>
	<aside class="main-sidebar">

		<!-- sidebar: style can be found in sidebar.less -->
		<section class="sidebar">

			<!-- Sidebar user panel (optional) -->
			<div class="user-panel">
				<div class="pull-left image">
					<img v-bind:src="admin.admin_image" class="img-circle" alt="User Image">
				</div>
				<div class="pull-left info">
					<p>@{{ admin.admin_name }}</p>
					<!-- Status -->
					<a href="#"><i class="fa fa-circle text-success"></i> En ligne</a>
				</div>
			</div>

			<!-- Sidebar Menu -->
			<ul class="sidebar-menu" data-widget="tree">
				<li class="header">Tableau de bord</li>

				<!-- Manage Category -->
				<router-link to="/category" tag="li" active-class="active">
					<a href=""><i class="glyphicon glyphicon-th-large"></i> <span>Gestion des catégories</span></a>
				</router-link>

				<!-- Manage Subcategory -->
				<router-link to="/subcategory" tag="li" active-class="active">
					<a href=""><i class="glyphicon glyphicon-th-list"></i> <span>Gestion des sous-catégories</span></a>
				</router-link>

				<li class="treeview" :class="{'active':$route.path.match('products')}">
					<a href="#"><i class="fa fa-shopping-cart"></i> <span>Gestion des produits</span>
						<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
					</a>
					<ul class="treeview-menu">
						<li class="header child-active">Sélectionner une Catégorie</li>
						<li
							v-for="category in categories"
							@click="$router.push(`/products/${category.id}/0`)"
							:class="{'active':$route.path.match(`/products/${category.id}`)}">
							<a href="#" @click.prevent="">@{{ minify(category.category_name) }}</a>
						</li>
					</ul>
				</li>
				<li class="treeview" :class="{'active':$route.path.match('order/')}">
					<a href="#"><i class="fa fa-ship"></i> <span>Gestion des commandes</span>
						<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
						</span>
					</a>
					<ul class="treeview-menu">
						<router-link tag="li" to="/order/all" active-class="active">
							<a href="#">Toutes les commandes</a>
						</router-link>

						<router-link tag="li" to="/order/new" active-class="active">
							<a href="#">Nouvelles commandes</a>
						</router-link>

						<router-link tag="li" to="/order/complete" active-class="active">
							<a href="#">Commandes complétées</a>
						</router-link>

						<router-link tag="li" to="/order/cancel" active-class="active">
							<a href="#">Commandes annulées</a>
						</router-link>
					</ul>
				</li>
				<router-link tag="li" to="/customer" active-class="active">
					<a href="#">
						<i class="fa fa-users"></i>
						<span>Gestion des Clients</span>
					</a>
				</router-link>
				<router-link v-if="admin.id==1" tag="li" to="/admin" active-class="active">
					<a href="#"><i class="fa fa-shield"></i> <span>Gestion des Admins</span></a>
				</router-link>>
			</ul>

			<!-- /.sidebar-menu -->
		</section>
		<!-- /.sidebar -->
	</aside>

	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper">
		<router-view></router-view>
	</div>
	<!-- /.content-wrapper -->




</div>
<div id="error"></div>

<script src="{{ asset('js/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('css/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/datatables.net/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('js/jquery.form.js') }}"></script>
<script src="{{ asset('css/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>
<script src="{{ asset('js/datatables.net/js/jquery.dataTables.buttons.min.js') }}"></script>
<script src="{{ asset('css/AdminLTE/dist/js/adminlte.min.js') }}"></script>
<script src="{{ asset('js/Vue.js') }}"></script>
<script src="{{ asset('js/vue-router.js') }}"></script>
<script src="{{ asset('js/bootstrap-notify.js') }}"></script>
<script src="{{ asset('js/axios.js') }}"></script>
<script src="{{ asset('js/moment.js') }}"></script>
<script src="{{ asset('js/util.js') }}"></script>
<script src="{{ asset('js/data.js') }}"></script>
<script>
//config
var util = new util(true);
data.setBaseURL("{{ asset('') }}");
data.setAdminId({{ session('ID') }});
</script>
<script src="{{ asset('js/app.js') }}"></script>
<script>
    import Modal from "../../js/components/mycomponents/modal/modal.vue";
    import ModalHeader from "../../js/components/mycomponents/modal/header.vue";
    import ModalBody from "../../js/components/mycomponents/modal/body.vue";
    import ModalFooter from "../../js/components/mycomponents/modal/footer.vue";
    export default {
        components: {
            // Enregistrez les composants modal, modal-header, modal-body et modal-footer dans les composants locaux
            Modal,
            "modal-header": ModalHeader,
            "modal-body": ModalBody,
            "modal-footer": ModalFooter,
        },
}
</script>
</body>
</html>
