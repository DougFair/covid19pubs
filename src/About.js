import React from 'react'
import './About.css'

const About = () => 
            <div >
                <div className="aboutContainer">
                    <div className="aboutHeader">
                        <h1>About Aussie MRI Pubs...</h1>
                            <p>In essence, it is easy to search Pubmed for any papers published by a particular Medical Research Institute, however, if you are interested in what is going on at MRIs across the board, it is much more difficult. <span className="titleSpan">Aussie MRI Pubs</span> lets you do this with ease.
                            </p>
                            <p>Currently we only search those MRIs that are listed on the <a href="https://aamri.org.au/">Association of Australian Medical Research Institutes</a> (AAMRI) website. Unfortunately, we cannot promise we will pick up every paper that is published in any selected time period as authors sometimes will list their affilation using a non-standard abbreviation or name. Occassionally, we also pick up papers from overseas Institutes that have very similar names to those in Australia. Although this is also unavoidable, we are pretty confident we will pick up the majority of papers for any given MRI within the time frames entered.  
                            </p>
                            
                            <p >Please use the <span><a href="/contact">Contact</a></span> page to provide any feedback on this app. We are very open to suggestions! 
                            </p>
                    </div>
                </div>
            </div>

export default About;

