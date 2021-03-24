import React from "react"
import Navigation from "./navigation"

const Layout = ({ children }) => (
  <div>
    
    <Navigation/>

    <main>
        {children}
    </main>

    <footer>
      <p>A fun footer</p>
    </footer>

  </div>
)

export default Layout