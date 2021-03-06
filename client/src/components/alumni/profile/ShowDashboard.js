import React from 'react';
import AboutMe from './file options/AboutMe';
import WriteBlog from './file options/WriteBlog';
import ShowUserBlog from './file options/ShowUserBlog';
import ShowAlumniBlog from './file options/ShowAlumniBlog';
import SearchUser from './file options/SearchUser'; 
import EditProfile from './EditProfile';
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
            return (<WriteBlog/>);
        }
        else if (this.props.selected === 2) {
            return (<ShowUserBlog/>);
        }
        else if (this.props.selected === 3) {
            return (<ShowAlumniBlog/>);
        }
        else if (this.props.selected === 4) {
            return (<SearchUser/>);
        }
        else if(this.props.selected===5){
            return (<EditProfile/>)
        }
        else if(this.props.selected===6){
            return 'Logging Out...';
        }
    }
}
export default ShowDashboard