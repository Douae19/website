"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_index_order-details_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/index/order-details.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/index/order-details.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      order_item: []
    };
  },
  created: function created() {
    if (!this.$route.query.id) {
      this.$router.push("/order");
      return;
    }
    this.refreshOrder();
  },
  methods: {
    refreshOrder: function refreshOrder() {
      var id = this.$route.query.id;
      var vm = this;
      util.notify("Récupération des informations, veuillez patienter", "loading");
      axios.get(data.getBaseURL() + "api/v1/user/order/" + id).then(function (response) {
        $.notifyClose();
        response = util.getResponse(response);
        vm.order_item = response;
      })["catch"](function (error) {
        util.notify("Erreur", error);
      });
    },
    cancel: function cancel() {
      util.hideModal("#cancelModal");
      var id = this.$route.query.id;
      var vm = this;
      util.notify("Annulation de votre commande, veuillez patienter", "loading");
      axios.get(data.getBaseURL() + "api/v1/user/order/cancel/" + id).then(function (response) {
        response = util.getResponse(response);
        if (response.status) {
          if (response.status == "success") {
            util.notify("Votre commande a été annulée", "success");
            vm.$router.push("/order");
          } else util.notify("Erreur", "error");
        } else util.notify("Erreur", "error");
      })["catch"](function (error) {
        util.notify("Erreur", "error");
      });
    },
    toCurrency: function toCurrency(x) {
      return util.toCurrency(x);
    }
  },
  computed: {
    totalItem: function totalItem() {
      if (data.getStatus().LOG != "IN") this.$router.push("/");
      var orders = this.order_item;
      var totalItem = 0;
      for (var i in orders) if (i != "order") totalItem += orders[i].order_item_quantity;
      return totalItem;
    },
    totalPrice: function totalPrice() {
      var orders = this.order_item;
      var totalPrice = 0;
      for (var i in orders) if (i != "order") totalPrice += orders[i].order_item_quantity * orders[i].product.product_price;
      return totalPrice;
    },
    _new: function _new() {
      var _new = false;
      if (this.order_item.order) _new = this.order_item.order.order_status == "new" ? true : false;
      return _new;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/index/order-details.vue?vue&type=template&id=5fe8774b&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/index/order-details.vue?vue&type=template&id=5fe8774b& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "container"
  }, [_c("div", {
    staticClass: "col-md-9"
  }, [_c("div", {
    staticClass: "panel panel-default"
  }, [_c("div", {
    staticClass: "panel-body"
  }, [_c("router-link", {
    staticClass: "btn btn-default",
    attrs: {
      to: "/order"
    }
  }, [_vm._v("\n                    < Retour")]), _vm._v(" "), _vm._new ? _c("button", {
    staticClass: "btn btn-danger",
    attrs: {
      onclick: "util.showModal('#cancelModal')"
    }
  }, [_vm._v("\n                    Cancel Order\n                ")]) : _vm._e(), _vm._v(" "), _c("h2", [_vm._v("Détails de la Commande")]), _vm._v(" "), _c("h6", [_vm._v("Vous avez " + _vm._s(_vm.totalItem) + " article(s).")]), _vm._v(" "), _c("div", {
    staticClass: "table-responsive"
  }, [_c("table", {
    staticClass: "table table-hover"
  }, [_c("tbody", [_vm._l(_vm.order_item, function (order, index) {
    return index != "order" ? _c("tr", [_c("td", [_c("h5", [_vm._v("\n                                        " + _vm._s(order.order_item_quantity) + " x\n                                        " + _vm._s(order.product.product_name) + "\n                                    ")])]), _vm._v(" "), _c("td", [_c("h5", {
      staticClass: "pull-right"
    }, [_vm._v("\n                                        " + _vm._s(_vm.toCurrency(order.order_item_quantity * order.product.product_price)) + "\n                                    ")])])]) : _vm._e();
  }), _vm._v(" "), _c("tr", [_vm._m(0), _vm._v(" "), _c("td", [_c("h5", {
    staticClass: "pull-right"
  }, [_c("b", [_vm._v(_vm._s(_vm.toCurrency(_vm.totalPrice)))])])])])], 2)])])], 1)])]), _vm._v(" "), _c("modal", {
    attrs: {
      id: "cancelModal"
    }
  }, [_c("modal-header", [_vm._v("Annuler Commande")]), _vm._v(" "), _c("modal-body", [_c("h1", [_vm._v("\n                Est-ce que vous êtes sûr(e) de bien vouloir annuler votre\n                commande?\n            ")])]), _vm._v(" "), _c("modal-footer", [_c("button", {
    staticClass: "btn btn-danger",
    on: {
      click: _vm.cancel
    }
  }, [_vm._v("\n                Annuler Commande\n            ")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-default",
    attrs: {
      onclick: "util.hideModal('#cancelModal')"
    }
  }, [_vm._v("\n                Retour\n            ")])])], 1)], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("td", [_c("h5", [_c("b", [_vm._v("Total")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/index/order-details.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/index/order-details.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _order_details_vue_vue_type_template_id_5fe8774b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order-details.vue?vue&type=template&id=5fe8774b& */ "./resources/js/components/index/order-details.vue?vue&type=template&id=5fe8774b&");
/* harmony import */ var _order_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order-details.vue?vue&type=script&lang=js& */ "./resources/js/components/index/order-details.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _order_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _order_details_vue_vue_type_template_id_5fe8774b___WEBPACK_IMPORTED_MODULE_0__.render,
  _order_details_vue_vue_type_template_id_5fe8774b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/index/order-details.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/index/order-details.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/index/order-details.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./order-details.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/index/order-details.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/index/order-details.vue?vue&type=template&id=5fe8774b&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/index/order-details.vue?vue&type=template&id=5fe8774b& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_template_id_5fe8774b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_template_id_5fe8774b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_template_id_5fe8774b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./order-details.vue?vue&type=template&id=5fe8774b& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/index/order-details.vue?vue&type=template&id=5fe8774b&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);