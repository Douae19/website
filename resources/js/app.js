//Importing Asynchronous Components
const home = () => import('./components/admin/home/home.vue');

const category = () => import('./components/admin/category/category.vue');
const categoryIndex = () => import('./components/admin/category/index.vue');
const categoryAdd = () => import('./components/admin/category/add.vue');
const categoryEdit = () => import('./components/admin/category/edit.vue');

const subcategory = () => import('./components/admin/subcategory/subcategory.vue');
const subcategoryIndex = () => import('./components/admin/subcategory/index.vue');
const subcategoryAdd = () => import('./components/admin/subcategory/add.vue');
const subcategoryEdit = () => import('./components/admin/subcategory/edit.vue');

const product = () => import('./components/admin/product/product.vue');
const productIndex = () => import('./components/admin/product/index.vue');
const productAdd = () => import('./components/admin/product/add.vue');
const productEdit = () => import('./components/admin/product/edit.vue');

const order = () => import('./components/admin/order/order.vue');
const orderIndex = () => import('./components/admin/order/index.vue');
const orderDetails = () => import('./components/admin/order/details.vue');

const customer = () => import('./components/admin/customer/customer.vue');
const customerIndex = () => import('./components/admin/customer/index.vue');
const customerOrders = () => import('./components/admin/customer/orders.vue');
const customerDetails = () => import('./components/admin/customer/details.vue');

const admin = () => import('./components/admin/admin/admin.vue');
const adminIndex = () => import('./components/admin/admin/index.vue');
const adminAdd = () => import('./components/admin/admin/add.vue');

import('./components');
import('./index')

//Setting up Routes
export const routes = [
	{path: '/', component: home},
	{path: '/subcategory', redirect: {path: `/subcategory/${0}`}},
	{path: '/products/:category_id', component: product},
    {
		path: '/category',
		component: category,
		children: [
			{path: '', component: categoryIndex},
			{path: 'add', component: categoryAdd},
			{path: 'edit/:category_id', component: categoryEdit}
		]
	},

	{
		path: '/subcategory/:category_id',
		component: subcategory,
		children: [
			{path: '', component: subcategoryIndex},
			{path:'add', component: subcategoryAdd},
			{path:'edit/:subcategory_id', component: subcategoryEdit}
		]
	},

	{
		path: '/products/:category_id/:subcategory_id',
		component: product,
		children:[
			{path:'', component: productIndex},
            {path:'add', component: productAdd},
            {path:'edit/:product_id', component: productEdit}
		]
	},

    {
        path: '/order/:type',
        component: order,
        children:[
            {path:'', component: orderIndex},
            {path:'details/:order_id', component: orderDetails}
        ]
    },

    {
        path: '/customer',
        component: customer,
        children:[
            {path:'', component: customerIndex },
            {path:'orders/:customer_id', component: customerOrders},
            {path:'orders/:customer_id/details', component: customerDetails}
        ]
    },

    {
        path: '/admin',
        component: admin,
        children: [
            {path: '', component: adminIndex},
            {path: 'add', component: adminAdd}
        ]
    }
];

//Registering routes
const router = new VueRouter({
	routes
});

//Initialize Vue
const app = new Vue({
	router,
    el: '#app',
    data: {
    	baseURL: data.getBaseURL(),
    	storageURL: data.getStorageURL(),
    	adminId: data.getAdminId(),

    	try: 0,
    	notif:''
    },

    created() {
        data.setAdmin({
            admin_name: 'Loading...',
            admin_image: 'storage/images/loading.jpg'
        });
    	this.notif = util.notify('Please wait', 'loading');
    	this.getAdmin(this.adminId);
    },

    methods: {

    	/**
    	 * Get Admin information
    	 * @param Int Admin Id
    	 * @return Object admin
    	 */
    	getAdmin: function(adminId) {
    		var vm = this;
    		axios.get(this.baseURL+'api/v1/admin/'+adminId)
    			 .then( function(response) {
    			 	vm.try = 0;
    			 	response.data.admin_image = vm.storageURL+response.data.admin_image;
    			 	data.setAdmin(response.data);
    			 	vm.getCategories();
    			 })
    			 .catch( function(error) {
    			 	util.log(error);
    			 	if (vm.try < 3) {
    			 		vm.try++;
    			 		vm.getAdmin(adminId);
    			 	} else
    			 		util.notif('An error occured, try to refresh', 'error');
    			 })
    	},

    	/**
    	 * Get Categories
    	 *
    	 * @return Object[] category
    	 */
    	getCategories: function() {
    		var vm = this;
    		axios.get(this.baseURL+'api/v1/category')
    			.then( function(response) {
    				vm.try = 0;
    				vm.notif.close();
    				data.setCategories(response.data);
                    vm.getSubcategories();
    			})
    			.catch( function(error) {
    				util.log(error);
    				if (vm.try < 3) {
    					vm.try++;
    					vm.getCategories();
    				} else
    					util.notify('An error occured, try to refresh', 'error');
    			})
    	},

        /**
         * Get subcategories
         *
         */
        getSubcategories: function() {
            var vm = this;
            axios.get(this.baseURL+'api/v1/subcategory')
                .then(function(response){
                    vm.try = 0;
                    vm.notif.close();
                    data.setSubcategories(response.data);
                })
                .catch( function(error){
                    util.log(error);
                    if(vm.try < 3) {
                        vm.try++;
                        vm.getSubcategories();
                    } else
                        util.showResult(error);
                })
        },

    	/**
    	 * End Session / Log out
		 *
		 * @return Redirect to login page
		 */
    	logout: function() {
    		var vm = this;
    		util.notify('Logging out', 'loading');
    		axios.get(this.baseURL+'api/v1/logout')
    			.then( function(response) {
    				location.href = vm.baseURL+"admin/login";
    			})
    			.catch( function(error) {
    				util.log(error);
    				util.notify('An error occured', 'error');
    			});
    	},

    	/**
    	 * Unescape HTML
    	 * @param "String" html
    	 * @return "String" unescaped html
    	 */
    	minify: function(html) {
    		return util.minify(util.unescapeHTML(html), 15);
    	}
    },

    computed: {
        admin: function() {
            return data.admin;
        },

        categories: function() {
            return data.categories;
        }
    }
});
