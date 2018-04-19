import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import {Link} from 'react-router-dom';
import './style.scss';

class HomeView extends React.Component {
    render() {
        return (
            <div className="container-fluid home" style={{padding: 0}}>
                <div className="order-page">                    
                    <div className="outer">
                        <div className="container">
                            <div className='content-title col-md-6'>
                                <h1 className='title-heald'>欢迎新生加入 <br />广药大家园</h1>
                                <div className='subtitle-box'>
                                    <h4>新生在此了解更为全面的广药， 和所有同学交流。</h4>
                                </div>
                                <div className='subtitle-box subtitle'>
                                    {/* <h4>在广药家园寻找熟悉的氛围</h4> */}
                                </div>
                                <Link to="/login" className='lists-problem lists-headle'><strong>立即登录</strong></Link>
                                <Link to="/introduce" className='lists-problem'><strong>学校介绍</strong></Link>
                                <Link to="forum" className='lists-problem'><strong>广药社区</strong></Link>
                            </div>
                            <div className="col-md-6">
                                <div className="home-show">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dna-testing-werpper'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>广药交流平台</strong></div>
                                <div className='dna-testing-right'></div>
                            </div>
                            <div className='dna-testing-text'>
                                师兄师姐都在这，有什么问题不知道的？有什么要分享的？在这畅快交流吧！
                            </div>
                            <div className='button-werpper'>
                                <Link to="/login" className='button-click button-blue'>立即登陆</Link>
                                <Link to="/forum" className='button-click button-red'>看看帖子</Link>
                                <Link to="/forum/new-post" className='button-click button-purple'>我要发帖</Link>
                            </div>

                        </div>
                    </div>
                    {/* <div className='health-conditions'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>了解广药</strong></div>
                                <div className='dna-testing-right'></div>
                            </div>
                            <div className='health-conditions-text'>
                                <div className='health-conditions-text-right'>
                                    <p className='health-conditions-text-right-title'>对于学校还有什么细节不知道的呢？</p>
                                    <p className='health-conditions-text-right-content'>学校、老师、专业、社团等等......更多学校的介绍信息等你挖掘！</p>
                                    <div className='button-introduce'>
                                        <a href="#" className='button-click button-blue'>立即登陆</a>
                                        <a href="#" className='button-click button-red'>看看介绍</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className='traitst'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>了解广药</strong></div>
                                <div className='dna-testing-right'></div>
                            </div>
                            <div className='health-conditions-text traitst-text'>
                                <div className='health-conditions-text-right traitst-text-left'>
                                    <p className='health-conditions-text-right-title traitst-text-left-title'>对于学校还有什么细节不知道的呢？</p>
                                    <p className='health-conditions-text-right-content traitst-text-left-content'>学校、老师、专业、社团等等......更多学校的介绍信息等你了解！
                                </p>
                                    <div className='buttom-button-traitst'>
                                        <a href="" className='buttom-button-traitst-left'>看看介绍</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className='col'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>介绍</strong></div>
                                <div className='col-right'>了解广东药科大学</div>
                            </div>
                            <div className='health-conditions-text traitst-text'>
                                <div className='health-conditions-text-right traitst-text-left col-text-left'>
                                    <p className='health-conditions-text-right-title traitst-text-left-title'>对于学校还有什么细节不知道的呢？</p>
                                    <p className='health-conditions-text-right-content traitst-text-left-content'>
                                        学校、老师、专业、社团等等......更多学校的介绍信息等你了解！    
                                    </p>
                                    <div className='buttom-button-traitst'>
                                        <Link to="/introduce" className='buttom-button-traitst-left'>看看介绍</Link>
                                    </div>
                                    <div className='col-position'>
                                        <div 
                                            className='col-position-top'
                                            id="introduce-show"
                                        >
                                        </div>
                                        <span className='col-podition-bottom'>大部分新生都还不了解学校的概况！</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='quality-assured'>
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
                    </div> */}

                    <div className='col'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>校内快讯</strong></div>
                                {/* <div className='quality-assured-title'>想快速了解学校的快讯吗？加入广药校园，及时知晓学校通知。</div> */}
                            </div>
                            <div className='health-conditions-text traitst-text'>
                                <div className='health-conditions-text-right traitst-text-left col-text-left'>
                                    <p className='health-conditions-text-right-title traitst-text-left-title'>想快速了解学校的快讯吗？加入广药校园，及时知晓学校通知。</p>
                                    {/* <p className='health-conditions-text-right-content traitst-text-left-content'>
                                        We offer large qualified breeders wholesale pricing. For information on our breeder bulk discounts, and to see how much you can save with our breeder program, please click below. We'll discuss pricing with your team and provide a unique coupon code.
                                </p> */}
                                    <div className='buttom-button-traitst'>
                                        <Link to="/surrounding" className='buttom-button-traitst-left special-button'>查看校内快讯</Link>
                                    </div>
                                    <div className='col-position special' id="new-show">
                                        {/* <p className='position-helder-title'>NEW BULK PRICING:</p>
                                        <p className='position-helder-list'>1 Kit = $179</p>
                                        <p className='position-helder-list'>2 - 4 Kits = $169 per kit</p>
                                        <p className='position-helder-list'>5 - 9 Kits = $159 per kit</p>
                                        <p className='position-helder-list'>10 - 19 Kits = $149 per kit</p>
                                        <p className='position-helder-list'>20+ =  Contact us</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='quality-assured research'>
                        <div className='container'>
                            <div className='dna-testing'>
                                <div className='dna-testing-left'><strong>吃喝玩乐</strong></div>
                                <div className='quality-assured-title'></div>
                            </div>
                            <div className='quality-assured-content'>
                                <div className='health-conditions-text traitst-text quality-assured-text'>
                                    <div className='health-conditions-text-right traitst-text-left quality-assured-left'>
                                        <p className='research-title'>查看周边分享信息</p>
                                        <p className='research-contern'>在这寻找分享的地方，你也可以在这里是分享吃喝玩乐，把你喜欢的地方分享出来。</p>
                                        <div className='quality-assured-bottom'>
                                            <div className='col-position-top' id="surrounding-show"></div>
                                            <span className='quality-assured-footer'>好的地方等你发现</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='active-research'>
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
                    </div> */}
                    <div className='health-conditions'>
                        <div className='container'>
                            <h1 className='active-research-title'>欢迎新生常驻于此，在这发现更好的校园生活。</h1>
                            <div className='health-conditions-text service-wrapper'>
                                <div className='health-conditions-text-right'>
                                    <p className='service'>
                                        <strong>欢迎对系统的功能提出issue</strong>
                                        <span>不定期修复bug，对需求进行优化。</span>
                                    </p>
                                    <p className='service'>
                                        <strong>可以协作</strong>
                                        <span>可以增加项目经验。</span>
                                    </p>
                                    <p className='service'>
                                        <strong>2014届计科医用答辩</strong>
                                        <span>暂结于2018年4月21日。</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='started'>
                        <div className='conditions'>
                            <div className='started-left'>
                                <p className='started-title'>
                                    从注册一个账号开始!
                                </p>
                                <p className='started-checked'>
                                    <strong>{'LIMITED-TIME INTRO '}</strong>
                                    <strong>{'PRICING ENDS SOON! '}</strong>
                                </p>
                                <span className='subtitle-started'>{'马上加入广药大家园，发现广药生活。'}</span>
                            </div>
                            <div className='started-right'>
                                <Link to="/register" className='started-right-button'>{'马上注册'}</Link>
                            </div>
                        </div>
                    </div>
                    {/* <footer>
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
                    </footer> */}
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
