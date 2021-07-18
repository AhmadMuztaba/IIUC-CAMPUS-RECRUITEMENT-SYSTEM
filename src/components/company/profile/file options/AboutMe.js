import React from 'react';
import '../CSS/AboutMe.css';
import { connect } from 'react-redux';
import {CompanyOwnProfile} from '../../../actions/company/index';

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
        if(this.props.ownProfile.companyProfile&&!this.props.ownProfile.loading&&!this.props.company.loading){
        return (<div className="show-Dashboard">
            <h1>
                {this.props.company.company.name}
            </h1>
            <h2>
                {this.props.ownProfile.companyProfile.companyProfile.established}
            </h2>
            <h3>
                About Me
             </h3>
            <div className="quote_1">
                “
             </div>
            <p className="AboutMe">
                {this.props.ownProfile.companyProfile.companyProfile.About}
            </p>
            <div className="quote_2">
                ”
            </div>
            <div className="line">
            </div>
            <h3>
                Personal Info
            </h3>
            <div className="personal-info">
                <div>
                    <ul>
                        <li>
                            <h4>Name</h4>
                        </li>
                        <li>
                            <h4>Established</h4>
                        </li>
                    </ul>
                   
                </div>
                <div>
                    <li>
                        <h4>{this.props.company.company.name}</h4>
                    </li>
                    <li>
                    <h4>{this.props.ownProfile.companyProfile.companyProfile.established}</h4>
                    </li>
                </div>
            </div>
            <h3>
                Contact
        </h3>
            <div className="email-info">
                <div className="cent">
                    <ion-icon name="mail-open-outline" class="contact-icon"></ion-icon>
                    <p> {this.props.company.company.email}</p>
                </div>
            </div>              
            <h3>
                Professional info
            </h3>
            <div className="professional-info" >
                <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center', marginBottom: '80px' }}>
                    <ul ref={this.sidelineRef}>
                        {this.props.ownProfile.companyProfile.companyProfile.mission ? <li><h4>Mission</h4></li> : null}
                        {this.props.ownProfile.companyProfile.companyProfile.vision ? <li><h4>Vision</h4></li> : null}
                        {this.props.ownProfile.companyProfile.companyProfile.currentEmployeeNumber ? <li><h4>Current Employee Number</h4></li> : null}
                        {this.props.ownProfile.companyProfile.companyProfile.website ? <li><h4>Website</h4></li> : null}
                    </ul>
                </div>
                <div>
                    <ul>
                    {this.props.ownProfile.companyProfile.companyProfile.mission ? <li><h4>{this.props.ownProfile.companyProfile.companyProfile.mission}</h4></li> : null}
                    {this.props.ownProfile.companyProfile.companyProfile.vision ? <li><h4>{this.props.ownProfile.companyProfile.companyProfile.vision}</h4></li> : null}
                    {this.props.ownProfile.companyProfile.companyProfile.currentEmployeeNumber ? <li><h4>{this.props.ownProfile.companyProfile.companyProfile.currentEmployeeNumber}</h4></li> : null}
                    {this.props.ownProfile.companyProfile.companyProfile.website ? <li><h4>{this.props.ownProfile.companyProfile.companyProfile.website}</h4></li> : null}
                    </ul>
                </div>
            </div>     
        </div>)
    }
    else{
        return(<div>Loading</div>)
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
