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
        if(!this.props.profile.loading&&this.props.profile.alumniProfile.githubusername){
            return null
        }
        return (
            <div className="utility__flex">
                <form onSubmit={this.onHandleSubmit}>
                    <label>Github User Name</label>
                    <input type="text" className="education_input" name="githubusername" value={this.state.value} required={true} onChange={(e) => {
                        this.setState({ value: e.target.value });
                    }} />
                    <div className="AboutSection__btn">
        {
        this.state.button?<button type="submit" className="AboutSection__btn--add">Add</button> : <button disabled className="createProfile__btn--add">Submitting</button>
        }
        </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return({profile:state.AlumniProfile})
}
export default connect(mapStateToProps, { CreateAlumniProfile })(PostGitHub);