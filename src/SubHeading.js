import React from 'react'

const SubHeading = () => {
    return (
    <div className="subBanner" style={{margin: "10px 10%", padding:0
}}>
        <p className="subBannerText" style={{lineHeight: 1.3, fontSize: "1rem", margin:0}}><span style={{fontWeight: "bold", fontStyle: "italic", color: "rgb(173, 2, 36)" }}>COVID-19 Publications</span>  displays all papers on COVID-19 / SARS-CoV-2 as they appear on PubMed. You can change the dates you search (default is today / this week), as well as limit the search to papers with authors from a particular country.</p>
        <hr style={{marginTop: "20px"}}/>
    </div>
    )
}

export default SubHeading

