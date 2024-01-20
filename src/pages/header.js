import React from "react"

//* Import Components
import Button from "../components/button"
import CV from "../docs/Curriculum.pdf"

//* Import Assets Directly
import cloud_icon from "../assets/icons/cloud-download-outline.svg"
import code_icon from "../assets/icons/code-slash-sharp.svg"

const Header = () => {
  return (
    <header id="header">
      <h1>Hi, I'm Alex Duran</h1>
      <h3>
        A passionate Software Developer, who loves using web-technologies to
        solve real world problems
      </h3>

      <div className="header-buttons">
        <Button
          className="projects_button"
          href="#projects"
          img={code_icon}
          label="See PROJECTS"
        />

        <Button
          className="resume"
          href={CV}
          donwload="Alex Duran CV"
          img={cloud_icon}
          label="Download RESUME"
        />
      </div>
    </header>
  )
}
export default Header
