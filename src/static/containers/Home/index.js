import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import './style.scss';

class HomeView extends React.Component {
    render() {
        return (
            <div className="container-fluid home" style={{padding: 0}}>
                <div className="order-page">                    
                    <div className="container">
                        <div className='content-title'>
                            <h1 className='title-heald'>EMBARK FOR <br />DOG BREEDERS</h1>
                            {/* <div className='subtitle-box'>
                                <a href="">BREED-SPECIFIC HEALTH TESTS </a><a href="">COAT COLOR</a><a href="">INBREEDING</a>
                            </div>
                            <div className='subtitle-box subtitle'>
                                <a href="">EACH MUTATION TESTED 2 - 8x  </a> <a href="">OFA ACCEPTED</a><a href="">AFFORDABLE</a>
                            </div> */}
                            <a href="" className='lists-problem lists-headle'><strong>ORDER KITS</strong></a>
                            <a href="" className='lists-problem'><strong>Questions?</strong></a>
                            <a href="" className='lists-problem'><strong>ORDER KITS</strong></a>
                        </div>
                    </div>
                    <div className='dna-testing-werpper'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>BREEDER-FRIENDLY DNA TESTING</strong></div>
                                <div className='dna-testing-right'></div>
                            </div>
                            <div className='dna-testing-text'>
                                Embark uses a research grade SNP chip in a CLIA-certified lab that identifies breed-specific genetic disease risks and traits like coat and color with a simple cheek swab.
                        </div>
                            <div className='button-werpper'>
                                <a href="#" className='button-click button-blue'>HEALTH CONDITIONS</a>
                                <a href="#" className='button-click button-red'>TRAITS</a>
                                <a href="#" className='button-click button-purple'>COI</a>
                            </div>

                        </div>
                    </div>
                    <div className='health-conditions'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>HEALTH CONDITIONS</strong></div>
                                <div className='dna-testing-right'></div>
                            </div>
                            <div className='health-conditions-text'>
                                <div className='health-conditions-text-right'>
                                    <p className='health-conditions-text-right-title'>GENETIC DISEASE TESTING TAILORED TO YOUR NEEDS</p>
                                    <p className='health-conditions-text-right-content'>Ensure every litter is as healthy as possible with Embark. We test for most or all testable genetic health conditions in nearly every breed. We test all dogs on our entire marker set so you don't have to choose which breed-specific health and trait tests to buy. It also allows us to work with breeders and breed clubs to discover the genetic mutations behind currently untestable diseases.
                                </p>
                                    <div className='buttom-button'>
                                        <a href="" className='buttom-button-left'>{'SAMPLE RESULTS'}</a>
                                        <a href="" className='buttom-button-right'>{'DISEASE TEST LIST'}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='traitst'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>{'TRAITS'}</strong></div>
                                <div className='dna-testing-right'></div>
                            </div>
                            <div className='health-conditions-text traitst-text'>
                                <div className='health-conditions-text-right traitst-text-left'>
                                    <p className='health-conditions-text-right-title traitst-text-left-title'>{'OUR NEWLY CREATED BREEDER-FOCUSED ADVANCED TAB'}</p>
                                    <p className='health-conditions-text-right-content traitst-text-left-content'>Ensure every litter is as healthy as possible with Embark. We test for most or all testable genetic health conditions in nearly every breed. We test all dogs on our entire marker set so you don't have to choose which breed-specific health and trait tests to buy. It also allows us to work with breeders and breed clubs to discover the genetic mutations behind currently untestable diseases.
                                </p>
                                    <div className='buttom-button-traitst'>
                                        <a href="" className='buttom-button-traitst-left'>ADVANCED TAB TEST LIST</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>{'COI'}</strong></div>
                                <div className='col-right'>{'COEFFICIENT OF INBREEDING'}</div>
                            </div>
                            <div className='health-conditions-text traitst-text'>
                                <div className='health-conditions-text-right traitst-text-left col-text-left'>
                                    <p className='health-conditions-text-right-title traitst-text-left-title'>ASSESS YOUR DOG'S GENETIC DIVERSITY</p>
                                    <p className='health-conditions-text-right-content traitst-text-left-content'>
                                        {'Coefficient of Inbreeding (COI) is a measure of how genetically similar a dog’s parents are. From a genetic point of view, this translates to what percentage of the genome is identical on both its maternal and paternal strands (also known as homozygosity).'}
                                    </p>
                                    <div className='buttom-button-traitst'>
                                        <a href="" className='buttom-button-traitst-left'>{'LEARN MORE ABOUT COI'}</a>
                                    </div>
                                    <div className='col-position'>
                                        <div className='col-position-top'></div>
                                        <span className='col-podition-bottom'>{'Breeding Coefficent: One of our Advanced Tab features.'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='quality-assured'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>{'QUALITY ASSURED'}</strong></div>
                                <div className='quality-assured-title'>{'Our lab is partnered with the Cornell University College of Veterinary Medicine and is operated by a highly skilled team of canine and veterinary geneticists.'}</div>
                            </div>
                            <div className='quality-assured-content'>
                                <div className='health-conditions-text traitst-text quality-assured-text'>
                                    <div className='health-conditions-text-right traitst-text-left quality-assured-left'>
                                        <p className='helder-title'>DATA-DRIVEN ACCURACY</p>
                                        <ul className='list-text'>
                                            <li>Comprehensive testing platform has 99.99% genotyping accuracy.</li>
                                            <li>Licensee and research partner of Cornell University College of Veterinary Medicine.</li>
                                            <li>Results are examined by a team of Ph.D. geneticists and veterinarians to ensure accuracy.</li>
                                            <li>All breed-applicable test results are approved by OFA.</li>
                                        </ul>
                                        <div className='buttom-button-traitst'>
                                            <a href="" className='buttom-button-traitst-left quality-assured-button'>{'LEARN MORE ABOUT OUR TEST CHIP'}</a>
                                        </div>
                                        <div className='quality-assured-bottom'>
                                            <div className='col-position-top'></div>
                                            <span className='quality-assured-footer'>{' Resolution of Embark 200K SNP Test vs leading STR test'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>{'WHAT DOES IT COST?'}</strong></div>
                                <div className='quality-assured-title'>{'Both trait and breed-specific health tests are included in our single test kit. No more ordering several tests from different providers again, saving time and money on each dog.'}</div>
                            </div>
                            <div className='health-conditions-text traitst-text'>
                                <div className='health-conditions-text-right traitst-text-left col-text-left'>
                                    <p className='health-conditions-text-right-title traitst-text-left-title'>{'SPECIAL BULK PRICING'}</p>
                                    <p className='health-conditions-text-right-content traitst-text-left-content'>
                                        We offer large qualified breeders wholesale pricing. For information on our breeder bulk discounts, and to see how much you can save with our breeder program, please click below. We'll discuss pricing with your team and provide a unique coupon code.
                                </p>
                                    <div className='buttom-button-traitst'>
                                        <a href="" className='buttom-button-traitst-left special-button'>{'GET BULK PRICING'}</a>
                                    </div>
                                    <div className='col-position special'>
                                        <p className='position-helder-title'>NEW BULK PRICING:</p>
                                        <p className='position-helder-list'>1 Kit = $179</p>
                                        <p className='position-helder-list'>2 - 4 Kits = $169 per kit</p>
                                        <p className='position-helder-list'>5 - 9 Kits = $159 per kit</p>
                                        <p className='position-helder-list'>10 - 19 Kits = $149 per kit</p>
                                        <p className='position-helder-list'>20+ =  Contact us</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='quality-assured research'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>{'OUR RESEARCH'}</strong></div>
                                <div className='quality-assured-title'></div>
                            </div>
                            <div className='quality-assured-content'>
                                <div className='health-conditions-text traitst-text quality-assured-text'>
                                    <div className='health-conditions-text-right traitst-text-left quality-assured-left'>
                                        <p className='research-title'>PIONEERING CANINE GENETICS</p>
                                        <p className='research-contern'>Our Chief Science Officer, Dr. Adam Boyko, has coauthored more than 40 peer-reviewed scientific papers (published in is lab discovered genetic markers for body size, hip and elbow dysplasia, granulomatous colitis, and mast cell tumors. These findings inform features like our state of the art "genetic weight" algorithms, and pushes ever further into the field of personalized genomics for your dog.</p>
                                        <div className='quality-assured-bottom'>
                                            <div className='col-position-top'></div>
                                            <span className='quality-assured-footer'>{' Dr. Adam Boyko (click for paper)'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='active-research'>
                        <div className='container'>
                            <h1 className='active-research-title'>ACTIVE RESEARCH</h1>
                            <div className='research-box'>
                                <div className='research-left'>
                                    <p className='research-text'>BODY SIZE</p>
                                    <p className='research-text'>LONGEVITY</p>
                                    <p className='research-text'>NEUROLOGICAL DISEASE</p>
                                    <p className='research-text'>EYE COLOR</p>
                                </div>
                                <div className='research-mid'></div>
                                <div className='research-right'>
                                    <p className='research-text'>COLOR DILUTION ALOPECIA</p>
                                    <p className='research-text'>PATENT DUCTUS ARTERIOSUS</p>
                                    <p className='research-text blod-last'>BREED-SPECIFIC DISEASES *</p>
                                </div>
                            </div>
                            <div className='active-research-bottom'>
                                <div className='active-research-bottom-left'>* Does your breed experience unique problems? <br />We may be able to develop a test for you.</div>
                                <div className='active-research-bottom-right'><a href="">CONTACT US</a></div>
                            </div>
                        </div>
                    </div>
                    <div className='health-conditions'>
                        <div className='container'>
                            <h1 className='active-research-title'>WHAT CAN WE DO FOR YOUR BREED CLUB</h1>
                            <div className='health-conditions-text service-wrapper'>
                                <div className='health-conditions-text-right'>
                                    <p className='service'>
                                        <strong>ERADICATE DISEASE IN YOUR BREED</strong>
                                        <span>We can work with you to provide the necessary genetic data to help identify the genes that cause health problems in your breed.</span>
                                    </p>
                                    <p className='service'>
                                        <strong>ACCELERATE DISCOVERY</strong>
                                        <span>Genetic data combined with breed-specific health and research surveys can power the genetic association studies of the future.</span>
                                    </p>
                                    <p className='service'>
                                        <strong>BUILD A HEALTHIER FUTURE</strong>
                                        <span>Linking genetic data with pedigree data enables genomic selection for healthier dogs.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='started'>
                        <div className='conditions'>
                            <div className='started-left'>
                                <p className='started-title'>
                                    LET'S GET STARTED!
                            </p>
                                <p className='started-checked'>
                                    <strong>{'LIMITED-TIME INTRO '}</strong>
                                    <strong>{'PRICING ENDS SOON! '}</strong>
                                </p>
                                <span className='subtitle-started'>{'Please contact us for bulk pricing over 20 kits.'}</span>
                            </div>
                            <div className='started-right'>
                                <a href="" className='started-right-button'>{'ORDER NOW'}</a>
                            </div>
                        </div>
                    </div>
                    <footer>
                        <div className='conditions'>
                            <div className='flooter-left'>
                            </div>
                            <div className='flooter-mid'>
                                <p className='left-title'>{'Learn more'}</p>
                                <p className='left-content'><a href="">{'Breed '}</a></p>
                                <p className='left-content'><a href="">{'Health '}</a></p>
                                <p className='left-content'><a href="">{'Compare with other tests '}</a></p>
                                <p className='left-content'><a href="">{'FAQ '}</a></p>
                                <p className='left-content'><a href="">{'Blog '}</a></p>
                                <p className='left-content'><a href="">{'Careers '}</a></p>
                            </div>
                            <div className='flooter-right'>
                                <p className='left-title'>{'Learn more'}</p>
                                <p className='left-content'><span>{'125 Kingston St, STE 301 '}</span></p>
                                <p className='left-content'><span>{'Boston, MA 02111 '}</span></p>
                                <p className='left-content'><span>{'breeders@embarkvet.com '}</span></p>
                                <p className='left-content'><span>{'224.236.2275 '}</span></p>
                                <p className='left-content'><a href="">{'Terms of Service - Privacy Policy '}</a></p>
                            </div>
                        </div>
                    </footer>
                    {/* <a href="#" className='trigger-body'>Get $10</a> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
