import React, { useContext, useState } from "react";
import "./style.css"
import Context from "../../Context";
import CardMain from "../CardMain";

export default () => {
    const {recipes, months} = useContext(Context);
    const [go, setGo] = useState(0);
    const [clickCnt, setClickCnt] = useState(1);
    const widthScrooling = window.innerWidth / 100 * 80;


    const stboxCarousel = {
        height: "350px",
        display: "flex",
        width: `${(recipes.length + 1) * 387}px`,
        left: `${window.innerWidth / 100  + go}px`,
        transition: "0.5s transform linear, 0.5s left linear",
        transform: `translateX(${go}px)`,
    }
  
    const stBtnBall = {
        padding: " 6px",
        backgroundColor: "var(--main-color)",
        borderRadius: "50px",
        border: "none",
        margin: "2px",
        cursor: "pointer"
    }

    const goLeft = e => {
        e.stopPropagation();
        if(clickCnt !== 1){
            setClickCnt(clickCnt - 1);
            setGo(go + widthScrooling);
        }else{
            setTimeout(() => {
                document.querySelector(".go-left").innerHTML = "Start"
            }, 500)
            setTimeout(()=>{
                document.querySelector(".go-left").innerHTML = ""
            }, 3000) 
            setClickCnt(clickCnt);
            setGo(go);
        }
    }
    const goRight = e => {
        e.stopPropagation();
        console.log(((recipes.length + 1) * 367) / widthScrooling > clickCnt);
        if(((recipes.length + 1) * 367) / widthScrooling > clickCnt){
            setClickCnt(clickCnt + 1);
            setGo(go - widthScrooling);
        } else {
            setTimeout(() => {
                document.querySelector(".go-right").innerHTML = "End"
            }, 500)
            setTimeout(()=>{
                document.querySelector(".go-right").innerHTML = ""
            }, 3000) 
            setClickCnt(clickCnt)
            setGo(go);  
        }
        
    }
    console.log(clickCnt, go);
    return  <><div className="contain-main-mini-carousel" >
        <div className="box-carousel" style={stboxCarousel}>
            {recipes.length>0 && recipes.map((r,i) => <CardMain
            key={i}
            badge = {r.tags.length >= 3 ? r.tags[r.tags.length - 2]: ""}
            image = {r.image}
            date = { `${new Date(r.created_at).getDate()}
                ${months[new Date(r.created_at).getMonth()]}
                ${new Date(r.created_at).getFullYear()}`}
            name={r.title}
            description={r.text.split("=>")[0].length > 70 ? `${r.text.split("=>")[0].slice(0, 70)}...`:r.text.split("=>")[0]}
            _id={r._id}
            />)}
        </div>
    </div>
    <div className="scrol-main-carusel">
        <button className="btn-ball go-left" style={stBtnBall} onClick={goLeft}></button>
        <button className="btn-ball go-right" style={stBtnBall} onClick={goRight}></button>
    </div>
    </>
}