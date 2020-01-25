import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
// Redux
import { useDispatch } from 'react-redux'
import { deleteProductAction, retrieveProductEdit } from '../../actions/productsActions'

const Product = (product) => {
  const { name, price, id } = product

  const dispatch = useDispatch()
  const history = useHistory()

  const confirmDeleteProduct = id => {
    // preguntar al usuario
    Swal.fire({
      title: 'Are you sure you want to delete the product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.value) {
        // pasarlo al action
        dispatch(deleteProductAction(id))
        console.log(id)
      }
    })
  }

  // función que redirige de forma programada, es mejor que Link
  const redirectionEdition = product => {
    dispatch(retrieveProductEdit(product))
    history.push(`products/edit/${id}`)
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
      <td>{id}</td>
      <td>
        <button
          type='button'
          onClick={() => redirectionEdition(product)}
        >Edit</button>
        <button
          type='button'
          onClick={() => confirmDeleteProduct(id)}
        >Delete</button>
      </td>
    </tr>
  )
}

export default Product
