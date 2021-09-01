import { Component } from 'react';
import { connect } from 'react-redux';
import { githubRepo } from '../../../actions/user/index';
import { } from '../../../actions/Type';
class GetGithub extends Component {
    componentDidMount() {
        this.props.githubRepo();
    }
    render() {
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
    return({Repositories:state.UserProfile.GithubRepos});
}
export default connect(mapStateToProps,{githubRepo})(GetGithub);