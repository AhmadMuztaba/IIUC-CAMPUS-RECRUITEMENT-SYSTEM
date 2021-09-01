import React from 'react';
import ShowUserBlog from './file options/ShowUserBlog';
import ShowAlumniBlog from './file options/ShowAlumniBlog';
import ShowTemporaryAlumni from './file options/ShowTemporaryAlumni';
import ShowTemporaryCompany from './file options/ShowTemporaryCompany';
import SearchUser from './file options/SearchUser';
import JobPost from './file options/JobPost';
import SearchAlumni from './file options/SearchAlumni';
import searchCompany from './file options/SearchCompany';
import SearchCompany from './file options/SearchCompany';
class ShowDashboard extends React.Component {
    render() {
        if (!this.props.selected) {
            return (<>
             <ShowTemporaryCompany/>
            </>);
        }
        else if (this.props.selected === 0) {
            return (<ShowTemporaryCompany/>);
        }
        else if (this.props.selected === 1) {
            return (<ShowTemporaryCompany/>);
        }
        else if (this.props.selected === 2) {
            return (<ShowTemporaryAlumni/>);
        }
        else if (this.props.selected === 3) {
            return (<ShowUserBlog/>);
        }
        else if (this.props.selected === 4) {
            return (<ShowAlumniBlog/>);
        }
        else if (this.props.selected === 5) {
            return(<JobPost/>);
        }
        else if(this.props.selected===6){
            return(<SearchUser/>)
        }
        else if(this.props.selected===7){
            return(<SearchAlumni/>)
        }
        else if(this.props.selected===8){
            return(<SearchCompany/>)
        }
    }
}
export default ShowDashboard