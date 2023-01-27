import React from "react";
import { Link } from "react-router-dom";
import { ClockFill } from "react-bootstrap-icons";
import "./style.css";

export default ({img, name, date, _id}) => {    
    const stImgCardRecent = {
        width: "90%",
        borderRadius: "10px"
    }
    const stDateRecent ={
        fontSize: "12px",
        color: "#777",
        fontWeight: 500,
        
    }
    const stNameRecent ={
        fontWeight: 800,
        paddingTop: "10px"
    }

    return <Link to={`/recipe/${_id}`}><div className="card-recent-recipe" onClick={() => 
    setTimeout(() => window.location.reload(), 500) }>
        <div className="card-box-recent-recipe d-flex flex-column p-3" >
            <img src={img} style={stImgCardRecent}/>
            <div className="name-card-recent" style={stNameRecent}>{name}</div>
            <div className="date-card-recent" style={stDateRecent}><span><ClockFill/></span> &nbsp;{date}</div>
        </div>
    </div>
    </Link>
}