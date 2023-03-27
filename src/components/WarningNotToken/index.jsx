import React from "react";
import { useNavigate } from "react-router-dom";
export default () =>{
    const navivateToMain = useNavigate();
    const navigateToRecipe = useNavigate();
    const navigateToRecomendation = useNavigate();
    const navigateToServing = useNavigate();
    const stTitleWarningNotToken = {
        textAlign: "center"
    }
    const stContainWarningNotToken ={
        display: "flex",
        flexDirection: "column",
        justyfyContent: "center",
        alignItems:"center",
    }
    const stButtons = {
        margin: "30px 5px",
        display: "flex",
        flexDirection: "row",
        justyfyContent: "center",
        alignItems:"center"
    }
    const stButton = {
        width: "250px",
        margin: "0px 7px",
        fontSize: "25px",
        fontWeight: 800,
        padding: "7px 14px",
        borderRadius: "5px",
        boxShadow: "0 0 8px 0 #555",
        cursor: "pointer"
    }
    return <div className="contain-warning-not-token" style={stContainWarningNotToken}>
        <h1 className="title-warning-not-token" style={stTitleWarningNotToken}>Без авторизации вам не доступен этот раздел</h1>
        <h2 className="title-go-to" style={stTitleWarningNotToken}>Вам доступны разделы:</h2>
        <div className="column-direction" style={stButtons}>
            <button className="btn" style={stButton} onClick={e => {
                e.preventDefault();
                navivateToMain("/");
            }}>Главная</button>
            <button className="btn" style={stButton} onClick={e => {
                e.preventDefault();
                navigateToRecipe("/recipes");
            }}>Рецепты</button>
            <button className="btn" style={stButton} onClick={e => {
                e.preventDefault();
                navigateToRecomendation("/recommendation");
            }}>Советы</button>
            <button className="btn" style={stButton} onClick={e => {
                e.preventDefault();
                navigateToServing("/serving");
            }}>Сервировка</button>
        </div>
    </div>
}