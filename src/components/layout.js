import React from "react"

import Navigation from "./navigation"
import Footer from "./footer"

const Layout = ({ children }) => (
  <div>
    
    <Navigation/>

    <main>
        {children}
    </main>

    <Footer/>

  </div>
)

export default Layout