import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Social from './file options/Social';
import {UserWatchCompanyProfile} from '../../actions/user/index'
import Loader from '../../utility/Loader';
class WatchCompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.sidelineRef = React.createRef();
        this.state = {
            height: 0,
        }
    }
    componentDidMount() {
        this.props.UserWatchCompanyProfile(this.props.match.params.userid);
        if(this.sidelineRef.current){
            this.setState({ height: this.sidelineRef.current.clientHeight });
        }
    }
    render() {  
        if(this.props.companyProfile){
            let img=new Buffer.from(this.props.companyProfile.logo.data).toString('base64');
            img=`data:image/png;base64,`+img;
            return (<div className="watchUser">
                 <Link to="/user/showProfile">#HOME</Link>
                    {this.props.companyProfile.logo ? <div><img className="watchUser__image" src={img} /></div> : null}
            <div className="AboutSection" style={{marginLeft:0}}>
                         <h1 className="AboutSection--heading">{this.props.companyProfile.company.name}</h1>
                       <div className="AboutSection--me">
                       <h3 className="AboutSection--heading-Tertiary">About Company</h3>
                       <p className="AboutSection__aboutme">
                       {this.props.companyProfile.About}
                       </p>
                       </div>
                        <div className="AboutSection__personalInfo">
                       <h3 className="AboutSection--heading-Tertiary">Persononal Info</h3>
                           <div className="AboutSection__personalInfo--info">
                                <div className="AboutSection__personalInfo--name">
                                    <div>
                                        Name
                                    </div>
                                    <div>
                                       Established
                                    </div>
                                  
                                    {this.props.companyProfile.mission ? <div>Mission</div>: null}
                               {this.props.companyProfile.vision ? <div>vision</div> : null}
                              {this.props.companyProfile.currentEmployeeNumber ? <div>Employee Numbers</div> : null}
                             {this.props.companyProfile.website ?<div>Website</div>: null}
                                
                                </div>
                           <div className="AboutSection__personalInfo--desc">
                                    <div>
                                    {this.props.companyProfile.company.name}
                                    </div>
                                    <div>
                                        {this.props.companyProfile.established}
                                    </div>
                                    {this.props.companyProfile.mission ? <div>{this.props.companyProfile.mission}</div>: null}
                               {this.props.companyProfile.vision ? <div>{this.props.companyProfile.vision}</div> : null}
                              {this.props.companyProfile.currentEmployeeNumber ? <div>{this.props.companyProfile.currentEmployeeNumber}</div> : null}
                             {this.props.companyProfile.website ?<div>{this.props.companyProfile.website}</div>: null}
                           </div>
                           </div>
                       </div>  
                    <h3 className="AboutSection--heading-Tertiary">Contact</h3>
                       <div className="contact__box">
                           <div className="contact__box--icon">
                           <ion-icon name="mail-open-outline"></ion-icon>
                           </div>
                           <div className="contact__box--email">
                           {this.props.companyProfile.company.email}
                           </div>
                       </div>       
                    </div>
                    {/* <Social social={this.props.companyProfile.social} website={this.props.companyProfile.website }/> */}
                    </div>)}
    else{
        return(<Loader/>)
    }
}
}

const mapStateToProps=(state,ownProps)=>{
    return({
        companyProfile:state.UserProfile.company[ownProps.match.params.userid]
    })
}
export default connect(mapStateToProps,{UserWatchCompanyProfile})(WatchCompanyProfile);