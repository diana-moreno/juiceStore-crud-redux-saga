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
import axiosClient from '../config/axios'
import Swal from 'sweetalert2'
import store from '../store'

// payload: el que modifica el state
// dispatch: es el que manda ejecutar las acciones

// download products actions

const downloadProducts = () => ({
  type: BEGIN_PRODUCTS_DOWNLOAD,
  payload: true
})

const downloadProductsOk = products => ({
  type: PRODUCTS_DOWNLOAD_OK,
  payload: products
})

const downloadProductsError = () => ({
  type: PRODUCTS_DOWNLOAD_ERROR,
  payload: true
})

export const downloadProductsAction = () => store.dispatch(downloadProducts())

export const downloadProductsOkAction = products => store.dispatch(downloadProductsOk(products))

export const downloadProductsErrorAction = () => store.dispatch(downloadProductsError())


// Create new products

const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: true,
  product: product
})

const addProductOk = product => ({
  type: ADD_PRODUCT_OK,
  payload: product
})

const addProductError = state => ({
  type: ADD_PRODUCT_ERROR,
  payload: state
})

export const addProductAction = product => store.dispatch(addProduct(product))

export const addProductOkAction = product => store.dispatch(addProductOk(product))

export const addProductErrorAction = state => store.dispatch(addProductError(state))
// dispatch debería ir fuera, no en las acciones!!!


// selecciona y elimina el producto
const retrieveProductDelete = id => ({
  type: RETRIEVE_PRODUCT_DELETE,
  payload: id
})

const deleteProductOk = () => ({
  type: PRODUCT_DELETED_OK
})

const deleteProductError = () => ({
  type: PRODUCT_DELETED_ERROR,
  payload: true
})

export const deleteProductAction = id => store.dispatch(retrieveProductDelete(id))

export const deleteProductOkAction = () => store.dispatch(deleteProductOk())

export const deleteProductErrorAction = () => store.dispatch(deleteProductError())



// editar producto
const retrieveProductAction = product => ({
  type: RETRIEVE_PRODUCT_EDIT,
  payload: product
})

export function retrieveProductEdit(product) {
  return (dispatch) => {
    dispatch(retrieveProductAction(product))
  }
}


// editar

const editProduct = () => ({
  type: BEGIN_EDIT_PRODUCT
})

const editProductOk = product => ({
  type: PRODUCT_EDITED_OK,
  payload: product
})

const editProductError = () => ({
  type: PRODUCT_EDITED_ERROR,
  payload: true
})

export function editProductAction(product) {
  return async (dispatch) => {
    dispatch( editProduct(product))
    try {
      await axiosClient.put(`/products/${product.id}`, product)
      dispatch(editProductOk(product))
    } catch (error) {
      dispatch(editProductError())
    }
  }
}
