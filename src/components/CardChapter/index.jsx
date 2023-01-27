import React from "react";
import "./style.css";

export default ({image, name,}) => {

    const stImg = {
        position: "relative",
        width: "330px",
        height: "220px",
        background: ` linear-gradient(to bottom,rgba(119, 119, 119, 0) 70%, #acb128), url(${image}) no-repeat center/cover` ,
        borderRadius: "20px"
    }

    return <div className="contain-card-chapter" >
        <div className="image-card-chapter" style={stImg}>
            <div className="description-dishe-chapter">
                <div className="container-description-dishe-chapter">
                    <div className="name-card-chapter">{name}</div>
                </div>
            </div>
        </div>
    </div>
}