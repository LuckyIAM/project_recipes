import React, { useContext, useState, useEffect } from "react";
import Context from "../Context";
import { useParams } from "react-router-dom";
import Functions from "../Functions"
import napkin from "../assets/napkin-icon.png";
import sweet from "../assets/sweet-icon.png";
import drinksImg from "../assets/drinks2-icon.png";
import pot from "../assets/plant-pot-icon.png";
import cloth from "../assets/table-cloth-icon.png";
import nameplate from "../assets/nameplate-icon.png";
import { Container, Row, Col } from "react-bootstrap";
import ContainerCardPageRecipes from "../components/ContainerCardPageRecipes";
import FollowUs from "../components/FollowUs";
import RecentRecipes from "../components/RecentRecipes";

export default () => {
    const {serving, search, searchText, widthScreen} = useContext(Context);
    let params = useParams
    const f = Functions(params.id);
    const [currentRecipes, setCurrentRecipes] = useState([]);
    const chapterServingText = ["Декор салфеток", "Cладкое меню","Декор напитков", "Настольные украшения", "Скатерть", "Таблички и меню"]
    const decorText = ["napkin", "sweet", "drinks2", "pot", "cloth", "nameplate"]
    const [napkins, setNapkins] = useState([]);
    const [sweets, setSweets] = useState([]);
    const [drinks2, setDrinks2] = useState([]);
    const [pots, setPots] = useState([]);
    const [cloths, setCloths] = useState([]);
    const [namePlates, setNamePlates] = useState([]);
    const [titleDecor, setTitleDecor] = useState("Декор салфеток")

    useEffect(() => {
        setNapkins(f.filtredRecipes(serving, "Сервировка/Салфетки"));
        setCurrentRecipes(napkins);
        setSweets(f.filtredRecipes(serving, "Сервировка/Сладкое меню"));
        setDrinks2(f.filtredRecipes(serving, "Сервировка/Напитки"));
        setPots(f.filtredRecipes(serving, "Сервировка/Вазы"));
        setCloths(f.filtredRecipes(serving, "Сервировка/Скатерти"));
        setNamePlates(f.filtredRecipes(serving, "Сервировка/Именные таблички и меню"));
    }, [serving])

    useEffect(() => {
        if(napkins.length > 0 && search.length ===0 ){
            setCurrentRecipes(napkins);
            setTitleDecor("Декор салфеток")
        }
    }, [napkins])

    useEffect(() => {
        if(napkins.length > 0 && search.length > 0){
            setCurrentRecipes(search);
            setTitleDecor(`По запросу ${searchText} найдено ${search.length} рецептов`)
        }
    }, [search])

    const goToChapter = (e, currentArr, chapter, chapterText) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.currentTarget.className);
        for(let i = 0; i < chapter.length; i++){
            if(e.currentTarget.className === chapter[i]){
                setTitleDecor(chapterText[i]);
                setCurrentRecipes(currentArr)
            }
        }
    }

    const stImgMenuChapter = {
        width: `${widthScreen >= 3 ? "70px" : "25px"}`
    }
    
    const stTextMenuChapter = {
        color: `${widthScreen >= 3 ? "var(--main-color)" : "#555"}`,
        fontSize: `${widthScreen >= 3 ? "26px" : "19px"}`,
        fontWeight: 800,
    }
    
    const stMenuChapterItems = {
        display: "flex",
        flexDirection: `${widthScreen >= 3 ? "column" : "row"}`,
        justifyContent: `${widthScreen >= 3 ? "center" : "flex-start"}`,
        alignItems: "center",
        padding: `${widthScreen >= 3 ? "4px 10px" : "0px 15px"}`,
        boxShadow: `${widthScreen >= 3 ? "0 0 10px 0 #acb128" : "none"}`,
        border: `${widthScreen >= 3 ? "none" : "1px solid #aaa"}`,
        borderRadius: "5px",
        height: `${widthScreen >= 3 ? "150px" : "30px"}`,
        width: `${widthScreen >= 3 ? "auto" : "100%"}`,
    }
    
    const stMenuChapter = {
        margin: "20px",
        padding: " 15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",        
    }
    const stMenuChapter2 = {
        margin: "0px",
        padding: " 15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        background: "#f8f9fa"       
    }
    const stContainerCards ={
        borderRadius: "20px",
        boxShadow: "0 0 10px 0 #777",
    }
    const stContainerCards1 ={
        borderRadius: "20px",
        boxShadow: "0 0 10px 0 #777",
        margin: `${widthScreen >= 3 ? "20px 10px 20px 0" : "7px 0px"}`,
        width: `${widthScreen >= 3 ? "calc(66% - 20px)" : "100%"}`
    }
    const stContainerCards2 ={
        margin: `${widthScreen >= 3 ? "20px 10px 20px 0" : "0px"}`,
        width: `${widthScreen >= 3 ? "calc(35% - 20px)" : "100%"}`
    }
    const stCol ={
        borderRadius: "20px",
        boxShadow: "0 0 10px 0 #777",
    }

    const stCntainerTitleChapter = {
        padding: "15px",
        borderRadius: "20px",
        boxShadow: "0 0 10px 0 #777",
        boxSizing: "border-box", 
        margin: "10px"
    }
   

    console.log("currentRecipes", currentRecipes, napkins, sweets);
    console.log(chapterServingText);
    return <><div className="menu-chapter" style={widthScreen >=3 ? stMenuChapter : stMenuChapter2}>
        <div className="napkin" style={stMenuChapterItems} 
        onClick={e => goToChapter(e, napkins, decorText, chapterServingText)}>
            <img src={napkin} style={stImgMenuChapter} />
            <span style={stTextMenuChapter}>{chapterServingText[0]}</span>
        </div>
        <div className="sweet" style={stMenuChapterItems} 
        onClick={e => goToChapter(e, sweets, decorText, chapterServingText)}>
            <img src={sweet} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterServingText[1]}</span>
        </div>
        <div className="drinks2" style={stMenuChapterItems} 
        onClick={e => goToChapter(e, drinks2, decorText, chapterServingText)}>
            <img src={drinksImg} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterServingText[2]}</span>
        </div>
        <div className="pot" style={stMenuChapterItems} 
        onClick={e => goToChapter(e, pots, decorText, chapterServingText)}>
            <img src={pot} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterServingText[3]}</span>
        </div>
        <div className="cloth" style={stMenuChapterItems} 
            onClick={e => goToChapter(e, cloths, decorText, chapterServingText)}>
            <img src={cloth} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterServingText[4]}</span>
        </div>
        <div className="nameplate" style={stMenuChapterItems} 
        onClick={e => goToChapter(e, namePlates, decorText, chapterServingText)}>
            <img src={nameplate} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterServingText[5]}</span>
        </div>
    </div>
    <Container className="container">
        <Row className="g-4">
            <Col className="title" xs={12} md={12} style={stContainerCards}>
                <div className="container-title-chapter" >
                    <h1 className="title-chapter p-2" >{titleDecor}</h1>
                </div>
            </Col>
            <Col xs={12} md={8} style={stContainerCards1} >
               <ContainerCardPageRecipes arr={currentRecipes}/>
            </Col>
            <Col xs={12} md={4} style={stContainerCards2}>
            <Row className="col-position g-3">
                <Col xs={12} md={12} style={stCol} >
                    <FollowUs/>
                </Col>
                <Col xs={12} md={12} style={stCol}>
                    <RecentRecipes/>
                </Col>
            </Row>
            </Col>
        </Row>
    </Container>
    </>
}
