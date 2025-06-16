import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Admin_home() {
  return (
    <>
      <h3>Welcome to Admin Home</h3>

      <NavLink to = "/addProd">Add Product</NavLink>
      <NavLink to = "/showProducts">View all Products</NavLink>
    </>
  )
}