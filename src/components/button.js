import React from "react"

const Button = ({className = '', href, donwload, img, label}) => {
    
    if (donwload) {
        
        return (
            <a target="_blank" rel="noopener noreferrer" className={`button ${className}`} href={`${href}`} download={`${donwload}`}>
                <img src={img} alt=""/>
                <p>{label}</p>
            </a>
        )

    } else {
        
        return (
            <a className={`button ${className}`} href={`${href}`}>
                <img src={img} alt=""/>
                <p>{label}</p>
            </a>
        )
    }

}

export default Button