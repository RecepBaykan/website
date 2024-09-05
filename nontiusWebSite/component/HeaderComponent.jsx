import React from 'react'
import "../component/HeaderComponent.css"

function HeaderComponent() {
  return (
    <div className="header">
        <a href="#default" class="logo">CompanyLogo</a>
        <div className="header-right">
          <a className="active" href="#home">Home</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
    </div>
  )
}

export default HeaderComponent