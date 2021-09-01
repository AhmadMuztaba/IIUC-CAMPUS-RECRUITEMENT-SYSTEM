import React, { Component } from 'react';
import '../CSS/ShowBlog.scss'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchAlumniBlogs } from '../../../actions/user/index';

class ShowAlumniBlog extends Component {
    constructor(props){
        super(props);
        this.state={show:true,page:0,position:document.body.scrollTop};
        this.userblog=React.createRef();
    }
    componentDidMount() {
        this.props.fetchAlumniBlogs(this.state.page);
    }

    roll=()=>{
         if(this.userblog.current.scrollHeight-this.userblog.current.scrollTop===this.userblog.current.clientHeight){
            this.setState({page:this.state.page+1});
            this.props.fetchUserBlogs(this.state.page);
        }
    }
    render() {
        if (this.props.Blogs){
           return(<div onScroll={this.roll}  ref={this.userblog} className="alumniBlog">{
            this.props.Blogs?this.props.Blogs.map((blog,index)=>{
                return(<Link key={index} to={`/AlumniBlog/show/${blog._id}`}><div className="alumniBlog__EachBlog">
                    <h4>
                        {blog.title}
                    </h4>
                    <p>{blog.description.substring(0,50)}...</p>
                <p>Written by <Link to={`/user/Alumniprofile/watch/${blog.Author._id}`}><span style={{
                        fontSize:'100%',
                        color:'#865858'}}>{blog.Author.name}</span>
                        </Link>
                        </p>
                        
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
    return { Blogs:Object.values(state.Blogs.AlumniBlogs)};
}

export default connect(mapStateToProps, { fetchAlumniBlogs })(ShowAlumniBlog);