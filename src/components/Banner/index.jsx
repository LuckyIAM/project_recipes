import React, { useContext } from "react";
import Context from "../../Context";
import "./style.css";
import banner from "../../assets/banner.jpg";

export default () => {
    const {widthScreen} = useContext(Context)
    const stImageBanner = {
        background: `url(${banner}) no-repeat center/cover`
    }

    const stMainBanner = {
        fontSize: widthScreen === 3 ? "50px" : "40px"
    }

    return<div className="main-banner">
        <div className="main-banner-container" style={stMainBanner}>
            <div className="main-banner-img" style={stImageBanner}>
                <div className="main-banner-title1">Любишь еду?</div>
                <div className="main-banner-title2">Мы научим тебя готовить.</div>
            </div> 
        </div>
        
    </div>
}