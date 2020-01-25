import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav>
      <div>
        <h1>Juice store</h1>
      </div>
      <Link to={'/products/new'}>Add product</Link>
    </nav>
  )
}

export default Header