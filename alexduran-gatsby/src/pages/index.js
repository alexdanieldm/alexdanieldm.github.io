import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Tech from "./tech"
import Header from "./header"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Header/>

    <Tech/>

    <section className="quote">
        <div className="content">
          <blockquote>
            To give real service you must add something which cannot be bought or measured with money, and that is sincerity and integrity.
          </blockquote>
        </div>
      </section>
  </Layout>
)

export default IndexPage
