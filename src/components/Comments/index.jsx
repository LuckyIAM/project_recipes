import React, { useContext, useEffect, useState } from "react";
import  Context  from "../../Context";
import { useNavigate } from "react-router-dom";

export default () => {
    const {api, token, userToken, apiUser, idRecipe} = useContext(Context);
    const [comment, setComment] = useState([]);



    useEffect(() => {
        if(idRecipe && token){
            api.getComment(idRecipe)
                .then(res => res.json())
                .then(data => {
                    setComment(data);
                })
        }else if(idRecipe && userToken){
            apiUser.getComment(idRecipe)
                .then(res => res.json())
                .then(data => {
                    setComment(data);
                })
        }
    }, [idRecipe])

    const stImageAvatar = {
        height: "70px",
        borderRadius: "50px"
    }
    const stInfoAutorText = {
        fontSize: "12px",
        fontWeight: "700"
    }
    console.log(comment);
    
    return <div className="comments">
        {comment && <h2 className="title-coments fw-bolder">
        Количество комментариев: {comment.length}
        </h2>}
        {comment && comment.map((el, i) => <div className="comment-box d-flex">
            <div className="comment-left-side" >
                <img className="icon-picture" style={stImageAvatar} src={el.author.avatar}/>
            </div> 
            <div className="right-side">
                <div className="right-top-side d-flex justify-content-between align-items-center mb-3" style={stInfoAutorText}>   
                    <div className="name-author">{el.author.name}</div>
                    <div className="data-create" style={{color: "#777"}}>{`${new Date(el.created_at).toLocaleString("ru-Ru")}`}</div>
                </div>
                <div className="right-bottom-side">
                    <div className="comment-text">{el.text}</div>
                </div>
            </div>
        </div>)}
    </div>
}