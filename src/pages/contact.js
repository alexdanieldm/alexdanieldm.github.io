import React from "react"

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
            <img src={img} alt={"icon"}/>
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