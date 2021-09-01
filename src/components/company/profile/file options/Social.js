import React from 'react';
const Social = (props) => {
    if(props.social||props.website){
        return (
            <div className="social">
                {props.social.facebook?( <div className="social__icons">
                <a target="_blank" rel="noreferrer" href={props.social.facebook}>
                         <ion-icon name="logo-facebook" class="social__icons--facebook"></ion-icon>
                        </a>
                </div>):null}
               {
                   props.social.instagram?(<div className="social__icons">
                   <a target="_blank" rel="noreferrer" href={props.social.instagram}>
                               <ion-icon name="logo-instagram"class="social__icons--instagram"></ion-icon>
                           </a>
                   </div>):null
               }
               {
                   props.social.twitter?(<div className="social__icons">
                   <a target="_blank" rel="noreferrer" href={props.social.twitter}>
                               <ion-icon name="logo-twitter"class="social__icons--twitter"></ion-icon> 
                   </a>
                   </div>):null
               }
               {
                  props.social.linkedin?(<div className="social__icons">
                  <a target="_blank" rel="noreferrer" href={props.social.linkedin}>
                            <ion-icon name="logo-linkedin"class="social__icons--linkedin"></ion-icon> 
                              </a>
                  </div>):null
               }
               {
                  props.website?(<div className="social__icons">
                  <a target="_blank" rel="noreferrer" href={props.website}>
                  <ion-icon name="globe-outline" class="social__icons--ownweb"></ion-icon> 
                              </a>
                  </div>):null
               }
            </div>
        );
    }else{
        return ''
    }
    
};

export default Social;