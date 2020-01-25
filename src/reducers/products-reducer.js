import {
  ADD_PRODUCT,
  ADD_PRODUCT_OK,
  ADD_PRODUCT_ERROR,
  BEGIN_PRODUCTS_DOWNLOAD,
  PRODUCTS_DOWNLOAD_OK,
  PRODUCTS_DOWNLOAD_ERROR,
  RETRIEVE_PRODUCT_DELETE,
  PRODUCT_DELETED_OK,
  PRODUCT_DELETED_ERROR,
  RETRIEVE_PRODUCT_EDIT,
  BEGIN_EDIT_PRODUCT,
  PRODUCT_EDITED_OK,
  PRODUCT_EDITED_ERROR
} from '../types'

const initialState = {
  products: [],
  error: false,
  loading: false,
  deleteProduct: null
}

export default function(state = initialState, action) {
  switch(action.type) {

    case BEGIN_PRODUCTS_DOWNLOAD:
    case ADD_PRODUCT:
    case BEGIN_EDIT_PRODUCT:
      return {
        ...state,
        loading: action.payload,
        product: action.product
      }

    case ADD_PRODUCT_OK:
      return {
        ...state,
        loading: false
      }

    case ADD_PRODUCT_ERROR:
    case PRODUCTS_DOWNLOAD_ERROR:
    case PRODUCT_DELETED_ERROR:
    case PRODUCT_EDITED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case PRODUCTS_DOWNLOAD_OK:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload
      }

    case RETRIEVE_PRODUCT_DELETE:
      return {
        ...state,
        deleteProduct: action.payload
      }

    case PRODUCT_DELETED_OK:
      return {
        ...state,
        products: state.products.filter(product => product.id !== state.deleteProduct),
        deleteProduct: null
      }

    case RETRIEVE_PRODUCT_EDIT:
      return {
        ...state,
        editProduct: action.payload
      }

    case PRODUCT_EDITED_OK:
      return {
        ...state,
        editProduct: null,
        products: state.products.map(product =>
          product.id === action.payload.id ? product = action.payload : product
        )
      }

    default:
      return state
  }
}