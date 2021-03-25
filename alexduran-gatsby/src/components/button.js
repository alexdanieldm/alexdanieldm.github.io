import React from "react"

const Button = ({children, className = '', img, href, donwload = ''}) => {
    const imgPath = `/assets/icons/${img}`;

    if (donwload) {

        return (
            <a className={`button ${className}`} href={`${href}`} download="Alex Duran CV">
                <img src={`${imgPath}`} alt=""/>
                <p>{children}</p>
            </a>
        )

    } else {
        
        return (
            <a className={`button ${className}`} href={`${href}`}>
                <img src={`${imgPath}`} alt=""/>
                <p>{children}</p>
            </a>
        )
    }

}

export default Button