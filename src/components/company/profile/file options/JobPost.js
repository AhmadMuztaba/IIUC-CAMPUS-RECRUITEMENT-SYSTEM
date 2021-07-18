import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createJobPost} from '../../../actions/company/index';
import AllJobPost from './AllJobPost';
import '../CSS/WriteBlog.css';
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
        this.textRef.current.style.height = "135px";
        this.setState({ value: '', titleValue: '',button:false });
       
    }
    render() {
        return (
            <div className="show-Dashboard">
                <input name="Title" className="ShowDashboard-input" autoComplete="off" required="true" placeholder="Title" value={this.state.titleValue} type="text" onChange={(e) => {
                    this.setState({ titleValue: e.target.value })
                }} />

                <div className="textAreaAndButtonWrapper">

                    <textarea required="true" onChange={
                        (e) => {
                            this.change(e)
                        }
                    }
                        autoFocus="off"
                        placeholder="Description about your job"
                        ref={this.textRef}
                        value={this.state.value}
                        className="TextArea" />
                          <div className="textarea-buttons">
                        <button type="submit"
                            style={{ display: 'none' }}
                            ref={(button) => this.button = button}
                            onClick={(e) => {
                                this.HandleSubmit(e)
                            }}>Upload</button>
                        <ion-icon name="refresh-outline" onClick={(e) => {
                            e.preventDefault();
                            this.textRef.current.style.height = "135px";
                            this.setState({ value: '', titleValue: '' })
                        }}>Reset</ion-icon>
                         <ion-icon name="cloud-upload-outline" style={this.state.button?null:{PointerEvent:'none'}} onClick={() => {
                            this.button.click();
                        }}></ion-icon>
                       </div>
                </div>
                <div>
                <AllJobPost/>
                </div>
            </div>
        );
    }
}
export default connect(null, {createJobPost})(JobPost);