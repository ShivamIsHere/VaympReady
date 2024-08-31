import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  allProduct: [],
  allPro: [],

  isLoading: false,
  error: null,
  totalPages: 0,
  totalPage: 0,
  currentPage: 1,
  products: [],
  product: [],
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload.products;
    state.product = action.payload.product;
    state.currentPage= action.payload.currentPage;
    state.totalPages= action.payload.totalPages;
    state.totalPage = action.payload.totalPage;

  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  getAllProductsRequest: (state) => {
    state.isLoading = true;
    state.error = null; // Clear previous errors
  },
  getAllProductsSuccess: (state, action) => {
    console.log("Action Payload:", action.payload.products); // Ensure this logs pro data
    state.isLoading = false;
    state.allProducts = action.payload.products;
    state.allPro = action.payload.pro;
    state.allProduct = action.payload.pro;
    state.totalPages = action.payload.totalPages;
    state.currentPage = action.payload.currentPage;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },

  updateProductStockRequest: (state) => {
    state.isLoading = true;
  },
  updateProductStockSuccess: (state, action) => {
    state.isLoading = false;
    const updatedProduct = action.payload;
    const updatedProducts = state.products.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    );
    state.products = updatedProducts;
  },
  updateProductStockFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
});
