import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default ({image, badge, date, name, description, _id}) => {

    const stImg = {
        position: "relative",
        width: "330px",
        height: "330px",
        background: ` linear-gradient(rgba(119, 119, 119, 0) 20%, #555), url(${image}) no-repeat center/cover` ,
        borderRadius: "20px",
        fontWeight: 600
    }

    return <Link to={`/recipe/${_id}`}><div className="contain-card" >
        <div className="image-card" style={stImg}>
            <div className="badge-image">{badge}</div>
            <div className="description-dishe">
                <div className="container-description-dishe">
                    <div className="date-card">{date}</div>
                    <div className="name-card">{name}</div>
                    <div className="description-card">{description}</div>
                </div>
            </div>
        </div>
    </div>
    </Link>
}