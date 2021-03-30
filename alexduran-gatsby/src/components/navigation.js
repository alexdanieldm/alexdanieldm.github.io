// import { Link } from "gatsby"
import React from "react"
import resume from "../docs/Resume.pdf"
import Button from "./button"

const allLinks = [
    {id: 'a', href: '#about', value: 'About', img: 'information-circle-outline.svg'},

    {id: 'p', href: '#projects', value: 'Projects', img: 'code-slash-sharp.svg'},

    {id: 'c', href: '#contact', value: 'Contact', img: 'mail-outline.svg'},
    
    {id: 'r', href: {resume}, value: 'Resume', img: 'cloud-download-outline.svg'},
]

const NavLink = ({label, id, img, href}) => {
    const imgPath = `/assets/icons/${img}`;
    
    let className;
    id === 'r' ? className = 'mobile resume' : className = 'mobile';

    return (
        <a className={`${className}`} href={`${href}`}>
            <li>
                <img className='mobile' src={`${imgPath}`} alt=""/>
                {label}
            </li>
        </a>
    )
}

const Navigation = () => {
    return (
        <nav>
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
                img="cloud-download-outline.svg"
                label="Resume"
            />
        </nav>
    )
}

export default Navigation