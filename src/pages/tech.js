import React from "react"

//* Import assets directly
import react_brands from "../assets/logos/react-brands.svg"
import gatsby_brands from "../assets/logos/gatsby-brands.svg"
import js_brands from "../assets/logos/js-brands.svg"
import node_brands from "../assets/logos/node-js-brands.svg"
import git_brands from "../assets/logos/git-alt-brands.svg"
import html_brands from "../assets/logos/html5-brands.svg"
import css_brands from "../assets/logos/css3-brands.svg"
import sass_brands from "../assets/logos/sass-brands.svg"
import python_brands from "../assets/logos/python-brands.svg"
// import mongodb_brands from "../assets/logos/mongodb-brands.svg"

//* Add array with all the badges data
const allBadges = [
    {key: 'r', value: 'React', img: react_brands},

    {key: 'gt', value: 'Gatsby', img: gatsby_brands},

    {key: 'j', value: 'Javascript', img: js_brands},

    {key: 'n', value: 'NodeJS', img: node_brands},

    {key: 'g', value: 'Git', img: git_brands},

    {key: 'h', value: 'HTML5', img: html_brands},
    
    {key: 'c', value: 'CSS3', img: css_brands},

    {key: 's', value: 'Sass', img: sass_brands},

    {key: 'p', value: 'Python', img: python_brands},

    // {key: 'm', value: 'MongoDB', img: mongodb_brands},
]

//* Create Badges component
const Badges = ({children, img}) => {
    return (
        <div className="logo">
            <img src={img} alt={`${children} logo`}/>
            <p>{children}</p>
        </div>
    )
}


const Technologies = () => {
    return (
        
        <section className="tech">

            <h1>What I like to Use</h1>
            
            <div className="content">

                {allBadges.map(badge => (
                    <Badges key={badge.key} img={badge.img}>
                        {badge.value}
                    </Badges>
                ))}

            </div>
        </section>

    )
}

export default Technologies