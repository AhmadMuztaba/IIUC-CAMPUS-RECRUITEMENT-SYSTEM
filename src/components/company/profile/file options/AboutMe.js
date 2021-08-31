import React from 'react';
import { connect } from 'react-redux';
import {CompanyOwnProfile} from '../../../actions/company/index';
import Loader from '../../../utility/Loader';
class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.sidelineRef = React.createRef();
        this.state = {
            height: 0,
        }
    }
    componentDidMount() {
        this.props.CompanyOwnProfile();
        if(this.sidelineRef.current){
            this.setState({ height: this.sidelineRef.current.clientHeight });
        }
    }
    render() {
        if(this.props.company.loading){
            return(<div>Loading</div>)
        }
        if(this.props.ownProfile.companyProfile&&!this.props.ownProfile.loading&&!this.props.company.loading){
        return (<div style={{display:'flex'}}>
<div className="AboutSection">
             <h1 className="AboutSection--heading">{this.props.company.company.name}</h1>
           <div className="AboutSection--me">
           <h3 className="AboutSection--heading-Tertiary">About Me</h3>
           <p className="AboutSection__aboutme">
           {this.props.ownProfile.companyProfile.companyProfile.About}
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
                      
                        {this.props.ownProfile.companyProfile.companyProfile.mission ? <div>Mission</div>: null}
                   {this.props.ownProfile.companyProfile.companyProfile.vision ? <div>vision</div> : null}
                  {this.props.ownProfile.companyProfile.companyProfile.currentEmployeeNumber ? <div>Employee Numbers</div> : null}
                 {this.props.ownProfile.companyProfile.companyProfile.website ?<div>Website</div>: null}
                    
                    </div>
               <div className="AboutSection__personalInfo--desc">
                        <div>
                        {this.props.company.company.name}
                        </div>
                        <div>
                            {this.props.ownProfile.companyProfile.companyProfile.established}
                        </div>
                        {this.props.ownProfile.companyProfile.companyProfile.mission ? <div>{this.props.ownProfile.companyProfile.companyProfile.mission}</div>: null}
                   {this.props.ownProfile.companyProfile.companyProfile.vision ? <div>{this.props.ownProfile.companyProfile.companyProfile.vision}</div> : null}
                  {this.props.ownProfile.companyProfile.companyProfile.currentEmployeeNumber ? <div>{this.props.ownProfile.companyProfile.companyProfile.currentEmployeeNumber}</div> : null}
                 {this.props.ownProfile.companyProfile.companyProfile.website ?<div>{this.props.ownProfile.companyProfile.companyProfile.website}</div>: null}
               </div>
               </div>
           </div>  
        <h3 className="AboutSection--heading-Tertiary">Contact</h3>
           <div className="contact__box">
               <div className="contact__box--icon">
               <ion-icon name="mail-open-outline"></ion-icon>
               </div>
               <div className="contact__box--email">
               {this.props.company.company.email}
               </div>
           </div>       
        </div>
        {/* <Social social={this.props.ownProfile.companyProfile.companyProfile.social} website={this.props.ownProfile.companyProfile.companyProfile.website }/> */}
        </div>
        )
    }
    else{
        return(<Loader/>)
    }
 }
}
const mapStateToProps = (state) => {
    return ({company:state.CompanyAuth,
        ownProfile: state.CompanyProfile })
}

export default connect(mapStateToProps, {
    CompanyOwnProfile
})(AboutMe)
