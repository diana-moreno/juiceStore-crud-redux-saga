import axiosClient from '../config/axios'

export async function retrieveProductsDB() {
  return await axiosClient.get('/products')
}

export async function addProductDB(product) {
  return await axiosClient.post('/products', product)
}

export async function deleteProductDB(id) {
  return await axiosClient.delete(`/products/${id}`)
}

export async function editProductDB(product) {
  return await axiosClient.put(`/products/${product.id}`, product)
}
