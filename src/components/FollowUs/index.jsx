import React from "react";
import "./style.css";
import { Telegram, Whatsapp, Instagram, Facebook, Youtube, Twitter } from "react-bootstrap-icons";

export default () => {
    const stPole = {
        marginTop: "10px",
        padding: "5px",
        background: "var(--main-color)",
        borderRadius: "5px",
        height: "30px",
        marginLeft: "10px"
    }
    const stTitleRecentContain = {
        fontSize: "30px",
        fontWeight: 900,
        marginLeft: "5px" 
    }
    return <div className="follow-us">
        <div className="follow-us-title d-flex p-3" >
                        <span style={stPole}>&nbsp;&nbsp;</span><div style={stTitleRecentContain}>&nbsp;&nbsp;Подписывайтесь</div>
                    </div>
        <div className="follow-us-container">
            <div className="follow-us-block1">
                <div className="follow-us-faceBook block"><Facebook/></div>
                <div className="follow-us-text">подписывайся</div>
            </div>
            <div className="follow-us-block2">
                <div className="follow-us-instagram block"><Instagram/></div>
                <div className="follow-us-text">подписывайся</div>
            </div>
            <div className="follow-us-block3">
                <div className="follow-us-youtube block"><Youtube/></div>
                <div className="follow-us-text">подписывайся</div>
            </div>
            <div className="follow-us-block4">
                <div className="follow-us-twitter block"><Twitter/></div>
                <div className="follow-us-text">подписывайся</div>
            </div>
            <div className="follow-us-block5">
                <div className="follow-us-telegram block"><Telegram/></div>
                <div className="follow-us-text">подписывайся</div>
            </div>
            <div className="follow-us-block6">
                <div className="follow-us-whatsapp block"><Whatsapp/></div>
                <div className="follow-us-text">подписывайся</div>
            </div>
        </div>
    </div>
}