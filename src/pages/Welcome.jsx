import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Welcome() {
  return (
    <>
        <h3>Welcome to sales-Savvy</h3>

        <NavLink to = "/sign_up">SIGN UP</NavLink>
        <br></br>
        <NavLink to = "/sign_in">SIGN IN</NavLink>
    </>
  )
}
