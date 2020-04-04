import React from 'react'
import "./ResetButton.css"

const ResetCountryButton = (props) => {
    
    const clickHandler = () => {
        props.resetCountry()
    }

    return (
        
        <div className="buttonAndLabel">
        <button className="resetButton" onClick={clickHandler}>RESET</button>
        <span><p style={{marginLeft: "10px", fontWeight:"600"}}>
        Reset country selection to world</p>
        </span>
        </div>
    )

}

export default ResetCountryButton