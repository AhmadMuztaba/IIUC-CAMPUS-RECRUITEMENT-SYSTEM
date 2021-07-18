import React from 'react';
import './CSS/Dashboard.css'
import { connect } from 'react-redux';

import SideOption from './SideOption';
import ShowDashboard from './ShowDashboard'
class Dashbard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            hover: null,
        }
        this.optionRef = React.createRef();
    }
    onHandleClick = (value) => {
        this.setState({ selected: value });
    }
    onMouseEnter = (value) => {
        this.setState({ hover: value });
    }
    onMouseOut = (value) => {
        this.setState({ hover: null });
    }
    render() {
        const names = ["Profile", "Write Blog", "Show User Blog", "Alumni Blog", "Show Available Jobs"];
        return (<div className="Dashboard-grid">
            <div className="Dashboard-info" >
                {
                    names.map((name, index) => {
                        let color;
                        let hoverColor;
                        if (index === this.state.selected) {
                            color = true;
                            hoverColor = false;
                        }
                        else if (index === this.state.hover) {
                            hoverColor = true;
                        }
                        else {
                            color = false;
                            hoverColor = false;
                        }
                        return (<SideOption key={index} name={name} value={index} klik={this.onHandleClick} mouseIn={this.onMouseEnter} mouseOut={this.onMouseOut} color={color} hoverColor={hoverColor} />);
                    })
                }
            </div>
            <div>
                <ShowDashboard selected={this.state.selected} />
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return ({
        userProfile: state.UserProfile
    })
}
export default connect(mapStateToProps, {

})(Dashbard);