import React from 'react';
import './CSS/AboutMe.css';
import Image from './file options/Image';


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
      
      className={`${hoverColor} ${ClickedColor}`}
      >
         <Image/>
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
      
      className={`${hoverColor} ${ClickedColor} SideOption-Option`}
      >
         <ion-icon name="pencil-outline"></ion-icon>
          {this.props.name}
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
      
      className={`${hoverColor} ${ClickedColor} SideOption-Option`}
      >
         <ion-icon name="reader-outline"></ion-icon>
          {this.props.name}
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
      
      className={`${hoverColor} ${ClickedColor} SideOption-Option`}
      >
         <ion-icon name="receipt-outline"></ion-icon>
          {this.props.name}
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
      
      className={`${hoverColor} ${ClickedColor} SideOption-Option`}
      >
         <ion-icon name="search-outline"></ion-icon>
          {this.props.name}
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
      
      className={`${hoverColor} ${ClickedColor} SideOption-Option`}
      >
         <ion-icon name="pencil-outline"></ion-icon>
          {this.props.name}
      </div>);
}
  }
}
export default SideOption;