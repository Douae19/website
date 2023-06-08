"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_product_index_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/index.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mycomponents_modal_modal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mycomponents/modal/modal.vue */ "./resources/js/components/mycomponents/modal/modal.vue");
/* harmony import */ var _mycomponents_modal_header_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mycomponents/modal/header.vue */ "./resources/js/components/mycomponents/modal/header.vue");
/* harmony import */ var _mycomponents_modal_body_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mycomponents/modal/body.vue */ "./resources/js/components/mycomponents/modal/body.vue");
/* harmony import */ var _mycomponents_modal_footer_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mycomponents/modal/footer.vue */ "./resources/js/components/mycomponents/modal/footer.vue");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    // Enregistrez les composants modal, modal-header, modal-body et modal-footer dans les composants locaux
    Modal: _mycomponents_modal_modal_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    "modal-header": _mycomponents_modal_header_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    "modal-body": _mycomponents_modal_body_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    "modal-footer": _mycomponents_modal_footer_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      err: 3,
      product_id: 0
    };
  },
  created: function created() {
    if (this.subcategories.length < 1) this.refreshSubcategories();else this.refreshProducts();
  },
  methods: {
    /**
     * Delete Product
     * @param {Int} product id
     */
    deleteProduct: function deleteProduct(id) {
      var vm = this;
      util.hideModal("#deleteProductModal");
      util.notify("Suppression produit...", "loading");
      axios["delete"](data.getBaseURL() + "api/v1/product/" + id).then(function (response) {
        $.notifyClose();
        if (util.showResult(response)) vm.refreshProducts();
      })["catch"](function (error) {
        util.showResult(error);
      });
    },
    /**
     * Refresh Product list
     *
     */
    refreshProducts: function refreshProducts() {
      var vm = this;
      var baseURL = data.getBaseURL();
      util.notify("Actualisation Produits", "loading");
      axios.get(baseURL + "api/v1/product?id=" + this.category_id).then(function (response) {
        $.notifyClose();
        vm.err = 3;
        data.setProducts(response.data);
        if (response.data.length < 1) {
          vm.$nextTick(function () {
            $.notifyClose();
            var rows = this.transformData(this.products);
            this.initDatatable(rows);
          });
        }
      })["catch"](function (error) {
        if (vm.err > 0) {
          vm.err--;
          vm.refreshProducts();
        } else {
          util.showResult(error);
        }
      });
    },
    /**
     * Get subcategories
     *
     */
    refreshSubcategories: function refreshSubcategories() {
      var vm = this;
      util.notify("Actualisation Produits", "loading");
      axios.get(data.getBaseURL() + "api/v1/subcategory").then(function (response) {
        $.notifyClose();
        data.setSubcategories(response.data);
        vm.err = 3;
        if (response.data.length < 1) {
          vm.$nextTick(function () {
            $.notifyClose();
            var rows = this.transformData(this.products);
            this.initDatatable(rows);
          });
        } else {
          vm.refreshProducts();
        }
      })["catch"](function (error) {
        if (vm.err > 0) {
          vm.err--;
          vm.refreshSubcategories();
        } else {
          util.showResult(error);
        }
      });
    },
    /**
     * Transform Data to HTML rows
     * @param [{Object}] Products
     * @return [['String']] Html rows
     */
    transformData: function transformData(products) {
      var res = [];
      for (var i in products) {
        var row = [];
        var image = data.getStorageURL() + products[i]["product_image"];
        var id = products[i]["id"];
        row.push('<img src="' + image + '" class="thumbnail" height="50px" width="50px" />');
        row.push(util.minify(products[i]["product_name"], 15));
        row.push(util.minify(products[i]["product_description"], 15));
        row.push(products[i]["product_price"]);
        row.push(products[i]["product_quantity"]);
        row.push('<button class="btn btn-link edit" id="' + id + '">\
						 	<span class="fa fa-edit"></span>\
						  </button>');
        row.push('<button class="btn btn-link delete" id="' + id + '">\
							<span class="fa fa-trash"></span>\
						  </button>');
        res.push(row);
      }
      return res;
    },
    /**
     * Initialize datatable
     * @param [[String]] rows
     *
     */
    initDatatable: function initDatatable(rows) {
      var vm = this;
      $("#productsTable").DataTable({
        destroy: true,
        aaData: rows,
        paging: true,
        ordering: false,
        searching: false,
        info: false,
        autoWidth: false,
        dom: "Bfrtip",
        buttons: [{
          text: '<span class="fa fa-plus"></span> Ajouter Produits',
          action: function action(e, dt, node, config) {
            vm.$router.push("/products/".concat(vm.category_id, "/").concat(vm.subcategory_id, "/add"));
          },
          className: "btn btn-success"
        }, {
          text: '<span class="fa fa-refresh"></span> Actualiser',
          className: "btn btn-primary",
          action: function action(a, b, c, d, e) {
            vm.refreshSubcategories();
          }
        }]
      });
      this.addListener();
    },
    /**
     * Add event listener on Edit and delete button
     *
     */
    addListener: function addListener() {
      var vm = this;

      //refresh listener on next page
      $("#productsTable_next").click(function () {
        vm.addListener();
      });

      //Add listener on Edit Button
      $(".edit").click(function () {
        var id = $(this).attr("id");
        data.setProduct(vm.getProduct(id));
        vm.$router.push("/products/".concat(vm.category_id, "/").concat(vm.subcategory_id, "/edit/").concat(id));
      });

      //Add Listener on Delete Button
      $(".delete").click(function () {
        vm.product_id = $(this).attr("id");
        util.showModal("#deleteProductModal");
      });
    },
    /**
     * Get Product by Id
     * @param {Int} id Product id
     * @return {Object} Product
     */
    getProduct: function getProduct(id) {
      for (var i in this.products) if (this.products[i].id == id) return this.products[i];
      return {};
    },
    /**
     * Minify the Category name to fit to the screen
     * @param String category name
     * @return String Minified Category name
     */
    minify: function minify(string) {
      return util.minify(util.unescapeHTML(string), 20);
    }
  },
  watch: {
    category_id: function category_id(id) {
      this.refreshProducts();
    },
    products: function products(val) {
      var rows = this.transformData(val);
      this.initDatatable(rows);
    }
  },
  computed: {
    subcategory_id: function subcategory_id() {
      return this.$route.params.subcategory_id;
    },
    category_id: function category_id() {
      return this.$route.params.category_id;
    },
    subcategories: function subcategories() {
      var subcategories = data.subcategories;
      var res = [];
      for (var i in subcategories) {
        if (subcategories[i].category_id != this.category_id) continue;
        res.push(subcategories[i]);
      }
      return res;
    },
    subcategory_name: function subcategory_name() {
      if (this.subcategory_id == 0) return "Toutes les Sous-catégories";
      for (var i in this.subcategories) if (this.subcategories[i].id == this.subcategory_id) return this.subcategories[i].subcategory_name;
    },
    products: function products() {
      var products = data.products;
      var res = [];
      for (var i in products) {
        if (this.subcategory_id != 0 && products[i].subcategory_id != this.subcategory_id) continue;
        res.push(products[i]);
      }
      return res;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/modal.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/modal.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['id']
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/index.vue?vue&type=template&id=24bf59f7&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/index.vue?vue&type=template&id=24bf59f7& ***!
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
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-3"
  }, [_c("div", {
    staticClass: "panel-group"
  }, [_c("div", {
    staticClass: "panel panel-default"
  }, [_c("div", {
    staticClass: "panel panel-heading"
  }, [_c("h4", {
    staticClass: "panel-title",
    attrs: {
      "data-toggle": "collapse",
      href: "#collapse1"
    }
  }, [_vm._v("\n                        " + _vm._s(_vm.minify(_vm.subcategory_name)) + "\n                    ")])]), _vm._v(" "), _c("div", {
    staticClass: "panel-collapse collapse",
    attrs: {
      id: "collapse1"
    }
  }, [_c("ul", {
    staticClass: "list-group"
  }, [_c("router-link", {
    staticClass: "list-group-item",
    attrs: {
      type: "li",
      to: {
        params: {
          subcategory_id: 0
        }
      },
      "active-class": "active"
    }
  }, [_vm._v("Toutes les Sous-catégories")]), _vm._v(" "), _vm._l(_vm.subcategories, function (subcategory) {
    return _c("li", {
      staticClass: "list-group-item",
      "class": {
        active: subcategory.id == _vm.subcategory_id
      },
      on: {
        click: function click($event) {
          return _vm.$router.push({
            params: {
              subcategory_id: subcategory.id
            }
          });
        }
      }
    }, [_c("router-link", {
      attrs: {
        tag: "span",
        to: {
          params: {
            subcategory_id: subcategory.id
          }
        }
      }
    }, [_vm._v(_vm._s(_vm.minify(subcategory.subcategory_name)) + "\n                            ")])], 1);
  })], 2)])])])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("modal", {
    attrs: {
      id: "deleteProductModal"
    }
  }, [_c("modal-header", [_vm._v("Supprimer Produit")]), _vm._v(" "), _c("modal-body", [_c("p", [_vm._v("\n                Est-ce que vous êtes sûr(e) de bien vouloir supprimer ce\n                produit?\n            ")]), _vm._v(" "), _c("p", [_c("b", [_vm._v("Avertissement : ")]), _vm._v("Suppression de produit ne peut pas\n                être annulée\n            ")])]), _vm._v(" "), _c("modal-footer", [_c("button", {
    staticClass: "btn btn-danger",
    on: {
      click: function click($event) {
        return _vm.deleteProduct(_vm.product_id);
      }
    }
  }, [_vm._v("\n                Supprimer\n            ")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-default",
    attrs: {
      "data-dismiss": "modal"
    }
  }, [_vm._v("\n                Annuler\n            ")])])], 1)], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "col-md-9"
  }, [_c("div", {
    staticClass: "panel panel-default"
  }, [_c("div", {
    staticClass: "panel-body table-responsive"
  }, [_c("table", {
    staticClass: "table table-hover",
    attrs: {
      id: "productsTable"
    }
  }, [_c("thead", [_c("tr", [_c("th", {
    attrs: {
      width: "50px"
    }
  }), _vm._v(" "), _c("th", [_vm._v("Nom")]), _vm._v(" "), _c("th", [_vm._v("Description")]), _vm._v(" "), _c("th", [_vm._v("Prix")]), _vm._v(" "), _c("th", [_vm._v("Quantité")]), _vm._v(" "), _c("th", [_vm._v("Modifier")]), _vm._v(" "), _c("th", [_vm._v("Supprimer")])])])])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/body.vue?vue&type=template&id=61de5594&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/body.vue?vue&type=template&id=61de5594& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "modal-body"
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/footer.vue?vue&type=template&id=29f3c4a2&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/footer.vue?vue&type=template&id=29f3c4a2& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "modal-footer"
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/header.vue?vue&type=template&id=0c3881a1&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/header.vue?vue&type=template&id=0c3881a1& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "modal-header"
  }, [_c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    }
  }, [_vm._v("×")]), _vm._v(" "), _c("h4", [_vm._t("default")], 2)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/modal.vue?vue&type=template&id=4c4f4449&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/modal.vue?vue&type=template&id=4c4f4449& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "modal fade",
    attrs: {
      id: _vm.id,
      role: "dialog"
    }
  }, [_c("div", {
    staticClass: "modal-dialog"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._t("default")], 2)])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/admin/product/index.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/admin/product/index.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_24bf59f7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=24bf59f7& */ "./resources/js/components/admin/product/index.vue?vue&type=template&id=24bf59f7&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/product/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_24bf59f7___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_24bf59f7___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/product/index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/mycomponents/modal/body.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/mycomponents/modal/body.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _body_vue_vue_type_template_id_61de5594___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body.vue?vue&type=template&id=61de5594& */ "./resources/js/components/mycomponents/modal/body.vue?vue&type=template&id=61de5594&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _body_vue_vue_type_template_id_61de5594___WEBPACK_IMPORTED_MODULE_0__.render,
  _body_vue_vue_type_template_id_61de5594___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/mycomponents/modal/body.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/mycomponents/modal/footer.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/mycomponents/modal/footer.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _footer_vue_vue_type_template_id_29f3c4a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.vue?vue&type=template&id=29f3c4a2& */ "./resources/js/components/mycomponents/modal/footer.vue?vue&type=template&id=29f3c4a2&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _footer_vue_vue_type_template_id_29f3c4a2___WEBPACK_IMPORTED_MODULE_0__.render,
  _footer_vue_vue_type_template_id_29f3c4a2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/mycomponents/modal/footer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/mycomponents/modal/header.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/mycomponents/modal/header.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _header_vue_vue_type_template_id_0c3881a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.vue?vue&type=template&id=0c3881a1& */ "./resources/js/components/mycomponents/modal/header.vue?vue&type=template&id=0c3881a1&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  script,
  _header_vue_vue_type_template_id_0c3881a1___WEBPACK_IMPORTED_MODULE_0__.render,
  _header_vue_vue_type_template_id_0c3881a1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/mycomponents/modal/header.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/mycomponents/modal/modal.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/mycomponents/modal/modal.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_vue_vue_type_template_id_4c4f4449___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.vue?vue&type=template&id=4c4f4449& */ "./resources/js/components/mycomponents/modal/modal.vue?vue&type=template&id=4c4f4449&");
/* harmony import */ var _modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.vue?vue&type=script&lang=js& */ "./resources/js/components/mycomponents/modal/modal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _modal_vue_vue_type_template_id_4c4f4449___WEBPACK_IMPORTED_MODULE_0__.render,
  _modal_vue_vue_type_template_id_4c4f4449___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/mycomponents/modal/modal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/product/index.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/admin/product/index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/index.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/mycomponents/modal/modal.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/mycomponents/modal/modal.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./modal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/modal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/product/index.vue?vue&type=template&id=24bf59f7&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/admin/product/index.vue?vue&type=template&id=24bf59f7& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_24bf59f7___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_24bf59f7___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_24bf59f7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=24bf59f7& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/admin/product/index.vue?vue&type=template&id=24bf59f7&");


/***/ }),

/***/ "./resources/js/components/mycomponents/modal/body.vue?vue&type=template&id=61de5594&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/mycomponents/modal/body.vue?vue&type=template&id=61de5594& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_body_vue_vue_type_template_id_61de5594___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_body_vue_vue_type_template_id_61de5594___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_body_vue_vue_type_template_id_61de5594___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./body.vue?vue&type=template&id=61de5594& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/body.vue?vue&type=template&id=61de5594&");


/***/ }),

/***/ "./resources/js/components/mycomponents/modal/footer.vue?vue&type=template&id=29f3c4a2&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/mycomponents/modal/footer.vue?vue&type=template&id=29f3c4a2& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_29f3c4a2___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_29f3c4a2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_29f3c4a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./footer.vue?vue&type=template&id=29f3c4a2& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/footer.vue?vue&type=template&id=29f3c4a2&");


/***/ }),

/***/ "./resources/js/components/mycomponents/modal/header.vue?vue&type=template&id=0c3881a1&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/mycomponents/modal/header.vue?vue&type=template&id=0c3881a1& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_template_id_0c3881a1___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_template_id_0c3881a1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_template_id_0c3881a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./header.vue?vue&type=template&id=0c3881a1& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/header.vue?vue&type=template&id=0c3881a1&");


/***/ }),

/***/ "./resources/js/components/mycomponents/modal/modal.vue?vue&type=template&id=4c4f4449&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/mycomponents/modal/modal.vue?vue&type=template&id=4c4f4449& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_template_id_4c4f4449___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_template_id_4c4f4449___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_template_id_4c4f4449___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./modal.vue?vue&type=template&id=4c4f4449& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/mycomponents/modal/modal.vue?vue&type=template&id=4c4f4449&");


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