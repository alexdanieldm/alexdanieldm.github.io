import React from "react"
import Emoji from "./emoji"

const allLinks = [
    {key: 'g', href: 'https://twitter.com/alexdanieldm', img: 'twitter-brands.svg'},

    {key: 't', href: 'https://www.linkedin.com/in/alexdanieldm/', img: 'linkedin-brands.svg'},

    {key: 'l', href: 'https://github.com/alexdanieldm', img: 'github-brands.svg'},

    {key: 'e', href: 'mailto:alexdanieldm@gmail.com', img: 'envelope-solid.svg'},
]

const Link = ({href, img}) => {
    const imgPath = `/assets/icons/Social Media/${img}`

    return (
        <a className="link" href={href}>
            <img src={imgPath} alt={img}/>
        </a>
    )
}

const Footer = () => {

    return (
        
        <footer>
            <p>Made with <Emoji symbol="❤️" label="heart"/> & <Emoji symbol="☕" label="coffee"/> by Alex Duran &copy; {new Date().getFullYear()}
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