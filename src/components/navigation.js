// import { Link } from "gatsby"
import React from "react"
import resume from "../public/docs/Resume.pdf"

const allLinks = [
    {id: 'a', href: '#about', value: 'About', img: 'information-circle-outline.svg'},
    {id: 'p', href: '#projects', value: 'Projects', img: 'code-slash-sharp.svg'},
    {id: 'c', href: '#contact', value: 'Contact', img: 'mail-outline.svg'},
    {id: 'r', href: {resume}, value: 'Resume', img: 'cloud-download-outline.svg'},
]

const NavLink = ({children, id, img, href}) => {
    const imgPath = `/assets/icons/${img}`;
    
    let className;
    id === 'r' ? className = 'mobile resume' : className = 'mobile';

    return (
        <a className={`${className}`} href={`${href}`}>
            <li>
                <img className='mobile' src={`${imgPath}`} alt=""/>
                {children}
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

                <NavLink key={link.id} id={link.id} img={link.img} href={link.href}>
                    {link.value}
                </NavLink>
                ))}
            </ul>

            <a className="resume button hide-mobile" href="/docs/Resume.pdf" download="Alex Duran CV">
                <img src="/assets/icons/cloud-download-outline.svg" alt=""/>
                <p>Resume</p>
            </a>
        </nav>
    )
}

export default Navigation