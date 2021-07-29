import React from 'react';
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
export default SideOption;