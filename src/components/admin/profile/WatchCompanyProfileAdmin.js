import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link,Redirect } from 'react-router-dom';
import {CompanyProfileWatchAdmin,deleteCompany} from '../../actions/admin/index';
import history from '../../History/index';
class WatchCompanyProfileAdmin extends Component {
    constructor(props) {
        super(props);
        this.sidelineRef = React.createRef();
        this.state = {
            height: 0,
        }
    }
    componentDidMount() {
        this.props.CompanyProfileWatchAdmin(this.props.match.params.userid);
        if(this.sidelineRef.current){
            this.setState({ height: this.sidelineRef.current.clientHeight });
        }
    }
    render() {
        if(this.props.companyProfile){
            let img=new Buffer.from(this.props.companyProfile.logo.data).toString('base64');
            img=`data:image/png;base64,`+img;
        return (<div className="show-Dashboard">
            <div>
                <Link to="/admin/showprofile">Home</Link>
                <button onClick={()=>{
                    this.props.deleteCompany(this.props.companyProfile.company._id);
                    history.push('/admin/showprofile');
                }}>Delete</button>
            </div>
            <div>
           <img src={img} alt="logo"/>
            </div>
            <h1>
                {this.props.companyProfile.company.name}
            </h1>
            <h2>
                {this.props.companyProfile.established}
            </h2>
            <h3>
                About Me
             </h3>
            <div className="quote_1">
                “
             </div>
            <p className="AboutMe">
                {this.props.companyProfile.About}
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
                        <h4>{this.props.companyProfile.company.name}</h4>
                    </li>
                    <li>
                    <h4>{this.props.companyProfile.established}</h4>
                    </li>
                </div>
            </div>
            <h3>
                Contact
        </h3>
            <div className="email-info">
                <div className="cent">
                    <ion-icon name="mail-open-outline" class="contact-icon"></ion-icon>
                    <p> {this.props.companyProfile.company.email}</p>
                </div>
            </div>              
            <h3>
                Professional info
            </h3>
            <div className="professional-info" >
                <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center', marginBottom: '80px' }}>
                    <ul ref={this.sidelineRef}>
                        {this.props.companyProfile.mission ? <li><h4>Mission</h4></li> : null}
                        {this.props.companyProfile.vision ? <li><h4>Vision</h4></li> : null}
                        {this.props.companyProfile.currentEmployeeNumber ? <li><h4>Current Employee Number</h4></li> : null}
                        {this.props.companyProfile.website ? <li><h4>Website</h4></li> : null}
                    </ul>
                </div>
                <div>
                    <ul>
                    {this.props.companyProfile.mission ? <li><h4>{this.props.companyProfile.mission}</h4></li> : null}
                    {this.props.companyProfile.vision ? <li><h4>{this.props.companyProfile.vision}</h4></li> : null}
                    {this.props.companyProfile.currentEmployeeNumber ? <li><h4>{this.props.companyProfile.currentEmployeeNumber}</h4></li> : null}
                    {this.props.companyProfile.website ? <li><h4>{this.props.companyProfile.website}</h4></li> : null}
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

const mapStateToProps=(state,ownProps)=>{
    if(state.AdminProfile.companyProfile===undefined){
        return({companyProfile:[],
            error:[]})
    }
    return({
        companyProfile:state.AdminProfile.companyProfile[ownProps.match.params.userid]
    })
}
export default connect(mapStateToProps,{CompanyProfileWatchAdmin,deleteCompany})(WatchCompanyProfileAdmin);