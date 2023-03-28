import React, { useContext, useEffect, useState} from "react";
import Context from "../../Context";
import CardRecentRecipe from "../CardRecentRecipe";
import "./style.css";

export default () => {
    const {recentRecipe} = useContext(Context);

    console.log(recentRecipe);
    const stPole = {
        marginTop:"20px",
        paddingTop: "20px",
        background: "var(--main-color)",
        borderRadius: "1px",
        height: "30px",
    }
    const stTitlrRecentContain = {
        paddingTop: "20px",
        fontSize: "25px",
        fontWeight: 900
    }
    return <div className="recent-recipe d-flex flex-column justify-content-center align-items-center ">
        <div className="title-recent-recipe-contain d-flex" >
            <span style={stPole}>&nbsp;&nbsp;&nbsp;</span><div style={stTitlrRecentContain}>&nbsp;&nbsp;Недавние Рецепты</div>
        </div>
        <div className="recent-recipe-contain ">    
            {recentRecipe &&  recentRecipe.map((recent, i) => <CardRecentRecipe
            key={i}
            img={recent.image}
            name={recent.title}
            date={new Date(recent.created_at).toLocaleDateString("ru-Ru")}
            _id={recent._id}
            />)}
        </div>
    </div>
}