import React from "react"
import Navigation from "./navigation"

const Layout = ({ children }) => (
  <div>
    <Navigation/>

    <header>
      <h1>header</h1>
    </header>

    <main>
        {children}
    </main>

    <footer>
      <p>A fun footer</p>
    </footer>
  </div>
)

export default Layout