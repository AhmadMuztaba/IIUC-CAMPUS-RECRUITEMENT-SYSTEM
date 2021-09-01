import React, { Component } from 'react';
import '../CSS/ShowUserBlog.css'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchAllUserBlogsByAdmin} from '../../../actions/admin/index';

class ShowUserBlog extends Component {
    constructor(props){
        super(props);
        this.state={show:true,page:0,position:document.body.scrollTop};
        this.userblog=React.createRef();
    }
    componentDidMount() {
        this.props.fetchAllUserBlogsByAdmin(this.state.page);
    }

    roll=()=>{
         if(this.userblog.current.scrollHeight-this.userblog.current.scrollTop===this.userblog.current.clientHeight){
            this.setState({page:this.state.page+1});
            this.props.fetchAllUserBlogsByAdmin(this.state.page);
        }
    }
    render() {
        if (this.props.Blogs){
           return(<div onScroll={this.roll}  ref={this.userblog} className="ShowUserBlog">{
            this.props.Blogs?this.props.Blogs.map((blog)=>{
                return(<Link to={`/admin/userBlog/${blog._id}`}><div className="ShowUserBlog-EachBlog">
                    <h4>
                        {blog.title}
                    </h4>
                    <p>{blog.description.substring(0,50)}...</p>
                    <p>Written by <span style={{
                        fontSize:'100%',
                        color:'#865858'}}>{blog.Author.name}</span></p>
                </div></Link>)
            }):<div>Loading</div>
           }
           </div>);
        }
        else{
            return(<div>Loading</div>)
        }
    }
}
const mapStateToProps = (state) => {
    if(state.Blogs.Userblogs===undefined){
        return {Blogs:[]}
    }
    return { Blogs:Object.values(state.Blogs.Userblogs)};
}

export default connect(mapStateToProps, {fetchAllUserBlogsByAdmin})(ShowUserBlog);