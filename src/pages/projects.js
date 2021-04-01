import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Button from "../components/button"

const About = () => {
    return (
        <section className="projects" id="projects">
            <h1>Projects</h1>

            <div className="card">
                <div className="content">
                    <div className="picture">
                        <StaticImage
                            className="capture"
                            src="../assets/images/crypto.jpeg"
                            alt="Project Capture"
                            placeholder="blurred"
                        />

                        <Button 
                            href="https://github.com/alexdanieldm/crypto" 
                            img="linkedin-brands.svg"
                            label="Project Repository"
                        />
                    </div>

                    <div className="info">
                        <p>
                            <b>Name:</b> Crypto
                        </p>

                        <p>
                            <b>Technologies Used:</b> Python, Javascript, Node.js, Electron, MongoDB
                        </p>

                        <p>
                            <b>Description:</b> A cross-platform desktop application that let's you encrypt and decrypt files.
                        </p>

                        <p>
                            <b>Merits on the projects:</b>
                            <ul>
                                <li><b>1.</b> End-to-End Development</li>

                                <li>
                                    <b>2.</b> Developed and designed of a hybrid cryptography system to overcome 
                                    limitation of traditional cryptography algorithms.
                                </li>

                                <li><b>3.</b> Designed all UI/UX</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default About