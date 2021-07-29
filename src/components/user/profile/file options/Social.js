import React from 'react';
import '../CSS/social.scss';
const Social = () => {
    return (
        <div className="social">
            <div className="social__icons">
            <a target="_blank" rel="noreferrer" href="">
                     <ion-icon name="logo-facebook" class="social__icons--facebook"></ion-icon>
                    </a>
            </div>
            <div className="social__icons">
            <a target="_blank" rel="noreferrer" href="">
                        <ion-icon name="logo-instagram"class="social__icons--instagram"></ion-icon>
                    </a>
            </div>  
            <div className="social__icons">
            <a target="_blank" rel="noreferrer" href="">
                        <ion-icon name="logo-twitter"class="social__icons--twitter"></ion-icon> 
            </a>
            </div>  
            <div className="social__icons">
            <a target="_blank" rel="noreferrer" href="">
                        <ion-icon name="logo-github" class="social__icons--github"></ion-icon>  
                        </a>
            </div> 
        </div>
    );
};

export default Social;