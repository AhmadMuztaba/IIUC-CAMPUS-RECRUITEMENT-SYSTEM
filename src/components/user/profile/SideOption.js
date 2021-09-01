import React from 'react';
import {connect} from 'react-redux';
import {UserSignOut} from '../../actions/user/index';
import './CSS/AboutMe.css';
class SideOption extends React.Component{
    render(){
        const hoverColor=this.props.hoverColor?"Side-Option-hover-color":null;
        const ClickedColor=this.props.color?"Side-Option-selected-color":null;

if(this.props.name==="About Me"){
    return(<div onClick={()=>{
        this.props.klik(this.props.value);
      }}
      onMouseEnter={
          ()=>{
              this.props.mouseIn(this.props.value);
          }
      }
      onMouseLeave={
          ()=>{
              this.props.mouseOut(this.props.value);
          }
      }
      
      className={`slidebar__option--each ${hoverColor} ${ClickedColor}`}
      >
          <div className="slidebar__option--each-icon">
          <ion-icon name="person-outline"></ion-icon>
          </div>
          <div className="slidebar__option--each-name">
          {this.props.name}
          </div>
      </div>);
  }
else if(this.props.name==="Write Blog"){
    return(<div onClick={()=>{
        this.props.klik(this.props.value);
      }}
      onMouseEnter={
          ()=>{
              this.props.mouseIn(this.props.value);
          }
      }
      onMouseLeave={
          ()=>{
              this.props.mouseOut(this.props.value);
          }
      }
      
      className={`slidebar__option--each ${hoverColor} ${ClickedColor}`}
      >
          <div className="slidebar__option--each-icon">
          <ion-icon name="pencil-outline"></ion-icon>
          </div>
          <div className="slidebar__option--each-name">
          {this.props.name}
          </div>
      </div>);
  }

  else if(this.props.name==="Show User Blog"){
    return(<div  onClick={()=>{
        this.props.klik(this.props.value);
      }}
      onMouseEnter={
          ()=>{
              this.props.mouseIn(this.props.value);
          }
      }
      onMouseLeave={
          ()=>{
              this.props.mouseOut(this.props.value);
          }
      }
      
      className={`slidebar__option--each ${hoverColor} ${ClickedColor}`}
      >
          <div className="slidebar__option--each-icon">
          <ion-icon name="reader-outline"></ion-icon>
          </div>
         <div className="slidebar__option--each-name">
         {this.props.name}
         </div>
          
      </div>);
  }

  else if(this.props.name==="Alumni Blog"){
    return(<div onClick={()=>{
        this.props.klik(this.props.value);
      }}
      onMouseEnter={
          ()=>{
              this.props.mouseIn(this.props.value);
          }
      }
      onMouseLeave={
          ()=>{
              this.props.mouseOut(this.props.value);
          }
      }
      
      className={`slidebar__option--each ${hoverColor} ${ClickedColor}`}
      >
          <div className="slidebar__option--each-icon">
          <ion-icon name="receipt-outline"></ion-icon>
          </div>
         <div className="slidebar__option--each-name">
         {this.props.name}
         </div>
          
      </div>);
  }

  else if(this.props.name==="Show Available Jobs"){
    return(<div onClick={()=>{
        this.props.klik(this.props.value);
      }}
      onMouseEnter={
          ()=>{
              this.props.mouseIn(this.props.value);
          }
      }
      onMouseLeave={
          ()=>{
              this.props.mouseOut(this.props.value);
          }
      }
      
      className={`slidebar__option--each ${hoverColor} ${ClickedColor}`}
      >
          <div className="slidebar__option--each-icon">
          <ion-icon name="search-outline"></ion-icon>
          </div>
          <div className="slidebar__option--each-name">
          {this.props.name}
          </div>
      </div>);
  }

  else if(this.props.name==="Edit Profile"){
    return(<div onClick={()=>{
        this.props.klik(this.props.value);
      }}
      onMouseEnter={
          ()=>{
              this.props.mouseIn(this.props.value);
          }
      }
      onMouseLeave={
          ()=>{
              this.props.mouseOut(this.props.value);
          }
      }
      
      className={`slidebar__option--each ${hoverColor} ${ClickedColor}`}
      >
          <div className="slidebar__option--each-icon">
          <ion-icon name="create-outline"></ion-icon>
          </div>
          <div className="slidebar__option--each-name">
          {this.props.name}
          </div>
      </div>);
  }
  
  else if(this.props.name==="Settings"){
    return(<div onClick={()=>{
        this.props.klik(this.props.value);
      }}
      onMouseEnter={
          ()=>{
              this.props.mouseIn(this.props.value);
          }
      }
      onMouseLeave={
          ()=>{
              this.props.mouseOut(this.props.value);
          }
      }
      
      className={`slidebar__option--each ${hoverColor} ${ClickedColor}`}
      >
          <div className="slidebar__option--each-icon">
          <ion-icon name="settings-outline"></ion-icon>
          </div>
          <div className="slidebar__option--each-name">
          {this.props.name}
          </div>
      </div>);
  }
  
  else if(this.props.name==="Sign Out"){
    return(<div onClick={()=>{
        this.props.UserSignOut();
        this.props.klik(this.props.value);
      }}
      onMouseEnter={
          ()=>{
              this.props.mouseIn(this.props.value);
          }
      }
      onMouseLeave={
          ()=>{
              this.props.mouseOut(this.props.value);
          }
      }
      
      className={`slidebar__option--each ${hoverColor} ${ClickedColor}`}
      >
          <div className="slidebar__option--each-icon">
          <ion-icon name="log-in-outline"></ion-icon>
          </div>
          <div className="slidebar__option--each-name">
          {this.props.name}
          </div>
      </div>);
  }


else{
    return(<div onClick={()=>{
        this.props.klik(this.props.value);
      }}
      onMouseEnter={
          ()=>{
              this.props.mouseIn(this.props.value);
          }
      }
      onMouseLeave={
          ()=>{
              this.props.mouseOut(this.props.value);
          }
      }
      
      className={` slidebar__option--each ${hoverColor} ${ClickedColor}`}
      >
          <div>
          <ion-icon name="pencil-outline"></ion-icon>
          </div>
         <div>
         {this.props.name}
         </div>
          
      </div>);
}
  }
}
const mapStateToProps=(state)=>{
    return({
        state:state.UserProfile
    })
}
export default connect(mapStateToProps,{UserSignOut})(SideOption);