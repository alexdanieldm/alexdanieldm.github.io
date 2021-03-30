// import { Link } from "gatsby"
import React from "react"

const allLinks = [
    {key: 'g', href: 'https://twitter.com/alexdanieldm', img: 'twitter-brands.svg'},

    {key: 't', href: 'https://www.linkedin.com/in/alexdanieldm/', img: 'linkedin-brands.svg'},

    {key: 'l', href: 'https://github.com/alexdanieldm', img: 'github-brands.svg'},

    {key: 'e', href: 'mailto:alexdanieldm@gmail.com', img: 'envelope-solid.svg'},
]

const Link = ({href, img}) => {
    const imgPath = `/assets/icons/Social Media/${img}`

    return (
        <a class="link" href={href}>
            <img src={imgPath} alt={img}/>
        </a>
    )
}

const Contact = () => {
    return (
        <section className="contact" id="contact">
            <h1>Contact Me</h1>

            <div className="content">
                <p className="kanji">嘱</p>

                <div className="preference">
                    <p>
                        Whether you are interested to do business with me, want to chat about code, 
                        or just hang out, I am happy to talk to you.
                    </p>

                    <p>
                        My preferred way of contact is via <a className="link" href="https://twitter.com/alexdanieldm"><b>Twitter</b></a> or  <a className="link" href="mailto:alexdanieldm@gmail.com"><b>Email</b></a>
                    </p>
                </div>

                <p className="kanji only-tablet">嘱</p>

                <div className="social">
                    <p>
                        Feel free to check out my social media presence below to get to know me better.
                    </p>

                    <ul>
                        {allLinks.map(link => (
                            <li>
                                <Link key={link.key} img={link.img}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
        </section>
        
    )
}

export default Contact