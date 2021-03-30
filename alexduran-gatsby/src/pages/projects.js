import React from "react"

import Button from "../components/button"
import crypto_capture from "../assets/images/crypto.jpeg"

const About = () => {
    return (
        <section className="projects" id="projects">
            <h1>Projects</h1>

            <div className="card">
                <div className="content">
                    <div className="picture">
                        <img className="capture" src={crypto_capture} alt="project capture"/>

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