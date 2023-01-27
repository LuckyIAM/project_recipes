import React, {useContext} from "react";
import Context from "../../Context";
import {Link} from "react-router-dom";
import { ChatText, Clock, Fire } from "react-bootstrap-icons";
import "./style.css";

export default ({img, badge, author_iamge, author_name, create_date, 
    quantity_mesage, quantity_likes, name_recipe, description, _id}) => {

    const {recipes} = useContext(Context);
   
    const stCardAllImage = {
        background: `url(${img}) no-repeat center/cover`,
        borderRadius: "20px"
    }
    return <Link to={`/recipe/${_id}`}>
    <div className="card-all">
        <div className="card-all-container d-flex flex-column justify-content-center align-items-start p-4" >
            <div className="card-all-image-box d-flex justify-content-end align-items-end p-3" style={stCardAllImage}>
                <div className="card-all-badge">{badge}</div>               
            </div>
            <div className="card-all-info-contain">
                <div className="card-all-info-left">
                    <img className="card-all-image-author p-1" src={author_iamge}/>
                    <div className="card-all-name-author p-1">{author_name}</div>
                    <div className="card-all-date-create p-3"><Clock/>{create_date}</div>
                </div>
                <div className="card-all-info-right">
                    <div className="card-all-number-comment p-1"><ChatText/>{quantity_mesage}</div>
                    <div className="card-all-quantity-likes"><Fire/>{quantity_likes}</div>
                </div>
            </div>
            <div className="card-all-name">{name_recipe}</div>
            <div className="card-all-description">{description}</div>
        </div>
    </div>
    </Link>
}