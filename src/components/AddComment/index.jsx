import React, { useContext, useState } from "react";
import Context from "../../Context";
import "./style.css";

export default () => {
    const {idRecipe, api, token, apiUser, userToken, widthScreen} = useContext(Context);
    const [addComment, setAddComment] = useState("");

    const sendComment = (e) => {
        e.preventDefault();
        console.log(idRecipe, "id");
        const btnComment = document.querySelector(".add_comment")
        console.log(addComment);
        if(idRecipe){
            if(token){
                api.addComment(idRecipe, {"text": addComment})
                    .then(res => res.json())
                    .then(data => {
                        console.log("comment", data);   
                    })
            }else if(userToken){
                apiUser.addComment(idRecipe, {"text": addComment})
                    .then(res => res.json())
                    .then(data => {
                        console.log("comment", data);
                    })
            }
            setAddComment("")
            setTimeout(() => btnComment.textContent="Вы оставили коментарии", 500)
            setTimeout(() => btnComment.textContent="Добавить отзыв", 2000)
            
        }
    }
    const stAddComentBox ={
        display: "flex",
        flexDirection: "column",
    }

    return  <div className="add-comment">
        <div className="add-comment-box d-flex flex-column justify-content-center align-items-center"  >
            <h1 className="title-comment-add">
                Комментарии
            </h1>
            <div className="form-add-comment">
                <form style={stAddComentBox} >
                    <label htmlFor="comments">Оставьте коментарии</label>
                    <textarea  id="comments"
                    type="text" 
                    rows={widthScreen >=3 ? "6" : "4"} 
                    cols={widthScreen >=3 ? "40" : "20"}  
                    value={addComment}
                    onChange={(e) => setAddComment(e.target.value)}
                    >
                    </textarea>
                    <button className="my_btn add_comment" type="submit" onClick={sendComment}>Добавить отзыв</button>
                </form>
            </div>
        </div>
    </div>
}