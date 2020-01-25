import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { deleteProductAction, retrieveProductEditAction } from '../../actions/products-actions'

const Product = (product) => {
  const history = useHistory()
  const { name, price, id } = product

  const confirmDeleteProduct = id => {
    // ask the user for confirmation
    Swal.fire({
      title: 'Are you sure you want to delete the product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      result.value && deleteProductAction(id)
    })
  }

  // function that redirects automátically, is better than 'Link'
  const redirectionEdition = product => {
    retrieveProductEditAction(product)
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
