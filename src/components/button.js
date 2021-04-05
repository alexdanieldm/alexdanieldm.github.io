import React from "react"

const Button = ({className = '', href, donwload, img, label}) => {
    const imgPath = `/assets/icons/${img}`;

    if (donwload) {

        return (
            <a target="_blank" rel="noopener noreferrer" className={`button ${className}`} href={`${href}`} download={`${donwload}`}>
                <img src={`${imgPath}`} alt=""/>
                <p>{label}</p>
            </a>
        )

    } else {
        
        return (
            <a className={`button ${className}`} href={`${href}`}>
                <img src={`${imgPath}`} alt=""/>
                <p>{label}</p>
            </a>
        )
    }

}

export default Button