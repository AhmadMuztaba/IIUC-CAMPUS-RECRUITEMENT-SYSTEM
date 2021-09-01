import { Component } from 'react';
import { connect } from 'react-redux';
import {watchUsergithubrating} from '../../../actions/admin/index';
class WatchUserGithub extends Component {
    componentDidMount() {
        this.props.watchUsergithubrating(this.props.id);
    }
    render() {
        if(!this.props.Repositories){
            return <div>Loading</div>
        }
        if (this.props.Repositories.length < 1) {
            return (<div>No repos found</div>)
        }
        return (<div className="repo">
            <ul>
            {
                this.props.Repositories.map((rep,index)=>{
                    return(<li key={index}><a href={rep.html_url} style={{fontWeight:700}}>{rep.name}</a></li>);
                })
         }
         </ul>
                    </div>)
                }
}
const mapStateToProps=(state)=>{
    return({Repositories:state.AdminProfile.GithubRepos});
}
export default connect(mapStateToProps,{watchUsergithubrating})(WatchUserGithub);