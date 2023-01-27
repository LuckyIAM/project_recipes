import React, { useContext, useState } from "react";
import Context from "../../Context";
import "./style.css";

export default () => {
    const {idRecipe, api} = useContext(Context);
    const [addComment, setAddComment] = useState("");

    const sendComment = (e) => {
        e.preventDefault();
        console.log(idRecipe, "id");
        if(idRecipe){
            api.addComment(idRecipe, {"text": addComment})
                .then(res => res.json())
                .then(data => {
                    console.log("comment", data);
                })
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
                    rows="6" 
                    cols="40" 
                    value={addComment}
                    onChange={(e) => setAddComment(e.target.value)}
                    >
                    </textarea>
                    <button className="my_btn" type="submit" onClick={sendComment}>Добавить отзыв</button>
                </form>
            </div>
        </div>
    </div>
}