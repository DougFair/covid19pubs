import React from 'react'
import './ApiError.css'



const ApiError = (props) => {
    
    
    const clickHandler = () => {
        props.apiReset()
    }

    return (
    <div className="apiError"> 

        <h2 className="apiErrorMessageHeading">Hmmmm....there was an error loading you papers!</h2>
        
        <p className="apiErrorMessage">This usually occurs when there is a problem connecting to the Pubmed server.</p>
        
        <div className="apiErrorResetButton">
        <button className="apiResetButton" onClick={clickHandler}>RELOAD</button>
        <p className="apiErrorMessage">Click to re-connect...this should resolve the problem</p>
        </div>

        <p className="apiErrorMessage">Note: If problem does persist (i.e. you receive this message and reload more than 3-4 times) refresh your browser. However, please note this will also reset your current search parameters (e.g. dates, selected Institute) if you have any.</p>

    </div>
    )

}

export default ApiError