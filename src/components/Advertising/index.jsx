import React from "react";
import "./style.css";
import bannerCooker from "../../assets/banner-cooker.jpg"
import { Heart, HeartFill } from "react-bootstrap-icons";

export default () => {
    const stIconHeart = {
        fontSize: "7px"
    }
    
    return <div className="banner-container">
        <div className="banner">
            <img className="image-banner-container" src={bannerCooker}/>
            <div className="text-banner">
                <div className="title-banner">Вкусная еда - </div>
                <div className="side2-sentence">это еда, проготовленная <br/>  c &nbsp;
                <span>любовью</span>
                <span style={stIconHeart}><HeartFill/></span></div>
            </div>
        </div>
    </div>
}