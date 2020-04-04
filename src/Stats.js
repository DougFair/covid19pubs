import React from'react'
import "./Stats.css"

const Stats = (props) => {
let statsDisplay = ""
    if(props.countryStats) {
        statsDisplay = 
        <div className="statsContainer">
            <p className="stats">Cases: {props.countryStats.cases} | Deaths: {props.countryStats.deaths} | Recovered: {props.countryStats.recovered}</p>
        </div>       
    } else {
        statsDisplay = 
        <div className="statsContainer">
            <p className="stats">Cases: {props.worldStats.cases} | Deaths: {props.worldStats.deaths} | Recovered: {props.worldStats.recovered}</p>
        </div>
    }

return statsDisplay

}

export default Stats