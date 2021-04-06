import React from "react"

//* Import components
import Emoji from "./emoji"

//* Import assets directly
import twitter_icon from "../assets/logos/socials/twitter-brands.svg"
import linkedin_icon from "../assets/logos/socials/linkedin-brands.svg"
import github_icon from "../assets/logos/socials/github-brands.svg"
import mail_icon from "../assets/logos/socials/envelope-solid.svg"

//* Add array with all the link data
const allLinks = [
    {key: 'g', href: 'https://twitter.com/alexdanieldm', img: twitter_icon},

    {key: 't', href: 'https://www.linkedin.com/in/alexdanieldm/', img: linkedin_icon},

    {key: 'l', href: 'https://github.com/alexdanieldm', img: github_icon},

    {key: 'e', href: 'mailto:alexdanieldm@gmail.com', img: mail_icon},
]

//* Create Link component
const Link = ({href, img}) => {
    return (
        <a className="link" href={href}>
            <img src={img} alt={img}/>
        </a>
    )
}

const Footer = () => {

    return (
        
        <footer>
            <p>
                Made with <Emoji symbol="❤️" label="heart"/> & <Emoji symbol="☕" label="coffee"/> by Alex Duran &copy; {new Date().getFullYear()}
            </p>

            <ul>
            {allLinks.map(link => (
                <li>
                    <Link key={link.key} img={link.img}/>
                </li>
            ))}
            </ul>
        </footer>
    )
}

export default Footer