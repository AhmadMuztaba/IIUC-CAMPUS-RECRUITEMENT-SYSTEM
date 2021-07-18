import { Component } from 'react';
import { connect } from 'react-redux';
import {CreateAlumniProfile} from '../../../actions/alumni/index';

class PostGitHub extends Component {
    state = {
        value: '',
        button: true,
    }
    onHandleSubmit = (e) => {
        e.preventDefault();
        this.setState({ button: false })
        this.props.CreateAlumniProfile({ githubusername: this.state.value })
    }
    render() {
        if(!this.props.profile.loading&&this.props.profile.alumniProfile.alumniProfile.githubusername){
            return null
        }
        return (
            <div>
                <form onSubmit={this.onHandleSubmit}>
                    <input type="text" name="githubusername" value={this.state.value} required={true} onChange={(e) => {
                        this.setState({ value: e.target.value });
                    }} />
                    {
                        this.state.button ? <button type="submit">Add</button> : <button disabled >Submitting</button>
                    }
                </form>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return({profile:state.AlumniProfile})
}
export default connect(mapStateToProps, { CreateAlumniProfile })(PostGitHub);