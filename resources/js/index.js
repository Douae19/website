const home = () => import('./components/index/home.vue');
const product = () => import('./components/index/product.vue');
const cart = () => import('./components/index/cart.vue');
const checkout = () => import('./components/index/check-out.vue');
const order = () => import('./components/index/order.vue');
const order_details = () =>import('./components/index/order-details.vue');

import('./components.js');

const redir = {
	template: '<div>{{$router.push(`/category/${$route.params.category_id}/subcategory/0`)}}</div>'
}

const routes = [
	{path: '/', component: home},
	{path: '/category/:category_id', component: redir},
	{path: '/check-out', component: checkout},
	{path: '/cart', component: cart},
	{path: '/order', component: order},
	{path: '/order-details', component: order_details},
	{
		path: '/category/:category_id/subcategory/:subcategory_id',
		component: product
	}
]

const router = new VueRouter({
	routes
})

const app = new Vue({
	router,

	data: {
		baseURL: data.getBaseURL(),
		storageURL: data.getStorageURL()
	},

	created(){
		this.refreshCategories();
	},

	methods: {
		refreshCategories: function(){
			var vm = this;
			util.notify('Loading please wait...', 'loading');
			axios.get(this.baseURL+'api/v1/user/category')
				 .then(function(response){
				 	$.notifyClose();
				 	data.setCategories(util.getResponse(response));
				 })
				 .catch(function(error){
				 	util.showResult(error);
				 })
		},

		logout: function(){
			util.notify('Logging out', 'loading');
			axios.get(this.baseURL+'api/v1/user/customer/logout')
				 .then(function(response){
				 	response = util.getResponse(response);
				 	if (response.status == 'success')
				 		util.notify('Logout successfully', 'success');
				 	else
				 		util.notify('An error occured', 'error');
				 })
				 .catch(function(response){
				 	util.notify('An error occured', 'error');
				 })
		}
	},

	computed:{
		categories: function(){
			return data.getCategories();
		},

		status: function(){
			return data.getStatus();
		},

		cart_quantity: function(){
			var quantity = 0;
			var carts = data.getStatus().CARTS;
			for (var i in carts)
				quantity += carts[i].cart_quantity;
			return quantity;
		}
	}

}).$mount('#index_app');
