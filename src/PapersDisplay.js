import React, {Component} from 'react'
import './PaperDisplay.css'
import moment from 'moment';

class PapersDisplay extends Component {

    state = {
        loading:false,
    }

render (){
    let heading = ""
    let papersToDisplay = []
    
    
    if((this.props.inputedDate1 || this.props.inputedDate2) && !this.props.idlistInputedDate.length) {
        if(this.props.selectedCountry){   
        heading =
        <div className="noPapers">
        {!this.props.inputedDate2 ? 
        <h2 className="noPapers">No COVID-19 papers published with authors from {this.props.selectedCountry} since {moment(this.props.inputedDate1, "YYYY-MM-DD").format("DD/MM/YYYY")}</h2>
        : 
        <h2 className="noPapers">No COVID-19 papers with authors from {this.props.selectedCountry} published between {moment(this.props.inputedDate1, "YYYY-MM-DD").format("DD/MM/YYYY")} - {moment(this.props.inputedDate2, "YYYY-MM-DD").format("DD/MM/YYYY")} </h2>
        }
        </div>
        } else {
            heading =
            <div className="noPapers">
            {!this.props.inputedDate2 ? 
            <h2>No COVID-19 papers published worldwide since {moment(this.props.inputedDate1, "YYYY-MM-DD").format("DD/MM/YYYY")}</h2>
            : 
            <h2 className="noPapers">No COVID-19 papers published worldwide between {moment(this.props.inputedDate1, "YYYY-MM-DD").format("DD/MM/YYYY")} - {moment(this.props.inputedDate2, "YYYY-MM-DD").format("DD/MM/YYYY")}.</h2>
            }
            </div>
        }
    } 

    if(this.props.idlistInputedDate.length && !this.props.selectedCountry) {
      papersToDisplay = this.props.papersListInputedDate
      heading = 
      <div>
      {!this.props.inputedDate2 ? 
          <div>
            <h2 className="dateHeading">COVID-19 papers published since {moment(this.props.inputedDate1, "YYYY-MM-DD").format("DD/MM/YYYY")}</h2>
            <h2 className="totalpapers">({this.props.idlistInputedDate.length} in total)</h2>
          </div>
          :
          <div>
            <h2 className="dateHeading">COVID-19 papers published between {moment(this.props.inputedDate1, "YYYY-MM-DD").format("DD/MM/YYYY")} - {moment(this.props.inputedDate2, "YYYY-MM-DD").format("DD/MM/YYYY")}</h2>
            <h2 className="totalpapers">({this.props.idlistInputedDate.length} in total)</h2>
          </div>
          }
      </div>
    } else if (this.props.idlistInputedDate.length && this.props.selectedCountry) {
        papersToDisplay = this.props.papersListInputedDate
        heading = 
        <div>
        {!this.props.inputedDate2 ? 
            <div>
              <h2 className="dateHeading">COVID-19 papers published with authors from {this.props.selectedCountry} since {moment(this.props.inputedDate1, "YYYY-MM-DD").format("DD/MM/YYYY")}</h2>
              <h2 className="totalpapers">({this.props.idlistInputedDate.length} in total)</h2>
            </div>
            :
            <div>
              <h2 className="dateHeading">COVID-19 papers published with authors from {this.props.selectedCountry} between {moment(this.props.inputedDate1, "YYYY-MM-DD").format("DD/MM/YYYY")} - {moment(this.props.inputedDate2, "YYYY-MM-DD").format("DD/MM/YYYY")}</h2>
              <h2 className="totalpapers">({this.props.idlistInputedDate.length} in total)</h2>
            </div>
            }
        </div>
      }
    
    if ((this.props.idlist || this.props.idlistWeek) && !this.props.inputedDate1) {
        if(!this.props.selectedCountry) {
        papersToDisplay = this.props.papersList
        heading = 
        <div className="paperDisplay">       
        <div>
            <h2 className="dateHeading">COVID papers published in the last day</h2>
            <h2 className="totalpapers">({this.props.papersList.length} in total)</h2>
        </div>
        
        {!this.props.papersList.length && 
        <p className="noPapers">There were no COVID-19 papers published worldwide in the last day.</p>
        }
        </div>
        } else {
    papersToDisplay = this.props.papersList
    heading = 
    <div className="paperDisplay">       
    <div>
        <h2 className="dateHeading">COVID-19 papers published with authors from {this.props.selectedCountry} in the last day</h2>
        <h2 className="totalpapers">({this.props.papersList.length} in total)</h2>
    </div>
    {!this.props.papersList.length && 
        <p className="noPapers">There were no COVID-19 papers published with authors from  {this.props.selectedCountry} in the last day.</p>
    }
    </div>
  }
}

let listDisplay = ""
if (papersToDisplay.length) {
 listDisplay = papersToDisplay.map(data => {
    let volume = ""
    if (data.volume === "") {
      volume = " volume/pages not yet available"
    } else {
    volume = `${data.volume}: `
    }


    return (   
    <div className="paperlistContainer"
    key={data.id}>
    <span>

    <span className="title">{`${data.title} `}</span>
    <span className="authors">{`${data.authors}, `}</span>
    <span className="year">{`(${data.pubdate}), `}</span>
    <span className="journal">{`${data.journal},  `}</span>
    <span className="volume">{`${volume} `}</span>
    <span className="pages">{`${data.pages},  `}</span>
    <span className="doi">{`${data.doi}, `}</span>
    <span className="pmid">PMID: <a href={`https://www.ncbi.nlm.nih.gov/pubmed/${data.id}`} target="_blank" rel="noopener noreferrer">{data.id}.</a></span>
    </span>
    </div>
    )
})
}

let weeklyListDisplay = ""
if (this.props.inputedDate1){
    weeklyListDisplay = null    
    } else if (this.props.idlistWeek.length) {
    weeklyListDisplay = this.props.papersListWeek.map(data => {
        let volume = ""
        if (data.volume === "") {
        volume = " volume/pages not yet available"
        } else {
        volume = `${data.volume}: `
        }

        return (

        <div className="paperlistContainer"
        key={data.id}>

        <span>
        <span className="title">{`${data.title} `}</span>
        <span className="authors">{`${data.authors}, `}</span>
        <span className="year">{`(${data.pubdate}), `}</span>
        <span className="journal">{`${data.journal},  `}</span>
        <span className="volume">{`${volume} `}</span>
        <span className="pages">{`${data.pages},  `}</span>
        <span className="doi">{`${data.doi}, `}</span>
        <span className="pmid">PMID: <a href={`https://www.ncbi.nlm.nih.gov/pubmed/${data.id}`} target="_blank" rel="noopener noreferrer">{data.id}.</a></span>
        </span>
        </div>
        )
    })

    } else {
        if(!this.props.selectedCountry){
        weeklyListDisplay = 
        <div> 
            <div className="paperDisplay">
                <p className="noPapers">The were no COVID papers published worldwide in the preceeding 6 days.</p>
            </div>
        </div>
        } else {
        weeklyListDisplay =
        <div> 
            <div className="paperDisplay">
                <p className="noPapers">The were no COVID papers published from authors in {this.props.selectedCountry} in the preceeding 6 days.</p>
            </div>
        </div>
        }
    }

    return (
        <div>
            {heading}
            {listDisplay}
            {weeklyListDisplay && this.props.selectedCountry &&
            <div>
                <h2 className="dateHeading">COVID papers published from authors in {this.props.selectedCountry} in the preceeding 6 days</h2>
                <h2 className="totalpapers">({this.props.idlistWeek.length} in total)</h2>
                {weeklyListDisplay}
            </div>
            }
            {weeklyListDisplay && !this.props.selectedCountry &&
                <div>
                    <h2 className="dateHeading">Papers published from authors worldwide in the preceeding 6 days</h2>
                    <h2 className="totalpapers">({this.props.idlistWeek.length} in total)</h2>
                    {weeklyListDisplay}
                </div>
                }

        </div>
        )
    }
}

export default PapersDisplay
