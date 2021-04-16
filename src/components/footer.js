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
    {id: 't', href: 'https://twitter.com/alexdanieldm', img: twitter_icon},

    {id: 'l', href: 'https://www.linkedin.com/in/alexdanieldm/', img: linkedin_icon},

    {id: 'g', href: 'https://github.com/alexdanieldm', img: github_icon},

    {id: 'm', href: 'mailto:alexdanieldm@gmail.com', img: mail_icon},
]

//* Create Link component
const Link = ({href, img}) => {
    return (
        <a target="blank" className="link" href={href}>
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
                    <Link key={link.id} href={link.href} img={link.img}/>
                </li>
            ))}
            </ul>
        </footer>
    )
}

export default Footer