import React, { Component } from 'react';
import '../CSS/ShowUserBlog.css'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchUserBlogs} from '../../../actions/alumni/index';

class ShowUserBlog extends Component {
    constructor(props){
        super(props);
        this.state={show:true,page:0,position:document.body.scrollTop};
        this.userblog=React.createRef();
    }
    componentDidMount() {
        this.props.fetchUserBlogs(this.state.page);
    }

    roll=()=>{
         if(this.userblog.current.scrollHeight-this.userblog.current.scrollTop===this.userblog.current.clientHeight){
            this.setState({page:this.state.page+1});
            this.props.fetchUserBlogs(this.state.page);
        }
    }
    render() {
        if (this.props.Blogs){
           return(<div onScroll={this.roll}  ref={this.userblog} className="ShowUserBlog">{
            this.props.Blogs?this.props.Blogs.map((blog)=>{
                return(<Link to={`/alumni/userBlog/show/${blog._id}`}><div className="ShowUserBlog-EachBlog">
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
    return { Blogs:Object.values(state.Blogs.Userblogs)};
}

export default connect(mapStateToProps, { fetchUserBlogs })(ShowUserBlog);