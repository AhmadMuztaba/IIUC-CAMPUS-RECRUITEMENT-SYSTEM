import React, { Component } from 'react';
import {UploadCompanyProfilePic,CompanyOwnProfilePic } from '../../../actions/company/index'
import { connect } from 'react-redux'
class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: true,
            profilePic: null,
            showImage: null,
            selected:null,
            count:1,
        }
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.props.CompanyOwnProfilePic();
        if (this.props.profile) {
            let image=new Buffer.from(this.props.profile.pic.data).toString('base64');
            image='data:image/png;base64,'+image;
            this.setState({ showImage: image });
        }
        
    }
    fileUploadHandler = e => {
        this.setState({selected:e.target})
        this.setState({ profilePic: e.target.files[0] });
    }
    uploadFile = () => {
        this.setState({ button: false })
        const fd = new FormData();
        fd.append('profilePic', this.state.profilePic);
        this.props.UploadCompanyProfilePic(fd);
    }
    render() {
        if (this.props.profile) {
            let image=new Buffer.from(this.props.profile.pic.data).toString('base64');
            image='data:image/png;base64,'+image;
            return (<div>
               <img className="image" alt="profile pic" src={this.state.image||image}/>
            </div>)
        }
        else if (!this.props.profile) {
            return (<div>
                <input type="file" ref={fileInput=>this.fileInput=fileInput} style={{ display: 'none' }} required name="profilePic" onChange={this.fileUploadHandler} />
                <button onClick={() => { this.fileInput.click() }}>Select</button>
                {this.state.button? <button type="submit" onClick={this.uploadFile}>upload</button> : <button disabled>Uploading</button>}
                 {this.state.profilePic?<img alt="preview" src={this.state.selected}/>:null}
            </div>)
        }
        else {
            return (<div>Loading</div>)
        }
    }
}

const mapStateToProps = (state) => {
    return ({ profile: state.CompanyProfile.profilePic})
}

export default connect(mapStateToProps, {UploadCompanyProfilePic,CompanyOwnProfilePic})(Image);