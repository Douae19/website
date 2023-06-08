(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_index_js"],{

/***/ "./resources/js/index.js":
/*!*******************************!*\
  !*** ./resources/js/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var home = function home() {
  return __webpack_require__.e(/*! import() */ "resources_js_components_index_home_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/index/home.vue */ "./resources/js/components/index/home.vue"));
};
var product = function product() {
  return __webpack_require__.e(/*! import() */ "resources_js_components_index_product_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/index/product.vue */ "./resources/js/components/index/product.vue"));
};
var cart = function cart() {
  return __webpack_require__.e(/*! import() */ "resources_js_components_index_cart_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/index/cart.vue */ "./resources/js/components/index/cart.vue"));
};
var checkout = function checkout() {
  return __webpack_require__.e(/*! import() */ "resources_js_components_index_check-out_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/index/check-out.vue */ "./resources/js/components/index/check-out.vue"));
};
var order = function order() {
  return __webpack_require__.e(/*! import() */ "resources_js_components_index_order_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/index/order.vue */ "./resources/js/components/index/order.vue"));
};
var order_details = function order_details() {
  return __webpack_require__.e(/*! import() */ "resources_js_components_index_order-details_vue").then(__webpack_require__.bind(__webpack_require__, /*! ./components/index/order-details.vue */ "./resources/js/components/index/order-details.vue"));
};
__webpack_require__.e(/*! import() */ "resources_js_components_js").then(__webpack_require__.t.bind(__webpack_require__, /*! ./components.js */ "./resources/js/components.js", 23));
var redir = {
  template: '<div>{{$router.push(`/category/${$route.params.category_id}/subcategory/0`)}}</div>'
};
var routes = [{
  path: '/',
  component: home
}, {
  path: '/category/:category_id',
  component: redir
}, {
  path: '/check-out',
  component: checkout
}, {
  path: '/cart',
  component: cart
}, {
  path: '/order',
  component: order
}, {
  path: '/order-details',
  component: order_details
}, {
  path: '/category/:category_id/subcategory/:subcategory_id',
  component: product
}];
var router = new VueRouter({
  routes: routes
});
var app = new Vue({
  router: router,
  data: {
    baseURL: data.getBaseURL(),
    storageURL: data.getStorageURL()
  },
  created: function created() {
    this.refreshCategories();
  },
  methods: {
    refreshCategories: function refreshCategories() {
      var vm = this;
      util.notify('Loading please wait...', 'loading');
      axios.get(this.baseURL + 'api/v1/user/category').then(function (response) {
        $.notifyClose();
        data.setCategories(util.getResponse(response));
      })["catch"](function (error) {
        util.showResult(error);
      });
    },
    logout: function logout() {
      util.notify('Logging out', 'loading');
      axios.get(this.baseURL + 'api/v1/user/customer/logout').then(function (response) {
        response = util.getResponse(response);
        if (response.status == 'success') util.notify('Logout successfully', 'success');else util.notify('An error occured', 'error');
      })["catch"](function (response) {
        util.notify('An error occured', 'error');
      });
    }
  },
  computed: {
    categories: function categories() {
      return data.getCategories();
    },
    status: function status() {
      return data.getStatus();
    },
    cart_quantity: function cart_quantity() {
      var quantity = 0;
      var carts = data.getStatus().CARTS;
      for (var i in carts) quantity += carts[i].cart_quantity;
      return quantity;
    }
  }
}).$mount('#index_app');

/***/ })

}]);