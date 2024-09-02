import axios from "axios";
import { server } from "../../server";

export const createProduct =
  (
    name,
    description,
    category,
    subCategory,
    sleeveType,
    neckType,
    brand,
    footwearSubCategories,
    accessorySubCategories,
    shoeOccasions,
    color,
    fabric,
    pattern,
    occasion,
    ratings,
    fit,
    listing,
    startDate,
    endDate,
    gender,
    tags,
    ShopPrice,
    originalPrice,
    discountPrice,
    adminCreated,
    stock,
    eventDescription,
    eventType,
    size,
    quantity,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });
      // Create an object with the data you want to send
      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        tags,
        ShopPrice,
        originalPrice,
        discountPrice,
        footwearSubCategories,
        accessorySubCategories,
        shoeOccasions,
        stock,
        size,
        quantity,
        category,
        subCategory,
        neckType,
        sleeveType,
        brand,
        color,
        eventDescription,
        eventType,
        adminCreated,
        fabric,
        ratings,
        pattern,
        occasion,
        fit,
        listing,
        startDate,
        endDate,
        gender,
        shopId,
        images,
        // {
        //   withCredentials: true
        // }
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message
      });
    }
  };

// get All Products of a shop
export const getAllProductsShop = (id, page = 1, sortBy = '',categories='',gender = '') => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest"
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}?categories=${categories}&sortBy=${sortBy}&page=${page}&gender=${gender}`
    );
    
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: {
        products: data.products,
        product: data.product,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalPage: data.totalPage,
      }
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message
    });
  }
};


// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest"
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message
    });
  }
};

// get all products

export const getAllProducts = (queryParams) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest"
    });

    const queryString = new URLSearchParams(queryParams).toString();
    const { data } = await axios.get(`${server}/product/get-all-products?${queryString}`);
    
    console.log("API Response:", data.pro); // For debugging purposes

    dispatch({
      type: "getAllProductsSuccess",
      payload: {
        products: data.pro,
        pro: data.products,
        totalPages: data.totalPages, // Assuming totalPages is returned from the API
        currentPage: data.currentPage || 1 // Set currentPage from queryParams or default to 1
      }
    });
  } catch (error) {
  //   dispatch({
  //     type: "getAllProductsSuccess",
  //     payload: data.products
  //   });
  // } catch (error) {
    console.log("API Error:", error); // For debugging purposes

    dispatch({
      type: "getAllProductsFailed",
      payload: error.response?.data?.message || error.message
    });
  }
};


export const updateProductStock = (productId, size, quantity) => async (dispatch) => {
  try {
    dispatch({ type: 'updateProductStockRequest' });

    const response = await axios.patch(
      `${server}/product/seller-update-stock/${productId}`,
      { size, quantity },
      { withCredentials: true }
    );

    // Ensure that the response has the correct structure
    if (response.data) {
      dispatch({
        type: 'updateProductStockSuccess',
        payload: response.data.product
      });
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    // Handle API error gracefully
    dispatch({
      type: 'updateProductStockFailed',
      payload: error.response ? error.response.data.message : error.message
    });
  }
};


  // export const updateProductQuantity = (productId, size) => async (dispatch) => {
  //   try {
  //     // Assuming you have an API endpoint to update the quantity
  //     const response = await axios.put(`/api/products/updateQuantity`, { productId, size });
  
  //     dispatch({
  //       type: 'UPDATE_PRODUCT_QUANTITY_SUCCESS',
  //       payload: response.data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: 'UPDATE_PRODUCT_QUANTITY_FAIL',
  //       payload: error.response.data.message,
  //     });
  //   }
  // };
  