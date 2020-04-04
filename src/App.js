import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import PapersDisplay from './PapersDisplay';
import moment from 'moment';
import DateInput from './DateInput'
import Spinner from './Spinner'
import WelcomeBanner from './WelcomeBanner'
import {Route, Switch} from 'react-router-dom'
import SubHeading from './SubHeading'
import ResetButton from "./ResetButton"
import Stats from "./Stats"
import ResetCountryButton from "./ResetCountryButton"
import ApiError from "./ApiError"
import Contact from './Contact'
import About from './About'
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 1000
});


class App extends Component {
  state= {
    idlist: [],
    idlistWeek: [],
    idlistInputedDate:[],
    idlistSelected: [],
    papersList : [],
    papersListWeek : [],
    papersListInputedDate : [],
    dateMinus1: moment().subtract("1", "days").format("YYYY/MM/DD"),
    dateMinus2: moment().subtract("2", "days").format("YYYY/MM/DD"),
    dateMinus7: moment().subtract("7", "days").format("YYYY/MM/DD"),
    inputedDate1: "",
    inputedDate2: "",
    selectedCountry: "",
    loading: false,
    apiError: false,
    worldStats: "",
    countryStats: ""
  }

componentDidMount () {
  console.log("mount")
    axios.get("https://coronavirus-19-api.herokuapp.com/all ")
    .then(response => this.setState({loading: true, worldStats: response.data}) )
    
    this.getIdList()
}

componentDidUpdate () {
  console.log("update")
}

dateInput = (date1, date2) => {
  const convertedDate1 = moment(date1, "YYYY-MM-DD").format("YYYY/MM/DD")
  let convertedDate2 = ""
  if (date2) {
  convertedDate2 = moment(date2, "YYYY-MM-DD").format("YYYY/MM/DD")
  }
  this.setState({inputedDate1:convertedDate1, inputedDate2:convertedDate2}, () => 
  this.getIdList()
  )
}

getIdList = () => {

  let dateParams = ""
  let dateParams2 = ""
  
this.setState({idlist:[], idlistWeek:[], idlistInputedDate:[], papersList:[], papersListWeek:[], loading:true}, () => {
  
  if (!this.state.inputedDate1 && !this.state.selectedCountry) {
      dateParams = `${this.state.dateMinus1}"[Date - Entrez] : "3000"[Date - Entrez])`
      dateParams2 = `${this.state.dateMinus7}"[Date - Entrez] : "${this.state.dateMinus2}"[Date - Entrez])`
  } else if (this.state.inputedDate1 && !this.state.inputedDate2 && !this.state.selectedCountry){
      dateParams = `${this.state.inputedDate1}"[Date - Entrez] : "3000"[Date - Entrez])`
  } else if (this.state.inputedDate1 && this.state.inputedDate2 && !this.state.selectedCountry) {
      dateParams = `${this.state.inputedDate1}"[Date - Entrez] : "${this.state.inputedDate2}"[Date - Entrez])`
  }


  if (this.state.selectedCountry) {
    if (!this.state.inputedDate1) {
    dateParams = `${this.state.dateMinus1}"[Date - Entrez] : "3000"[Date - Entrez]) AND ${this.state.selectedCountry}[Affiliation])`
    dateParams2 = `${this.state.dateMinus7}"[Date - Entrez] : "${this.state.dateMinus2}"[Date - Entrez]) AND ${this.state.selectedCountry}[Affiliation])`
  } else if (this.state.inputedDate1 && !this.state.inputedDate2) {
    dateParams = `${this.state.inputedDate1}"[Date - Entrez] : "3000"[Date - Entrez]) AND ${this.state.selectedCountry}[Affiliation])`
  } else if (this.state.inputedDate1 && this.state.inputedDate2) {
    dateParams = `${this.state.inputedDate1}"[Date - Entrez] : "${this.state.inputedDate2}"[Date - Entrez]) AND ${this.state.selectedCountry}[Affiliation])`
  }
}

  const dateParamsEncoded = encodeURIComponent(dateParams)
  const dateParamsEncoded2 = encodeURIComponent(dateParams2)

  let textwordUnencoded = `((((covid-19[Text Word]) OR SARS-CoV-2[Text Word])) AND ("`
  const textwordEncoded = encodeURIComponent(textwordUnencoded)
  

  const url =  `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=10000&term=${textwordEncoded}${dateParamsEncoded}`
  const url2 =  `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=10000&term=${textwordEncoded}${dateParamsEncoded2}`


  if (!this.state.inputedDate1) {
    axios.all([
      http.get(url),
      http.get(url2)
    ])
    .then(axios.spread((responseUrl1, responseUrl2) => {        
      const idlist = responseUrl1.data.esearchresult.idlist
      const idlistWeek = responseUrl2.data.esearchresult.idlist
      this.setState({idlist, idlistWeek})
      this.addPapers() 
      }))
      .catch(error => 
          this.setState({apiError: true, loading: false})
      )   
    } else if (this.state.inputedDate1) {
      axios.get(url)
      .then (response => {
        const idlistInputedDate = response.data.esearchresult.idlist
        this.setState({idlistInputedDate})
        this.addPapers()
        })
        .catch(error => 
          this.setState({apiError: true, loading: false})
        )
    }
  })
}


addPapers = () => { 
  this.setState({loading: true})
  
  let paperList = []
  let paperListWeek = []
  
  let paperListString = []
  let idlistToDisplay = ""
  
 if (this.state.idlistInputedDate.length) {
        if (this.state.idlistInputedDate.length > 2000) {
          alert("Your search returned: " + this.state.idlistInputedDate.length + " papers. All papers beyond the 2000th have been removed. If you want to see more papers in that date range, please perform separate searches using closer start and end dates.")
          idlistToDisplay = this.state.idlistInputedDate.splice(2000)  
        } else {
          idlistToDisplay = this.state.idlistInputedDate
        }  
      } else if (this.state.idlist.length){
          idlistToDisplay = this.state.idlist
      }
  
      if (idlistToDisplay.length < 350){
        paperListString.push([idlistToDisplay.toString()])
      } else {
        for (let i=0; i < idlistToDisplay.length; i+=349) {
          paperListString.push([idlistToDisplay.slice(i,i+349).toString()]);
        }
    }
  
    let paperListStringWeek = []
    if (this.state.idlistWeek.length < 350 ){
        paperListStringWeek.push([this.state.idlistWeek.toString()])
      } else {
        for (let i=0; i < this.state.idlistWeek.length; i+=349) {
          paperListStringWeek.push([this.state.idlistWeek.slice(i,i+349).toString()]);
        }
    }
  
    if (idlistToDisplay.length) {
        let loop = 0 
        paperListString.forEach(listString => {
            axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${listString}&api_key=${process.env.REACT_APP_PUBMED_API_KEY}`)
            
            .then(response1 => { 
              let myObj=response1.data.result
              Object.keys(myObj).forEach(key => {
                let paperObj = {}
                if (key !== "uids") {
                let id = myObj[key].uid
                let title = myObj[key].title
                let  journal = myObj[key].fulljournalname
                let  volume = myObj[key].volume
                let  pages = myObj[key].pages
                let  doi = myObj[key].elocationid
                let  authors = myObj[key].authors
                let  pubdate = myObj[key].pubdate.slice(0,4)
                let authorList = []
                authors.map((author, idx) =>
                idx > 0
                  ? authorList.push(" " + author.name)
                  : authorList.push(author.name)
                )
  
              paperObj.id = id;
              paperObj.title = title;
              paperObj.journal = journal;
              paperObj.volume = volume;
              paperObj.pages = pages;
              paperObj.authors = authorList.toString();
              paperObj.doi = doi;
              paperObj.pubdate = pubdate;
              paperList.push(paperObj)
  
              }})
            })
            .catch(error => 
              this.setState({apiError: true, loading: false})
            )
            .then(response1 => {
            
            if (loop === paperListString.length) {
             if (this.state.idlistInputedDate.length) {
              paperList.length === idlistToDisplay.length && 
              this.setState({ papersListInputedDate: paperList, loading: false });
            } else if (this.state.idlist.length){
              paperList.length === idlistToDisplay.length && 
              this.setState({ papersList: paperList, loading: false })
            }
            }
          })
          loop = loop + 1
        })
      }
      
    if (this.state.idlistWeek.length) { 
        let loopWeek = 0
        if (!this.state.inputedDate1) {
        paperListStringWeek.forEach(listString => {
            axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&rettype=json&id=${listString}&api_key=${process.env.REACT_APP_PUBMED_API_KEY}`)
            .then(response2 => { 
              let myObj=response2.data.result
              Object.keys(myObj).forEach(key => {
                let paperWeekObj = {}
                if (key !== "uids") {
                let id = myObj[key].uid
                let title = myObj[key].title
                let  journal = myObj[key].fulljournalname
                let  volume = myObj[key].volume
                let  pages = myObj[key].pages
                let  doi = myObj[key].elocationid
                let  authors = myObj[key].authors
                let  pubdate = myObj[key].pubdate.slice(0,4)
                let authorList = []
                authors.map((author, idx) =>
                idx > 0
                  ? authorList.push(" " + author.name)
                  : authorList.push(author.name)
                )
  
              paperWeekObj.id = id;
              paperWeekObj.title = title;
              paperWeekObj.journal = journal;
              paperWeekObj.volume = volume;
              paperWeekObj.pages = pages;
              paperWeekObj.authors = authorList.toString();
              paperWeekObj.doi = doi;
              paperWeekObj.pubdate = pubdate;
              paperListWeek.push(paperWeekObj)
              }})
            })      
            .catch(error => 
              this.setState({apiError: true, loading: false})
            )
            .then(response2 => {
                  if (loopWeek === paperListStringWeek.length) { 
                  paperListWeek.length === this.state.idlistWeek.length &&
                  this.setState({ papersListWeek: paperListWeek, loading: false })
                  }
                }) 
                loopWeek = loopWeek + 1 
            })
        } 
      } else {
        this.setState({ papersListWeek: [], loading: false })
      }  
  };

countrySelect = (country) => {
  axios.get(`https://coronavirus-19-api.herokuapp.com/countries/${country}` )
  .then (response => 
    this.setState({loading: true, selectedCountry: country, countryStats: response.data}, () => {
    this.getIdList()
}))}


resetDates = () => {
  this.setState({inputedDate1: "", inputedDate2: ""}, () => this.getIdList() ) 
}

resetCountry = () => {
  this.setState({selectedCountry: "", countryStats: ""}, () => this.getIdList() ) 
}


apiReset = () => {
  if (this.state.selectedInstitute){
  this.setState({apiError:false}, () => this.getIdList()) 
  } else {
    this.setState({apiError:false}, () => this.addPapers()) 
  }
}

  render() {
    let papersDisplay = ""
   
    papersDisplay =  <PapersDisplay 
    papersList = {this.state.papersList}
    papersListWeek = {this.state.papersListWeek}
    papersListInputedDate = {this.state.papersListInputedDate}
    inputedDate1 = {this.state.inputedDate1}
    inputedDate2 = {this.state.inputedDate2}
    idlistWeek = {this.state.idlistWeek}
    idlistInputedDate = {this.state.idlistInputedDate}
    selectedCountry = {this.state.selectedCountry}
    /> 
    if(this.state.loading) {
      papersDisplay = <Spinner />
    } else if (this.state.apiError) {
      papersDisplay = <ApiError 
      apiReset={this.apiReset}
      />
    }

  let buttonPosition =""
  if (this.state.selectedCountry && this.state.inputedDate1){
    buttonPosition = "resetButtonBoth"
  } 
  if (this.state.selectedCountry && !this.state.inputedDate1) {
    buttonPosition = "resetButtonCountry"
  } 
  if (!this.state.selectedCountry && this.state.inputedDate1) {
    buttonPosition = "resetButtonDate"
  }



    return ( 
      <div className="App">
      <Switch>
          <Route exact path="/" render= {() => 
            <>
            <WelcomeBanner />
            <DateInput
              dateInput = {this.dateInput}
              countrySelect = {this.countrySelect}
            /> 

            <div className={buttonPosition}>
              {this.state.selectedCountry &&
              <ResetCountryButton 
                resetCountry = {this.resetCountry}
              />
              }
              {this.state.inputedDate1 &&
              <ResetButton 
              resetDates = {this.resetDates}
              />
              }
            </div>

              <SubHeading 
              />  

            <div className="displayContainer">
              {this.state.selectedCountry ?
              <div>
              <h1 className="countrySelection">{this.state.selectedCountry}</h1>
              </div>
              :
              <div>
              <h1 className="countrySelection">All Countries</h1>
              <p className="instituteTitleSubHeading">Select a country above</p>
              </div>
              }
            
            <Stats
            className="statsComp" 
            worldStats={this.state.worldStats}
            countryStats={this.state.countryStats}
            />

              {papersDisplay}
            </div>
            </>
            } 
          />
           <Route exact path="/about" render= {() => 
              <About />
            }
            />
            <Route exact path="/contact" render= {() => 
              <Contact />
            }
            />
        </Switch>
      </div>

    );
  }
}
export default App;
