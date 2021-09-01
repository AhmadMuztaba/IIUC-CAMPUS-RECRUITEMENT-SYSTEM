import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateUserBlog } from '../../../actions/user/index';
import '../CSS/WriteBlog.scss';
class WriteBlog extends Component {
    constructor(props) {
        super(props);
        this.state = { height: 185, value: '', fileValue: null, titleValue: '', fileName: '', button: true };
        this.textRef = React.createRef();
    }

    change = (e) => {
        this.setState({ value: e.target.value });
        this.textRef.current.style.height = "13.5rem";
        this.textRef.current.style.height = `${this.textRef.current.scrollHeight}px`;
    }
    HandleSubmit = (e) => {
        e.preventDefault();
        let fd = new FormData();
        fd.append('blogPic', this.state.fileValue);
        fd.append('title', this.state.titleValue);
        fd.append('description', this.state.value);
        this.textRef.current.style.height = "13.5rem";
        this.setState({ value: '', titleValue: '', fileValue: null, fileName: '', button: false })
        this.props.CreateUserBlog(fd);
    }
    render() {
        return (
            <div className="AboutSection">
                <div className="writeblog__flex">
                    <input name="Title" className="showDashboard-input" placeholder="Title" value={this.state.titleValue} type="text" onChange={(e) => {
                        this.setState({ titleValue: e.target.value })
                    }} />

                    <div className="textAreaAndButtonWrappers">
                        <textarea onChange={
                            (e) => {
                                this.change(e)
                            }
                        }
                            autoFocus="off"
                            placeholder="write your mind"
                            ref={this.textRef}
                            value={this.state.value}
                            // style={{ height: `${this.height}px` }}
                            className="textArea" />

                        <input type="file" style={{ display: 'none' }} ref={(file) => this.file = file} name="file" onChange={(e) => {
                            this.setState({ fileValue: e.target.files[0], fileName: e.target.files[0].name })
                        }} />

                        <div className="Textarea-buttons">

                            <ion-icon name="image-outline" onClick={(e) => {
                                e.preventDefault();
                                this.file.click();
                            }}></ion-icon>

                            <button type="submit"
                                style={{ display: 'none' }}
                                ref={(button) => this.button = button}
                                onClick={(e) => {
                                    this.HandleSubmit(e)
                                }}>Upload</button>

                            {this.state.fileName ? <div>{this.state.fileName}</div> : null}

                            <ion-icon name="refresh-outline" onClick={(e) => {
                                e.preventDefault();
                                this.textRef.current.style.height = "135px";
                                this.setState({ value: '', titleValue: '' })
                            }}>Reset</ion-icon>
                            <ion-icon name="cloud-upload-outline" style={this.state.button ? null : { PointerEvent: 'none' }} onClick={() => {
                                this.button.click();
                            }}></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(null, { CreateUserBlog })(WriteBlog);