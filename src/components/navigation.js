// import { Link } from "gatsby"
import React from "react"
import { useState } from "react"

//* Import Components
import Button from "./button"

//* Import assets directly
import resume from "../docs/Resume.pdf"
import info_icon from "../assets/icons/information-circle-outline.svg"
import code_icon from "../assets/icons/code-slash-sharp.svg"
import mail_icon from "../assets/icons/mail-outline.svg"
import cloud_icon from "../assets/icons/cloud-download-outline.svg"

const allLinks = [
    {id: 'a', href: '#about', value: 'About', img: info_icon},

    {id: 'p', href: '#projects', value: 'Projects', img: code_icon},

    {id: 'c', href: '#contact', value: 'Contact', img: mail_icon},
    
    {id: 'r', href: {resume}, value: 'Resume', img: cloud_icon},
]

const NavLink = ({label, id, img, href}) => {

    let className;
    id === 'r' ? className = 'mobile resume' : className = '';

    return (
        <li>
            <a className={`${className}`} href={`${href}`}>
                <img className='mobile' src={img} alt={`${label} button`}/>
                {label}
            </a>
        </li>
    )
}

const Navigation = () => {
    const [color, setcolor] = useState(false);

    const changeColor = () => {
        if (window.scrollY > 200) {
            setcolor(true)
        } else {
            setcolor(false)
        }
    }

    React.useEffect(() => {
        window.addEventListener('scroll', changeColor)
    })

    return (
        <nav className={color ? 'solid' : ''}>
            <p className="symbol hide-mobile">
                記号
            </p>

            <ul>
                {allLinks.map(link => (
                    <NavLink 
                        key={link.id} 
                        label={link.value} 
                        id={link.id} 
                        img={link.img} 
                        href={link.href}
                    />
                ))}
            </ul>

            <Button 
                className="resume hide-mobile" 
                href={resume} 
                donwload="Alex Duran CV" 
                img={cloud_icon}
                label="Resume"
            />
        </nav>
    )
}

export default Navigation