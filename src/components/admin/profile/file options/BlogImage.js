import React, { Component } from 'react';
import '../CSS/ShowUserBlogById.css';
class BlogImage extends Component {
    render() {
        if(this.props.value.image){
            let image=new Buffer.from(this.props.value.image.data).toString('base64');
            image=`data:image/jpg;base64,${image}`;
            return (
                    <img className="ShowUserBlogById-BlogImage" alt="Blog " src={image}/>
            );
        }else{
            return(<div className="ShowUserBlogById-BlogImage loadingImage">Loading Image...</div>);
        }
      
    }
}

export default BlogImage;