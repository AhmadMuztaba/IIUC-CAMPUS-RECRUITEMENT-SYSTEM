import React from 'react';
import AboutMe from './file options/AboutMe';
import SearchUser from './file options/SearchUser'; 
import JobPost from './file options/JobPost';
class ShowDashboard extends React.Component {
    render() {
        if (!this.props.selected) {
            return (<>
              <AboutMe/>
            </>);
        }
        else if (this.props.selected === 0) {
            return (<AboutMe />);
        }
        else if (this.props.selected === 1) {
            return (<JobPost/>);
        }
        else if (this.props.selected === 2) {
            return (<SearchUser/>);
        }
    }
}
export default ShowDashboard