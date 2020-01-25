import { put, takeEvery, all, takeLatest, call, take } from 'redux-saga/effects'
import {
  ADD_PRODUCT,
  BEGIN_PRODUCTS_DOWNLOAD,
  RETRIEVE_PRODUCT_DELETE,
  RETRIEVE_PRODUCT_EDIT,

  BEGIN_EDIT_PRODUCT,
  PRODUCT_EDITED_OK,
  PRODUCT_EDITED_ERROR
} from '../types'
import axiosClient from '../config/axios'
import Swal from 'sweetalert2'

import store from '../store'

import {
  downloadProductsOkAction,
  downloadProductsErrorAction,
  addProductOkAction,
  addProductErrorAction,
  deleteProductOkAction,
  deleteProductErrorAction
} from '../actions/productsActions'


// retrieve products
// API call
async function retrieveProductsDB() {
  return await axiosClient.get('/products')
}

// worker saga
function* retrieveProducts() {
  try {
    const response = yield call(retrieveProductsDB)
    yield put(downloadProductsOkAction(response.data))
    return response.data
  } catch (error) {
    yield put(downloadProductsErrorAction())
  }
}

// watcher saga
function* retrieveProductsSaga() {
  yield takeEvery(BEGIN_PRODUCTS_DOWNLOAD, retrieveProducts)
}


// create new product
// API call
async function addProductDB(product) {
  return await axiosClient.post('/products', product)
}

// worker saga
function* addProduct(action) {
  const product = action.product
  try {
    const response = yield call(addProductDB, product)
   /* const response = await axiosClient.post('/products', product)*/
/*    yield put(addProductOkAction(product))*/
    addProductOkAction(product)
    // Alert
    Swal.fire(
      'Correct',
      'The product has been added successfully',
      'success'
    )
  } catch (error) {
    yield put(addProductErrorAction(true))
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error ocurred. Please, try it again.'
    })
  }
}

// watcher saga
function* addProductSaga() {
  yield takeEvery(ADD_PRODUCT, addProduct)
}


// delete product
// API call
async function deleteProductDB(id) {
  return await axiosClient.delete(`/products/${id}`)
}

// worker saga
function* deleteProduct(action) {
  const id = action.payload
  try {
    yield call(deleteProductDB, id)
    deleteProductOkAction()
    Swal.fire(
      'Deleted!',
      'The product has been deleted.',
      'success'
    )
  } catch (error) {
    deleteProductErrorAction()
  }
}

// watcher saga
function* deleteProductSaga() {
  yield takeEvery(RETRIEVE_PRODUCT_DELETE, deleteProduct)
}


export default function* rootSaga() {
  yield all([
    retrieveProductsSaga(),
    addProductSaga(),
    deleteProductSaga()
  ])
}
