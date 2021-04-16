import React from "react"
import { StaticImage } from "gatsby-plugin-image"

//* Import components
import Button from "../components/button"
import Emoji from "../components/emoji"

//* Import assets directly
import github_icon from "../assets/logos/socials/github-brands.svg"
import linkedin_icon from "../assets/logos/socials/linkedin-brands.svg"

const About = () => {
    return (
        <section className="about" id="about">
            <h1>About Me</h1>

            <div className="content">
                <div className="picture">
                    
                    <StaticImage
                        className="profile"
                        src="../assets/images/profile_photo.png"
                        alt="Profile Photo"
                        placeholder="blurred"
                    />
                    
                    <section className="desktop">
                        <div className="social">
                            <Button
                                className="github-button"
                                href="https://github.com/alexdanieldm" 
                                img={github_icon}
                                label="Github"
                            />

                            <Button 
                                href="https://www.linkedin.com/in/alexdanieldm/" 
                                img={linkedin_icon}
                                label="LinkedIn"
                            />
                        </div>
                    </section>
                </div>

                <div className="info">
                    <p>
                        <b>- Personal Side:</b> I am a tech martial artist, AKA a tech guy who like throwing kick from time to time 
                        (weird combo i know). I love music, coding, video-games and anime. One book that has define my outlook on life its <a target="blank" href="https://austinkleon.com/steal/">"Steal Like an Artist"</a>
                        , it teach the importance of continues learning not only to develop yourself but so you can share everything you "steal". 
                    </p>
                    
                    <p>
                        <b>- Professional Side:</b> Always up for taking on new challenges, as well as, being able to develop new and 
                        creative ideas. I have experience on stressful and pressured situations and can also easily adapt to change 
                        and identify myself with the team at which I work.
                    </p>

                    <div className="languages">
                        <b>- Languages:</b>
                        <ul>
                            <li>Spanish <Emoji symbol="🇻🇪" label="Venezuelan Flag"/> (Native Speaker)</li>
                            <li>English <Emoji symbol="🇺🇸" label="US Flag"/> (Proficient Speaker)</li>
                        </ul>
                    </div>
                    
                    <p>
                        <b>- Former Education:</b> Computer Engineer, Universidad José Antonio Páez (2017 - 2021)
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About