import React from "react"

// const Button = ({children, img, href}) => {

//     const imgPath = `/assets/icons/${img}`;

//     return (
//         <a className={`button ${className}`} href={`${href}`}>
//             <img src={`${imgPath}`} alt=""/>
            
//             <p>
//                 {children}
//             </p>
//         </a>
//     )
// }

const Header = () => {
    return (
        <header>
            <h1>Hi, I´m Alex Duran</h1>
            <h3>A passionate Software Developer, who loves using web-technologies to solve real world problems</h3>

            <div className="header-buttons">

            </div>  
        </header>
    )
}
export default Header