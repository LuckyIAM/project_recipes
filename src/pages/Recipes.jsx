import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Context from "../Context";
import Functions from "../Functions";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import appetizer from "../assets/appetizer_icon.png";
import salad from "../assets/salad_icon.png";
import soup from "../assets/soup_icon.png";
import bakery from "../assets/bakery_icon.png";
import dessert from "../assets/dessert_icon.png";
import drinks from "../assets/drinks_icon.png";
import souces from "../assets/souces_icon.png";
import canned from "../assets/canned_icon.png";
import fishAndMeat from "../assets/fish_and_meat-icon.png";
import { Container, Row, Col } from "react-bootstrap";
import RecentRecipes from "../components/RecentRecipes"
import ContainerCardPageRecipes from "../components/ContainerCardPageRecipes";
import FollowUs from "../components/FollowUs";

export default () => {
    const {chapterDishesText, secondMealText, recipes, search, titleChapter, 
        setTitleChapter, searchText, bakeryText, widthScreen} = useContext(Context);
    let params = useParams
    const f = Functions(params.id);
    const chaptersName = ["appetizer", "salad", "soup", "fish-and-meat", "bakery", "dessert", "drinks", "souces", "canned"];
    const secondMealChapterName = [ "meat", "fish", "vegetable"];
    const bakerysChapterName = ["cake", "pancakes", "bread"];
    const [appetizers, setAppetizers] = useState([]);
    const [salads, setSalads] = useState([]);
    const [soups, setSoups] = useState([]);
    const [fishAndMeats, setFishAndMeats] = useState([]);
    const [bakerys, setBakerys] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [drinkss, setDrinks] = useState([]);
    const [soucess, setSouces] = useState([]);
    const [canneds, setCanneds] = useState([]);
    const [meat, setMeat] = useState([]);
    const [fish, setFish] = useState([]);
    const [vegetable, setVegetable] = useState([]);
    const [cake, setCake] = useState([]);
    const [pancakes, setPancakes] = useState([]);
    const [bread, setBread] = useState([]);
    const [currentRecipes, setCurrentRecipes] = useState([]);
    const [flag, setFlag] =useState(false);
    const [flag2, setFlag2] =useState(false);
    const title =document.querySelector('.title');
   

    useEffect(() => {
        setAppetizers(f.filtredRecipes(recipes, "Закуски"));
        setCurrentRecipes(appetizers);
        setSalads(f.filtredRecipes(recipes, "Салат"));
        setSoups(f.filtredRecipes(recipes, "Суп"));
        setMeat(f.filtredRecipes(recipes, "Вторые блюда/Мясные"));
        setFish(f.filtredRecipes(recipes, "Вторые блюда/Рыбные"));
        setVegetable(f.filtredRecipes(recipes, "Вторые блюда/Овощные"));
        setCake(f.filtredRecipes(recipes, "Выпечка Торты/кексы/печенье"));
        setPancakes(f.filtredRecipes(recipes, "Выпечка Блины/оладье"));
        setBread(f.filtredRecipes(recipes, "Выпечка Хлеб/булочки"));
        setDesserts(f.filtredRecipes(recipes, "Десерты"));
        setDrinks(f.filtredRecipes(recipes, "Напитки"));
        setSouces(f.filtredRecipes(recipes, "Соусы"));
        setCanneds(f.filtredRecipes(recipes, "Заготовки"));
    }, [recipes])
    useEffect(() => {
        if(meat && fish && vegetable){            
            setFishAndMeats(prev => {
                return [...prev,...fish,...meat,...vegetable]
            });
        }
        
        setBakerys(prev => {
            return [...prev,...cake,...pancakes,...bread]
        });
        
        
    },[meat])
    console.log("fishAndMeats", fishAndMeats);
    useEffect(() => {
        if(appetizers.length > 0 && search.length ===0 ){
            setCurrentRecipes(appetizers);
            setTitleChapter("Закуски")
        }
    }, [appetizers])

    useEffect(() => {
        if(appetizers.length > 0 && search.length > 0){
            setCurrentRecipes(search);
            setTitleChapter(`По запросу ${searchText} найдено ${search.length} рецептов`)
        }
    }, [search])

    console.log(appetizers, salads, soups, meat, fish, search, cake);

    const goToChapter = (e, currentArr, chapter, chapterText) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.currentTarget.className);
        for(let i = 0; i < chapter.length; i++){
            if(e.currentTarget.className.match(chapter[i])){
                setTitleChapter(chapterText[i]);
                setCurrentRecipes(currentArr)
            }
        }
    }

    const showMinMenu = () => {
        title.style.marginTop="120px";
        setFlag(true);
    }

    const closeMinMenu = () => {
        title.style.marginTop="0px";
        setFlag(false);
    }

    const showMinMenuDessert = () => {
        setFlag2(true);
        title.style.marginTop = "140px";
    }

    const closeMinMenuDessert = () => {
        title.style.marginTop = "0px";
        setFlag2(false);
    }


    console.log(flag);

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
        justifyContent: "space-around",
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
   

    console.log("currentRecipes", currentRecipes);
    console.log(chapterDishesText);
    return <>
    <div className="menu-chapter" style={widthScreen >=3 ? stMenuChapter: stMenuChapter2}>
        <div className="appetizer" style={stMenuChapterItems} onClick={e => goToChapter(e, appetizers, chaptersName, chapterDishesText)}>
            <img src={appetizer} style={stImgMenuChapter} />
            <span style={stTextMenuChapter}>{chapterDishesText[0]}</span>
        </div>
        <div className="salad" style={stMenuChapterItems} onClick={e => goToChapter(e, salads, chaptersName, chapterDishesText)}>
            <img src={salad} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterDishesText[1]}</span>
        </div>
        <div className="soup" style={stMenuChapterItems} onClick={e => goToChapter(e, soups, chaptersName, chapterDishesText)}>
            <img src={soup} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterDishesText[2]}</span>
        </div>
        {widthScreen >=3 ?<div className="fish-and-meat" 
        style={stMenuChapterItems} 
        onClick={e => goToChapter(e, fishAndMeats, chaptersName, chapterDishesText)} 
        onMouseOver={showMinMenu} onMouseOut={closeMinMenu}
        >
            <img src={fishAndMeat} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterDishesText[3]}</span>
            <div className={flag ? "second-meal active1" : "second-meal"} >
                <div className="meat" 
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToChapter(e, meat, secondMealChapterName, secondMealText)}}>
                        Мясное
                </div>
                <div className="fish"
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToChapter(e, fish, secondMealChapterName, secondMealText)}} >
                        Рыбное
                </div>
                <div className="vegetable" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToChapter(e, vegetable, secondMealChapterName, secondMealText)}}>
                        Овощное
                </div> 
            </div>
        </div>
        :
        <Navbar bg="light" style={stMenuChapterItems} expand="lg">
            <Container style={{marginRight: "0px", marginLeft: "0px", paddingLeft: "0px", paddingRight: "0px"}}>
                <NavDropdown title={<span style={stTextMenuChapter}><img src={fishAndMeat} style={stImgMenuChapter}/>{chapterDishesText[3]}</span>} id="basic-nav-dropdown">
                    <NavDropdown.Item className="meat2" 
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToChapter(e, meat, secondMealChapterName, secondMealText)}}>Мясное</NavDropdown.Item>
                    <NavDropdown.Item className="fish2"
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToChapter(e, fish, secondMealChapterName, secondMealText)}} >
                        Рыбное
                    </NavDropdown.Item>
                    <NavDropdown.Item className="vegetable2" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToChapter(e, vegetable, secondMealChapterName, secondMealText)}}>
                        Овощное</NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>}
        { widthScreen >= 3 ?<div className="bakery" style={stMenuChapterItems} 
            onClick={e => goToChapter(e, bakerys, chaptersName, chapterDishesText)} 
            onMouseOver={showMinMenuDessert} onMouseOut={closeMinMenuDessert}
            >
            <img src={bakery} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterDishesText[4]}</span>
            <div className= {flag2 ? "second-meal active" : "second-meal"}>
                <div className="cake" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToChapter(e, cake, bakerysChapterName, bakeryText)}}>Торты/кексы/печенье</div>
                <div className="pancakes" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToChapter(e, pancakes, bakerysChapterName, bakeryText)}}>Блины/оладье</div>
                <div className="bread" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToChapter(e, bread, bakerysChapterName, bakeryText)}}>Хлеб/булочки</div>
            </div>
        </div>
        :
        <Navbar bg="light" style={stMenuChapterItems} expand="lg">
            <Container style={{marginRight: "0px", marginLeft: "0px", paddingLeft: "0px", paddingRight: "0px"}}>
                <NavDropdown title={<span style={stTextMenuChapter}><img src={bakery} style={stImgMenuChapter}/>{chapterDishesText[4]}</span>} id="basic-nav-dropdown">
                    <NavDropdown.Item className="cake2" onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            goToChapter(e, cake, bakerysChapterName, bakeryText)}}>{bakeryText[0]}</NavDropdown.Item>
                    <NavDropdown.Item className="pancakes2" onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            goToChapter(e, pancakes, bakerysChapterName, bakeryText)}}>{bakeryText[1]}
                    </NavDropdown.Item>
                    <NavDropdown.Item className="bread2" onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            goToChapter(e, bread, bakerysChapterName, bakeryText)}}>{bakeryText[2]}</NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>}
        <div className="dessert" style={stMenuChapterItems} onClick={e => goToChapter(e, desserts, chaptersName, chapterDishesText)}>
            <img src={dessert} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterDishesText[5]}</span>
        </div>
        <div className="drinks" style={stMenuChapterItems} onClick={e => goToChapter(e, drinkss, chaptersName, chapterDishesText)}>
            <img src={drinks} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterDishesText[6]}</span>
        </div>
        <div className="souces" style={stMenuChapterItems} onClick={e => goToChapter(e, soucess, chaptersName, chapterDishesText)}>
            <img src={souces} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterDishesText[7]}</span>
        </div>
        <div className="canned" style={stMenuChapterItems} onClick={e => goToChapter(e, canneds, chaptersName, chapterDishesText)}>
            <img src={canned} style={stImgMenuChapter}/>
            <span style={stTextMenuChapter}>{chapterDishesText[8]}</span>
        </div>
    </div>
    <Container className="container">
        <Row className="g-4">
            <Col className="title" xs={12} md={12} style={stContainerCards}>
                <div className="container-title-chapter" >
                    <h1 className="title-chapter p-2" >{titleChapter}</h1>
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