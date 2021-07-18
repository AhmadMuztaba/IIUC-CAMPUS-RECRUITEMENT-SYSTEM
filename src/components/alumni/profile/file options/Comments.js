import React, { useEffect, useRef, useState } from 'react';
import {connect} from 'react-redux';
import {fetchUserBlogComments,CreateUserBlogCommentByAlumni} from '../../../actions/alumni/index';
import '../CSS/Comments.css'
const Comments = (props) => {
     useEffect(()=>{
       props.fetchUserBlogComments(props.params);
      
     },[]);

     const HandleChange=()=>{
        ref.current.style.height = "55px";
         ref.current.style.height=ref.current.scrollHeight+'px';
     }
    const[state,setState]=useState({comment:''})
    const ref=useRef();
    return (<div>
   <div className="userBlog-comment">
           <form onSubmit={(e)=>{
               e.preventDefault();
               props.CreateUserBlogCommentByAlumni(props.params,state.comment);
               setState({comment:''});
           }}>
               <textarea className="TextAreaComment" ref={ref} onChange={(e)=>{
                   HandleChange();
                   e.preventDefault();
                  setState({comment:e.target.value})
               }} value={state.comment} name="comment"/>
               <button className="UserBlogcomment-button"type="submit">comment</button>
           </form>
        </div>
        <div className="All-comments">
            {props.comment.length<=0?(<div>No comments found</div>):(props.comment.map((comment)=>{
                 return(<div className="EachComment">
                     <ul>
                         <li>
                         <ion-icon name="person-circle-outline"></ion-icon>
                         </li>
                         <li>
                         <h4>
                         {comment.alumniCommentMaker?comment.alumniCommentMaker.name:comment.userCommentMaker.name}
                         </h4>
                         </li>
                     </ul>   
                     <div>
                         {comment.comment}
                     </div>
                     </div>)
            }))}
        </div>
    </div>
    );
};
const mapStateToProps=(state)=>{
    return({comment:Object.values(state.Blogs.UserBlogComments)})
}

export default connect(mapStateToProps,{fetchUserBlogComments,CreateUserBlogCommentByAlumni})(Comments);