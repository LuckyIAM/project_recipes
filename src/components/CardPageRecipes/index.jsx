import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Clock, ChatText, Fire } from "react-bootstrap-icons";

export default ({image_dishe, image_author, name_author ,create_date, name_recipe, quantity_like , about_dishe, _id}) => {

    const stImageCard = {
        background: `url(${image_dishe}) no-repeat center/cover`,
    }

    const stFotoAuthor = {
        background: `url(${image_author}) no-repeat center/cover`
    }

    return <Link to={`/recipe/${_id}`}><div className="container-card-recipe-all-description">
        <div className="card-all-description-recipe">
            <div className="image-dishe" style={stImageCard}></div>
            <div className="short-discription">
                <div className="short-discription-container">
                    <div className="left-section-of-description">
                        <div className="author">
                            <div className="foto-author" style={stFotoAuthor}></div>
                            <div className="name-author">{name_author}</div>
                        </div>
                        <div className="date">
                            <div className="icon-date"><Clock/></div>
                            <div className="create-date">{create_date}</div>
                        </div>
                    </div>
                    <div className="right-section-of-description">
                        <div className="feetback-icon"><ChatText/></div>
                        <div className="like-box">
                            <div className="fire-icon" title="количество лайков"><Fire/></div>
                            <div className="quantity-like" title="количество лайков">{quantity_like}</div>
                        </div>
                    </div>
                </div>
                <div className="name-recipe">{name_recipe}</div>
                <div className="about-dishe">{about_dishe}</div>
                <button className="my_btn read-more" >Читать далее &gt;&gt;</button>
            </div>
        </div>
        
    </div>
    </Link>
}