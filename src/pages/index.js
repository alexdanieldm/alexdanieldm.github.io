import * as React from "react"
import Layout from "../components/layout.js"

import Header from "./partials/header"
import Technologies from "./partials/tech"

const IndexPage = () => {
  return (
    <Layout>
      
      <Header/>

      <Technologies/>

      <section className="quote">
        <div className="content">
          <blockquote>
            To give real service you must add something which cannot be bought or measured with money, and that is sincerity and integrity.
          </blockquote>
        </div>
      </section>

    </Layout>
  )
}

export default IndexPage
