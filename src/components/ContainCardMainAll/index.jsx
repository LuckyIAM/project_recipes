import React, {useContext, useState} from "react";
import Context from "../../Context";
import CardMainAll from "../CardMainAll";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import "./style.css"

export default () => {
    const {recipes, widthScreen} = useContext(Context);
    const [go, setGo] = useState(0);
    const [clickCnt, setClickCnt] = useState(1);
    const widthScrooling = `${widthScreen >= 3 ? 351 * widthScreen : 298 * widthScreen}`;
    
    const stPole = {
        marginTop: "10px",
        background: "var(--main-color)",
        borderRadius: "1px",
        height: "25px",
    }
    const stTitleRecipe = {
        fontSize: "30px",
        fontWeight: 900
    }
    const stArrowScrol = {
        width: widthScreen >= 3 ?`${351 * recipes.length}px` : `${298 * recipes.length}px`,
        left: `${go}px`,
        transition: "0.5s transform linear, 0.5s left linear",
        transform: `translateX(${go}px)`,
    }
    const goLeft = e => {
        e.stopPropagation();
        console.log(clickCnt, go);
        if(clickCnt !== 1){
            setClickCnt(clickCnt - 1);
            setGo(go + Number(widthScrooling));
        }
    }
    const goRight = e => {
        e.stopPropagation();
        if(Math.floor(recipes.length  / widthScreen) >= clickCnt){
            setClickCnt(clickCnt + 1);
            setGo(go - widthScrooling);
            console.log(clickCnt, go);
        }
    }
    
    return <div className="container-cards-all">
        <div className="arrow-scrol d-flex justify-content-between align-items-center fs-3" >
        <div className="title-recipes" style={stTitleRecipe}><span style={stPole}>&nbsp;&nbsp;</span>&nbsp;Рецепты</div>
        <div>
            <span onClick={goLeft}><ArrowLeftCircle /></span>
            &nbsp;<span onClick={goRight}><ArrowRightCircle/></span>
        </div>
    </div>
        <div className="container-cards-all-box d-flex justify-content-start align-items-start" style={stArrowScrol}>
            {recipes && recipes.map((card, i) => <CardMainAll
            key={i}
            img={card.image}
            badge={card.tags[card.tags.length - 2]}
            author_iamge={card.author.avatar}
            author_name={card.author.name}
            create_date={new Date(card.created_at).toLocaleDateString("ru-Ru")}
            quantity_mesage={card.comments.length}
            quantity_likes={card.comments.length}
            name_recipe={card.title}
            description={card.text.split("=>")[0].length > 60 ? `${card.text.split("=>")[0].slice(0, 60)}...` : card.text.split("=>")[0]}
            _id={card._id}
            />)}
        </div>
    </div>
}