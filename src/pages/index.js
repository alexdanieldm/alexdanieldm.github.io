import * as React from "react"

//* Import Gatsby-recommended components
import Layout from "../components/layout"
import SEO from "../components/seo"

//* Import components
import Header from "./header"
import About from "./about"
import Tech from "./tech"
import Projects from "./projects"
import Contact from "./contact"

//* Import stylesheet
import "./index.scss"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Header/>

    <About/>
    
    <Tech/>

    <Projects/>
    
    <section className="quote">
        <div className="content">
          <blockquote>
            To give real service you must add something which cannot be bought or measured with money, and that is sincerity and integrity.
          </blockquote>
        </div>
      </section>

      <Contact/>
  </Layout>
)

export default IndexPage
