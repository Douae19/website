"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_product_edit_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/edit.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/edit.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function (_data) {
    function data() {
      return _data.apply(this, arguments);
    }
    data.toString = function () {
      return _data.toString();
    };
    return data;
  }(function () {
    return {
      baseURL: data.getBaseURL(),
      storageURL: data.getStorageURL(),
      product_id: this.$route.params.product_id,
      submitButton: {
        loading: false,
        message: "Soumettre"
      }
    };
  }),
  created: function created() {
    if (!data.getProduct().id) this.getProduct(this.product_id);
  },
  methods: {
    /**
     * Get product
     * @param {Int} Product id
     *
     */
    getProduct: function getProduct(id) {
      var vm = this;
      util.notify("Récupération des informations", "loading");
      axios.get(this.baseURL + "api/v1/product/" + id).then(function (response) {
        vm.stopLoading();
        data.setProduct(response.data);
      })["catch"](function (response) {
        vm.stopLoading();
        util.showResult(response);
      });
    },
    /**
     * Start Loading
     *
     */
    startLoading: function startLoading() {
      this.submitButton = {
        loading: true,
        message: "Loading..."
      };
    },
    /**
     * Stop Loading
     *
     */
    stopLoading: function stopLoading() {
      $.notifyClose();
      this.submitButton = {
        loading: false,
        message: "Submit"
      };
    },
    /**
     * Back to previous page
     *
     */
    back: function back() {
      this.$router.push("/products/".concat(this.category_id, "/").concat(this.subcategory_id));
    },
    submit: function submit() {
      if (this.submitButton.loading) return;
      var vm = this;
      this.startLoading();
      var notif = util.notify("Mise à jour catégories", "loading");
      $("#productForm").ajaxSubmit({
        success: function success(response, status, xhr, $form) {
          vm.stopLoading();
          if (util.showResult(response, "ajax")) vm.back();
        },
        error: function error(response) {
          vm.stopLoading();
          util.showResult(response, "ajax");
        },
        uploadProgress: function uploadProgress(a, b, c, d) {
          notif.update("message", util.getProgressbarMessage("Mise à jour catégorie", d));
        }
      });
    },
    /**
     * Unescape HTML
     * @param "String" html
     * @return "String" unescaped html
     */
    minify: function minify(html) {
      return util.unescapeHTML(html);
    }
  },
  computed: {
    category_id: function category_id() {
      return this.$route.params.category_id;
    },
    subcategory_id: function subcategory_id() {
      return this.$route.params.subcategory_id;
    },
    subcategories: function subcategories() {
      var subcategories = [];
      for (var i in data.getSubcategories()) {
        if (data.getSubcategories()[i]["category_id"] == this.category_id) subcategories.push(data.getSubcategories()[i]);
      }
      return subcategories;
    },
    product: function product() {
      return data.getProduct();
    },
    product_quantity: {
      get: function get() {
        return data.getProduct().product_quantity ? data.getProduct().product_quantity : 0;
      },
      set: function set(value) {
        if (value < 1) data.getProduct().product_quantity = 0;else data.getProduct().product_quantity = value;
      }
    },
    product_name: {
      get: function get() {
        return this.minify(this.product.product_name);
      },
      set: function set(val) {
        this.product.product_name = val;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/edit.vue?vue&type=template&id=9683a316&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/edit.vue?vue&type=template&id=9683a316& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "panel panel-default col-md-8 col-md-offset-2"
  }, [_c("div", {
    staticClass: "panel-body"
  }, [_c("form", {
    staticClass: "row",
    attrs: {
      action: _vm.baseURL + "api/v1/product/" + _vm.product_id,
      method: "POST",
      id: "productForm",
      enctype: "mutlipart/form-data"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.submit();
      }
    }
  }, [_c("input", {
    attrs: {
      type: "hidden",
      name: "_method",
      value: "PUT"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v("Sélectionner Sous-catégorie")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.product.subcategory_id,
      expression: "product.subcategory_id"
    }],
    staticClass: "form-control",
    attrs: {
      name: "subcategory_id",
      required: ""
    },
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.product, "subcategory_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    attrs: {
      value: "0",
      disabled: ""
    }
  }, [_vm._v("\n                        -- Aucune Sous-catégorie Sélectionnée --\n                    ")]), _vm._v(" "), _vm._l(_vm.subcategories, function (subcategory) {
    return _c("option", {
      domProps: {
        value: subcategory.id
      }
    }, [_vm._v("\n                        " + _vm._s(_vm.minify(subcategory.subcategory_name)) + "\n                    ")]);
  })], 2)]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v("Nom Produit")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.product_name,
      expression: "product_name"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      name: "product_name",
      required: ""
    },
    domProps: {
      value: _vm.product_name
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.product_name = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v("Description")]), _vm._v(" "), _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.product.product_description,
      expression: "product.product_description"
    }],
    staticClass: "form-control",
    attrs: {
      name: "product_description"
    },
    domProps: {
      value: _vm.product.product_description
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.product, "product_description", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v("Prix")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.product.product_price,
      expression: "product.product_price"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      name: "product_price",
      required: ""
    },
    domProps: {
      value: _vm.product.product_price
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.product, "product_price", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v("Quantité")]), _vm._v(" "), _c("div", {
    staticClass: "input-group"
  }, [_c("div", {
    staticClass: "input-group-btn"
  }, [_c("span", {
    staticClass: "btn btn-info",
    on: {
      click: function click($event) {
        _vm.product_quantity--;
      }
    }
  }, [_c("i", {
    staticClass: "fa fa-minus"
  })])]), _vm._v(" "), _c("div", {
    staticClass: "form-control",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.product_quantity,
      expression: "product_quantity"
    }],
    attrs: {
      type: "hidden",
      name: "product_quantity"
    },
    domProps: {
      value: _vm.product_quantity
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.product_quantity = $event.target.value;
      }
    }
  }), _vm._v(" "), _c("b", [_c("span", [_vm._v(_vm._s(_vm.product_quantity))]), _vm._v(" en stock")])]), _vm._v(" "), _c("div", {
    staticClass: "input-group-btn"
  }, [_c("span", {
    staticClass: "btn btn-info",
    on: {
      click: function click($event) {
        _vm.product_quantity++;
      }
    }
  }, [_c("i", {
    staticClass: "fa fa-plus"
  })])])])]), _vm._v(" "), _c("div", {
    staticClass: "pull-right"
  }, [_c("input", {
    staticClass: "btn btn-primary",
    "class": {
      disabled: _vm.submitButton.loading
    },
    attrs: {
      type: "submit"
    },
    domProps: {
      value: _vm.submitButton.message
    }
  }), _vm._v(" "), _c("input", {
    staticClass: "btn btn-default",
    attrs: {
      type: "button",
      value: "Retour"
    },
    on: {
      click: function click($event) {
        return _vm.back();
      }
    }
  })])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "form-group"
  }, [_c("label", [_vm._v("Image Produit")]), _vm._v(" "), _c("input", {
    attrs: {
      type: "file",
      name: "product_image",
      accept: "image/jpeg,image/png"
    }
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/admin/product/edit.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/admin/product/edit.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _edit_vue_vue_type_template_id_9683a316___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit.vue?vue&type=template&id=9683a316& */ "./resources/js/components/admin/product/edit.vue?vue&type=template&id=9683a316&");
/* harmony import */ var _edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/product/edit.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _edit_vue_vue_type_template_id_9683a316___WEBPACK_IMPORTED_MODULE_0__.render,
  _edit_vue_vue_type_template_id_9683a316___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/product/edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/product/edit.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/admin/product/edit.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/edit.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/product/edit.vue?vue&type=template&id=9683a316&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/admin/product/edit.vue?vue&type=template&id=9683a316& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_template_id_9683a316___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_template_id_9683a316___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_template_id_9683a316___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./edit.vue?vue&type=template&id=9683a316& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/edit.vue?vue&type=template&id=9683a316&");


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