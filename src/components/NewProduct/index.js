import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// use Dispatch sirve para mandar ejecutar las acciones que tengamos en las actions y useSelector es la forma en la que vamos a acceder al state dentro del componente. Usedispatch devuelve una función
import { addProductAction } from '../../actions/productsActions'
import { showAlert, hideAlertAction } from '../../actions/alertActions'

const Newproduct = ({ history }) => {
  // state del commponente
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  // acceder al state del store
  const loading = useSelector(state => state.products.loading) // será true o false
  const error = useSelector(state => state.products.error) // true o false
  const alert = useSelector(state => state.alert.alert)


  const submitNewProduct = async event => {
    event.preventDefault()
    // validar formulario
    if(name.trim() === '' || price <= 0) {
      const alert = {
        msg: 'All fields are required.'
      }
      showAlert(alert)
      return
    }
    // si no hay errores
    hideAlertAction()
    // crear nuevo producto
    await addProductAction({ name, price })
    // redireccionar al componente principal
    history.push('/')
  }

  return (
    <div>
      <h1>Add new product</h1>
      { alert ? <p>{alert.msg}</p> : null }
      <form onSubmit={submitNewProduct} >
        <section>
          <label>Product name</label>
          <input
            type='text'
            placeholder='Product name'
            name='name'
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </section>
        <section>
          <label>Product price</label>
          <input
            type='number'
            name='price'
            min='0'
            value={price}
            onChange={event => setPrice(Number(event.target.value))}
          />
        </section>
        <button >Add new</button>
      </form>
      { loading ? <p>Loading...</p> : null }
      { error ? <p>Ups! An error ocurred.</p> : null }
    </div>
  )
}

export default Newproduct