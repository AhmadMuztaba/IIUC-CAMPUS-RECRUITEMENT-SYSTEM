import React from 'react';
import './CSS/AboutMe.css';
import Image from './file options/Image';
import AdminImage from './Image/admin-stamp-watermark-scratched-style-260nw-1138728377.png'

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
         <img src={AdminImage} alt="pic"/>
      </div>);
  }
 if(this.props.name==="CompanySignUp"){
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
         <ion-icon name="person-add-outline"></ion-icon>
          {this.props.name}
      </div>);
  }
  else if(this.props.name==="AlumniSignUp"){
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
        <ion-icon name="person-add-outline"></ion-icon>
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

//   else if(this.props.name==="All Alumni"){
//     return(<div onClick={()=>{
//         this.props.klik(this.props.value);
//       }}
//       onMouseEnter={
//           ()=>{
//               this.props.mouseIn(this.props.value);
//           }
//       }
//       onMouseLeave={
//           ()=>{
//               this.props.mouseOut(this.props.value);
//           }
//       }
      
//       className={`${hoverColor} ${ClickedColor} SideOption-Option`}
//       >
//          <ion-icon name="search-outline"></ion-icon>
//           {this.props.name}
//       </div>);
//   }

//   else if(this.props.name==="All Companies"){
//     return(<div onClick={()=>{
//         this.props.klik(this.props.value);
//       }}
//       onMouseEnter={
//           ()=>{
//               this.props.mouseIn(this.props.value);
//           }
//       }
//       onMouseLeave={
//           ()=>{
//               this.props.mouseOut(this.props.value);
//           }
//       }
      
//       className={`${hoverColor} ${ClickedColor} SideOption-Option`}
//       >
//          <ion-icon name="search-outline"></ion-icon>
//           {this.props.name}
//       </div>);
//   }
//   else if(this.props.name==="All Users"){
//     return(<div onClick={()=>{
//         this.props.klik(this.props.value);
//       }}
//       onMouseEnter={
//           ()=>{
//               this.props.mouseIn(this.props.value);
//           }
//       }
//       onMouseLeave={
//           ()=>{
//               this.props.mouseOut(this.props.value);
//           }
//       }
      
//       className={`${hoverColor} ${ClickedColor} SideOption-Option`}
//       >
//          <ion-icon name="search-outline"></ion-icon>
//           {this.props.name}
//       </div>);
//   }
//   else if(this.props.name==="All Users"){
//     return(<div onClick={()=>{
//         this.props.klik(this.props.value);
//       }}
//       onMouseEnter={
//           ()=>{
//               this.props.mouseIn(this.props.value);
//           }
//       }
//       onMouseLeave={
//           ()=>{
//               this.props.mouseOut(this.props.value);
//           }
//       }
      
//       className={`${hoverColor} ${ClickedColor} SideOption-Option`}
//       >
//          <ion-icon name="search-outline"></ion-icon>
//           {this.props.name}
//       </div>);
//   }
  else if(this.props.name==="Search User"){
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


  else if(this.props.name==="Search Alumni"){
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

  else if(this.props.name==="Search Company"){
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