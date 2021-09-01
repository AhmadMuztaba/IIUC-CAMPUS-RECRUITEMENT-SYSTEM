import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect} from 'react-router-dom';
import {fetchAllUserBlogsByAdmin,deleteUserBlogById} from '../../actions/admin/index';
import BlogImage from './file options/BlogImage';
import history from '../../History/index';
import './CSS/ShowUserBlogById.css';
class ShowUserBlogByIdAdmin extends Component {
    state={show:false,comments:false}
    componentDidMount() {
        this.props.fetchAllUserBlogsByAdmin(this.props.match.params.blogId);
    }
    componentDidUpdate() {
        if (!this.props.blog) {
            this.props.fetchAllUserBlogsByAdmin(this.props.match.params.blogId);
        }
    }
    render() {
        if (this.props.blog) {
            return (<>
                <div className="ShowUserBlogById">
                    <div className="ShowUserBlogById-home">
                        <Link to="/admin/showProfile"><h1>#HOME</h1></Link>
                        <div className="ShowUserBlogById-comment-icon" onMouseEnter={()=>{
                        this.setState({show:true})
                        }} onMouseLeave={()=>{
                            this.setState({show:false})
                            }}
                            onClick={
                                ()=>{
                                   this.props.deleteUserBlogById(this.props.blog._id);
                                   history.push("/admin/showProfile")
                                }
                            }
                            >
                        <button>Delete</button>
                        </div>
                        
                    </div>
                    <div className="ShowUserBlogById-info">
                        <div className="ShowUserBlogById-title">
                            <h1>{this.props.blog.title}</h1>
                        </div>
                        <div className="ShowUserBlogById-image">
                            <BlogImage value={this.props.blog} />
                        </div>
                        <div className="ShowUserBlogById-description">
                            <p>{this.props.blog.description}</p>
                        </div>

                    </div>
                </div>
                </>
            );
        }
        else {
            return (<div>Loading</div>)
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return ({ blog: state.Blogs.Userblogs[ownProps.match.params.blogId] });
}
export default connect(mapStateToProps, {fetchAllUserBlogsByAdmin,deleteUserBlogById})(ShowUserBlogByIdAdmin);