import { Link } from 'react-router-dom'
import React from 'react'

const Logo = () => {
  return (
    <Link to="/">
        <img src="./src/assets/ExpenseLogo.png" alt="Expense Logo" 
        className='w-16'/>
    </Link>
  )
}

export default Logo
