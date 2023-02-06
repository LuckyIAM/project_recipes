import React, { useContext } from "react";
import Context from "../../Context";
import "./style.css";
import bannerCooker from "../../assets/banner-cooker.jpg"
import { HeartFill } from "react-bootstrap-icons";

export default () => {
    const {widthScreen} = useContext(Context)
    const stIconHeart = {
        fontSize: "7px"
    }
    const stBannerContainer = {
        height: widthScreen === 3 ? "250px": "400px",
        margin: "15px 0px"
    }
    
    return <div className="banner-container" style={stBannerContainer}>
        <div className={widthScreen ===3 ? "banner":"banner2"}>
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