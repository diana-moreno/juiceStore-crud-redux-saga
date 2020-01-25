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


// download products actions

const downloadProducts = () => ({
  type: BEGIN_PRODUCTS_DOWNLOAD,
  payload: true
})

export const downloadProductsAction = () => store.dispatch(downloadProducts())

const downloadProductsOk = products => ({
  type: PRODUCTS_DOWNLOAD_OK,
  payload: products
})

export const downloadProductsOkAction = (products) => store.dispatch(downloadProductsOk(products))

const downloadProductsError = () => ({
  type: PRODUCTS_DOWNLOAD_ERROR,
  payload: true
})

export const downloadProductsErrorAction = () => store.dispatch(downloadProductsError())


// Crear nuevos productos

// cuando se declara una función aquí, también hay que declararlo en los reducers.
const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true
})

const addProductOk = product => ({ // lo que hay entre paréntesis es el action
  type: ADD_PRODUCT_OK,
  payload: product
})

const addProductError = state => ({
  type: ADD_PRODUCT_ERROR,
  payload: state
})
// esta es la función que se tiene que utilizar en el componente, así los datos del componente se pueden pasar a las acciones y después se ejecutan con dispatch.
//
// payload: el que modifica el state
// dispatch: es el que manda ejecutar las acciones

export function createNewProductAction(product) {
  return async (dispatch) => {
    // mandar a base de datos o ejecutar el reducer
    console.log(product)
    dispatch(addProduct())
    try {
      // insertar en la API
      let response = await axiosClient.post('/products', product)

      //return response.data // sin este return, no se crean bien!!!!

      // si todo sale bien, modificar estado
      dispatch(addProductOk(product))
      // Alerta
      Swal.fire(
        'Correct',
        'The product has been added successfully',
        'success'
      )
    } catch (error) {
      console.log(error)
      dispatch(addProductError(true))
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error ocurred. Please, try it again.'
      })
    }
  }
}


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

export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(retrieveProductDelete(id))
    try {
      await axiosClient.delete(`/products/${id}`)
      dispatch(deleteProductOk())
      // Alerta si lo elimina
      Swal.fire(
        'Deleted!',
        'The product has been deleted.',
        'success'
      )
    } catch(error) {
      dispatch(deleteProductError())
    }
  }
}


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
