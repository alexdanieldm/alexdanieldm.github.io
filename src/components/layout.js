import React from "react"

const Layout = ({ children }) => (
  <div>
    <nav>
      <li>link</li>
    </nav>

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