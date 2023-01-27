import React from "react";
import "./style.css";
import banner from "../../assets/banner.jpg";

export default () => {

    const stImageBanner = {
        background: `url(${banner}) no-repeat center/cover`
    }

    return<div className="main-banner">
        <div className="main-banner-container" >
            <div className="main-banner-img" style={stImageBanner}>
                <div className="main-banner-title1">Любишь еду?</div>
                <div className="main-banner-title2">Мы научим тебя готовить.</div>
            </div> 
        </div>
        
    </div>
}