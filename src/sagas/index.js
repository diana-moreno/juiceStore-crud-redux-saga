import { put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import {
  ADD_PRODUCT,
  ADD_PRODUCT_OK,
  ADD_PRODUCT_ERROR,
  BEGIN_PRODUCTS_DOWNLOAD,
/*  PRODUCTS_DOWNLOAD_OK,
  PRODUCTS_DOWNLOAD_ERROR,*/
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

import {
  downloadProductsOkAction,
  downloadProductsErrorAction
} from '../actions/productsActions'


// función que descarga los productos de la base de datos

function* retrieveProducts() {
  try {
    // como se hace la llamada con call saga effect ???
    const response = yield axiosClient.get('/products')
    yield put(downloadProductsOkAction(response.data))
    return response.data
  } catch (error) {
    yield put(downloadProductsErrorAction())
  }
}

function* retrieveProductsSaga() {
  yield takeLatest(BEGIN_PRODUCTS_DOWNLOAD, retrieveProducts)
}

// params id, product???
export default function* rootSaga(id, product) {
  yield all([
/*    editProductAction(),
    retrieveProductEdit(),
    deleteProductAction(id),
    createNewProductAction(product)*/
/*    retrieveProductsAction(),*/
    retrieveProductsSaga(),
  ])
}