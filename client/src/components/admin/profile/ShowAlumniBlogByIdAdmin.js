import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import {fetchAllAlumniBlogsByAdmin,deleteAlumniBlogById} from '../../actions/admin/index';
import BlogImage from './file options/BlogImage';
import AlumniBlogComments from './file options/AlumniBlogComments';
import './CSS/ShowUserBlogById.css';
import history from '../../History/index';
class ShowAlumniBlogByIdAdmin extends Component {
    state={show:false,comments:false}
    componentDidMount() {
        this.props.fetchAllAlumniBlogsByAdmin(this.props.match.params.blogId);
    }
    componentDidUpdate() {
        if (!this.props.blog) {
            this.props.fetchAllAlumniBlogsByAdmin(this.props.match.params.blogId);
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
                                   this.props.deleteAlumniBlogById(this.props.blog._id);
                                   history.push("/admin/showProfile")
                                }
                            }
                            >
                        <button>Delete</button>
                        </div>
                        
                    </div>
                  {!this.state.comments?(  <div className="ShowUserBlogById-info">
                        <div className="ShowUserBlogById-title">
                            <h1>{this.props.blog.title}</h1>
                        </div>
                        <div className="ShowUserBlogById-image">
                            <BlogImage value={this.props.blog} />
                        </div>
                        <div className="ShowUserBlogById-description">
                            <p>{this.props.blog.description}</p>
                        </div>

                    </div>):<div><AlumniBlogComments params={this.props.match.params.blogId}/></div>}
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
    return ({ blog: state.Blogs.AlumniBlogs[ownProps.match.params.blogId] });
}
export default connect(mapStateToProps, { fetchAllAlumniBlogsByAdmin,deleteAlumniBlogById})(ShowAlumniBlogByIdAdmin);