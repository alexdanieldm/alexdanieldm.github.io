import React from "react"

import Button from "../components/button"
import resume from "../docs/Resume.pdf"

const Header = () => {
    return (
        <header>
            <h1>Hi, I´m Alex Duran</h1>
            <h3>A passionate Software Developer, who loves using web-technologies to solve real world problems</h3>

            <div className="header-buttons">
                
                <Button 
                    className="projects_button" 
                    href="#projects" 
                    img="code-slash-sharp.svg"
                    label="See PROJECTS"
                />

                <Button 
                    className="resume" 
                    href={resume} 
                    donwload="Alex Duran CV" 
                    img="cloud-download-outline.svg"
                    label="Download RESUME"
                />

            </div>  
        </header>
    )
}
export default Header