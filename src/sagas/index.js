import { put, takeEvery, all, call } from 'redux-saga/effects'
import axiosClient from '../config/axios'
import Swal from 'sweetalert2'
import {
  ADD_PRODUCT,
  BEGIN_PRODUCTS_DOWNLOAD,
  RETRIEVE_PRODUCT_DELETE,
  BEGIN_EDIT_PRODUCT,
} from '../types'

/*import store from '../store'*/

import {
  downloadProductsOkAction,
  downloadProductsErrorAction,
  addProductOkAction,
  addProductErrorAction,
  deleteProductOkAction,
  deleteProductErrorAction,
  editProductOkAction,
  editProductErrorAction
} from '../actions/products-actions'


// retrieve products
// API call
async function retrieveProductsDB() {
  return await axiosClient.get('/products')
}

// worker saga
function* retrieveProducts() {
  try {
    const {data} = yield call(retrieveProductsDB)
    yield downloadProductsOkAction(data)
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
    yield call(addProductDB, product)
   /* const response = await axiosClient.post('/products', product)*/
    yield addProductOkAction(product) // descarga los productos actualizados
    // Alert
    Swal.fire(
      'Correct',
      'The product has been added successfully',
      'success'
    )
  } catch (error) {
    yield addProductErrorAction(true)
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
    yield deleteProductOkAction()
    Swal.fire(
      'Deleted!',
      'The product has been deleted.',
      'success'
    )
  } catch (error) {
    yield deleteProductErrorAction()
  }
}

// watcher saga
function* deleteProductSaga() {
  yield takeEvery(RETRIEVE_PRODUCT_DELETE, deleteProduct)
}


// Edit product
// API call
async function editProductDB(product) {
  return await axiosClient.put(`/products/${product.id}`, product)
}

// worker saga
function* editProduct(action) {
  const product = action.product
  try {
    yield call(editProductDB, product)
    yield editProductOkAction(product)
  } catch (error) {
    yield editProductErrorAction()
  }
}

// watcher saga
function* editProductSaga() {
  yield takeEvery(BEGIN_EDIT_PRODUCT, editProduct)
}

// export all sagas
export default function* rootSaga() {
  yield all([
    retrieveProductsSaga(),
    addProductSaga(),
    deleteProductSaga(),
    editProductSaga()
  ])
}

// separate API calls in other folders