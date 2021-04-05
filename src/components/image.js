// import { badge } from "gatsby"
import React from "react"
import PropTypes from "prop-types"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from 'gatsby';
import { query } from "express";

const Images = ({ src, alt, data}) => {
    return (
        <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt={alt}/>
    )
};

// export const query = graphql`
// query ImageQuery ($src: "${src}"}){
//     file(relativePath: {eq: "$src"}) {
//         childImageSharp {
//             gatsbyImageData( placeholder: BLURRED )
//         }
//     }
// }
// `

export default Images;