import React from 'react';
import {connect} from 'react-redux';
import {CompanySignOut} from '../../actions/company/index'

class SideOption extends React.Component{
    render(){
        const hoverColor=this.props.hoverColor?"Side-Option-hover-color":null;
        const ClickedColor=this.props.color?"Side-Option-selected-color":null;

if(this.props.name==="Profile"){
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
else if(this.props.name==="Job Post"){
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
  else if(this.props.name==="Search for User"){
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
  else if(this.props.name==="Sign Out"){
    return(<div onClick={()=>{
        this.props.CompanySignOut();
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
     state:state
    })
}
export default connect(mapStateToProps,{CompanySignOut})(SideOption);