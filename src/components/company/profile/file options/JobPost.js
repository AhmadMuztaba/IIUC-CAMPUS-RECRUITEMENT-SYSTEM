import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createJobPost} from '../../../actions/company/index';
import AllJobPost from './AllJobPost';
import '../CSS/PostJob.scss';
class JobPost extends Component {
    constructor(props) {
        super(props);
        this.state = { height: 185, value: '', fileValue: null, titleValue: '', fileName: '',button:true };
        this.textRef = React.createRef();
    }

    change = (e) => {
        this.setState({ value: e.target.value });
        this.textRef.current.style.height = "135px";
        this.textRef.current.style.height = `${this.textRef.current.scrollHeight}px`;
    }
    HandleSubmit = (e) => {
        e.preventDefault();
        let data={
            title:this.state.titleValue,
            description:this.state.value
        }
       this.props.createJobPost(data);
        this.textRef.current.style.height = "13.5rem";
        this.setState({ value: '', titleValue: '',button:false });   
    }
    render() {
        return (
            <>
            <div className="AboutSection">
                <div className="writeblog__flex">
                <input name="Title" className="showDashboard-input" autoComplete="off" required={true} placeholder="Title" value={this.state.titleValue} type="text" onChange={(e) => {
                    this.setState({ titleValue: e.target.value })
                }} />

                <div className="textAreaAndButtonWrappers">
                    <textarea  onChange={
                        (e) => {
                            this.change(e)
                        }
                    }
                        autoFocus="off"
                        placeholder="Description about your job"
                        ref={this.textRef}
                        value={this.state.value}
                        className="textArea"
                         />
                          <div className="textarea-buttons">
                        <button className="JobPost--upload" disabled={!this.state.value||!this.state.titleValue?true:false}
                            onClick={(e) => {
                                this.HandleSubmit(e)
                            }}>Upload</button>
                        <button className="JobPost--reset"  onClick={(e) => {
                            e.preventDefault();
                            this.textRef.current.style.height = "13.5rem";
                            this.setState({ value: '', titleValue: '' })
                        }}>Reset</button>
                       </div>
                </div> 
                </div>
            </div>
            <AllJobPost/>
            </>
        );
    }
}
export default connect(null, {createJobPost})(JobPost);