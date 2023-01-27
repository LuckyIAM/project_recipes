import React, { useEffect, useContext, useState} from "react";
import Context from "../Context";
import Functions from "../Functions";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Figure, Button, ButtonGroup, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import meseaure from "../assets/measuring-cup-icon.png";
import { Clock, ChatText, Fire} from "react-bootstrap-icons";
import cooking from "../assets/cooking-icon.png";
import paperCraft from "../assets/paper-crafts-icon.png"
import craft from "../assets/craft-icon.png";
import Comments from "../components/Comments";
import RecentRecipes from "../components/RecentRecipes";
import FollowUs from "../components/FollowUs";

export default () => {
    const {api, apiDefault, token, userToken, apiUser, setIdRecipe, flagLike, setFlagLike, userId, favourite, dataRecipe, setDataRecipe} = useContext(Context);
    let params = useParams();
    const func = Functions(params.id);
    const [description, setDescription] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [nameIngredient, setNameIngredient] = useState([]);
    const [unitsOfMeasurement, setUnitsOfMeasurement] = useState([]);
    const [quantityIngredient, setQuantityIngredient] = useState([]);
    const [measurement, setMeasurement] = useState([]);
    const [count, setCount] = useState(2);
    const [calories, setCalories] = useState("");
    const [caloriesNumber, setCaloriesNumber] = useState([]);
    const navigateToEditRecipe = useNavigate();
    const [dataRecipeTags, setDataRecipeTags] = useState("");
    const [stepsDescriptionRecipe, setStepsDescriptionRecipe] = useState([])
    const navigateToAddComment = useNavigate();

    
    
    useEffect(() => {
        if(token){
            api.getRecipe(params.id)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("recipe", JSON.stringify(data));
                    setDataRecipe(JSON.parse(localStorage.getItem("recipe")));
                    localStorage.setItem("id-recipe", params.id);
                    setIdRecipe(localStorage.getItem("id-recipe"));
                })  
        }else if(userToken){
            apiUser.getRecipe(params.id)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("recipe", JSON.stringify(data));
                    setDataRecipe(JSON.parse(localStorage.getItem("recipe")));
                    localStorage.setItem("id-recipe", params.id);
                    setIdRecipe(localStorage.getItem("id-recipe"));
                })
        }else {
            apiDefault.getRecipe(params.id)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("recipe", JSON.stringify(data));
                    setDataRecipe(JSON.parse(localStorage.getItem("recipe")));
                    localStorage.setItem("id-recipe", params.id);
                    setIdRecipe(localStorage.getItem("id-recipe"));
                })
        }
    }, [])
    console.log("dataRecipe", dataRecipe);
    useEffect(() => {
        if(dataRecipe){
            setIngredients([...String(String(dataRecipe.text).split('=>')[1]).split('\n')])            
            setDescription(String(dataRecipe.text).split('=>')[0]);
            setCalories(String(dataRecipe.text).split('=>')[2])
            setDataRecipeTags(dataRecipe.tags)    
        }
    },[dataRecipe])

    useEffect(() => {
        if(token){
            if(dataRecipe.likes.includes(userId)){
                setFlagLike(true)
            }
        }
    }, [dataRecipe])

    useEffect(() => {
        if(ingredients){
            setNameIngredient(ingredients.filter((ingrds, i) => i % 2 === 0));
            setUnitsOfMeasurement(ingredients.filter((ingrds, i) => i % 2 === 1))
        }
    }, [ingredients])

    useEffect(() => {
        if(unitsOfMeasurement){
            setQuantityIngredient([...unitsOfMeasurement.map(el => {
                if(el.match(/[0-9]{1,3}/g)){
                    return parseFloat(el.match(/[0-9].{1,3}/g));
                }else{
                    return "";
                }
            })])
            setMeasurement([...unitsOfMeasurement.map(el => {
                if(el.match(/[а-я]{1,6}/g)){
                    return el.match(/[а-я]{1,6}/g).join(" ");
                }else{
                    return "";
                }
            })])
        }
    },[unitsOfMeasurement])

    useEffect(() => {
        if(calories){
            setCaloriesNumber([...calories.match(/[0-9]{1,3}/g)])
        }
    }, [calories])

    useEffect(() => {
        if(dataRecipeTags){
            setStepsDescriptionRecipe([...dataRecipeTags.slice(0,dataRecipeTags.length - 2)])
        }
    }, [dataRecipeTags])
   

    const getCopied = () => {
        if(dataRecipe){
            navigateToEditRecipe("/editRecipe");
        }
    }
    const addPortion = e => {
        e.preventDefault();
        setCount(count + 1);
    }

    const substractPortion = () => {
        if(count > 1){
            setCount(count - 1)
        }
    }

    const readComment = () =>{
        navigateToAddComment("/addcomment")
    }



    // console.log(unitsOfMeasurement, quantityIngredient, measurement, calories, caloriesNumber, dataRecipeTags, stepsDescriptionRecipe);
    console.log(dataRecipe, favourite, flagLike);
    const stContainerRecipe = {
        padding: "15px",
        borderRadius: "20px",
        margin: "10px"
    }

    const stCapIcon = {
        width: "30px",
        height: "30px"
    }

    const stText = {
        fontWeight: 800,
        fontSize: "20px"
    }
    const stButtonGrup = {
        background: "var(--main-color)",
        padding: "7px 14px",
        border: "1px solid #444",
    }
    
    const stTitleBox = {
        with: "80%"
    }
    const stAuthorImg = {
        width: "20px",
        height: "20px",
        borderRadius: "50%"
    }
    const stTitleInformation = {
        fontSize: "15px",
        fontWeight: 700
    }

    const stCaloriesBox = {
        padding: "20px",
        height: "150px"
    }
    const stCookingSteps = {
        paddingTop: "40px"
    }
    const stCookingIcon = {
        height: "40px",
        paddingRight: "10px"
    }
    const stTitleSteps ={
        fontSize: "25px",
        fontWeight: 800,
        paddingRight: "20px"
    }
    const stColckIcon = {
        color: "var(--main-color)",
        fontWeight: 700,
        paddingRight: "6px"
    }
    const stNumberStep ={
        fontSize: "120px",
        fontWeight: "500"
    }
    const stDescriptionStep = {
        width: "50%",
        textAlign: "justify",
        padding: "10px 20px"
    }
    const stImageStep = {
        height: "200px",
        width: "300px"
    }
    const stAdviceFrom ={
        fontSize: "15px",
        textAlign: "end",
        color: "#777",
        padding: "10px"
    }
    const stAdviceSpan = {
        fontStyle: "italic"
    }
    const stCol1 ={
        boxShadow: "0 0 10px 0 #777",
        borderRadius: "20px",
        margin: "20px 0px 20px 10px",
        width: "calc(66% - 20px)"
        
    }
    const stCol2 ={
        boxShadow: "0 0 10px 0 #777",
        borderRadius: "20px",
        margin: "20px 0px 20px 10px",
        width: "calc(35% - 20px)"
    }
    const stCol ={
        borderRadius: "20px",
        boxShadow: "0 0 10px 0 #777",
    }
    const stContainerCards2 ={
        margin: "20px 0px 20px 10px",
        width: "calc(35% - 20px)"
    }
    return <>
    <Container>
        <Row>
            <Col xs={12} md={8} style={stCol1}>
                <div className="container-recipe" style={stContainerRecipe}>
                    <h1 className="title font-weight-bold mt-4 mb-4 ">
                        {dataRecipe.title}
                    </h1>
                   {token && <div className="fw-bolder text-muted" title="Чтобы изменить рецепт, кликни.">id Рецепта:&nbsp; &nbsp;<span onClick={getCopied}>{dataRecipe._id}</span></div>}
                    <div className="mt-2 mb-3" style={stTitleInformation}>
                            <div className="info-author-and-reiting d-flex justify-content-between">
                                <div className="left-side">
                                    {(token || userToken) && dataRecipe.author && <img src ={dataRecipe.author.avatar} style={stAuthorImg}/>}
                                    {(token || userToken) && dataRecipe.author && <span>{dataRecipe.author.name}</span>}
                                </div>
                                {(token || userToken) &&<div className="right-side">
                                    <div className="fire-icon" >
                                        <ChatText onClick={readComment} title="Нажми и оставь отзыв!"/>&nbsp; &nbsp;
                                        <Fire onClick={e =>{
                                            e.preventDefault();
                                            func.setLike()
                                            }} 
                                            title="Лайкни" 
                                            className={flagLike ? "text-warning" : "text-dark"}
                                            />
                                    </div>
                                </div>}
                            </div>
                    </div>
                    <div className="d-flex justify-content-center"><Figure.Image src={dataRecipe.image} style={{width: "100%"}}/></div>
                    <div className="mt-6">{String(dataRecipe.text).split('=>')[0]}</div>
                    {dataRecipe.tags[dataRecipe.tags.length - 1] !== "0" ?<Row>
                        <Col sx={8} md={8}>
                        <div className="ingreadients pt-5">  
                        <div className="ingredients-box">
                            <div className="title-box d-flex justify-content-between" style={stTitleBox}>
                                <div className="row-direction">
                                    <img src={meseaure} style={stCapIcon}/>
                                    <span style={stText}>&nbsp; &nbsp;Ингредиенты</span> 
                                </div>
                                <span>Порции:&nbsp; &nbsp;</span>
                                <ButtonGroup className="bg-transparent rounded" >
                                    <Button style={stButtonGrup} onClick={substractPortion}>-</Button>
                                    <Button style={stButtonGrup}>{count}</Button>
                                    <Button style={stButtonGrup} onClick={addPortion}>+</Button>
                                </ButtonGroup>
                            </div>
                            
                            {nameIngredient.map((name, i) => 
                                <div className="item-ingredient">
                                    <Row>
                                        <Col xs={6} md={7} className="d-flex custom-control custom-checkbox">
                                        <label for="ingredient-name"><input id="ingredient-name" type="checkbox" className="form-check-input" />&nbsp; &nbsp;{name}</label>
                                        </Col>
                                        <Col xs={3} md={2}>
                                        <span>{".".repeat(19)}</span>
                                        </Col>
                                        <Col xs={3} md={3}>
                                        <span>{quantityIngredient[i] !== '' ? count * (quantityIngredient[i] / 2): ""}</span>&nbsp;<span>{ measurement[i]}</span>
                                        </Col>
    
                                    </Row>
                                </div>
                            )}     
                        </div>                                 
                    </div>
                        </Col>
                        <Col xs={4} md={4} className="d-flex justify-content-center align-items-center">
                            <div className="calories-box bg-light" style={stCaloriesBox}>
                                <span className="fw-bolder fs-5">На порцию:</span>
                                {caloriesNumber &&
                                <div className="calories">
                                    <div className="caloris-item  d-flex justify-content-between align-items-center">
                                        <div className="title-caloris">Калории:&nbsp; &nbsp;</div>
                                        <div className="number-caloris">{caloriesNumber[0]} ккал </div>
                                    </div>
                                    <div className="protein-item  d-flex justify-content-between align-items-center">
                                        <div className="protein">Белки </div>
                                        <div className="protein-number">{caloriesNumber[1]}%</div>
                                    </div>
                                    <div className="fats-item d-flex justify-content-between align-items-center">
                                    <div className="fats">Жиры</div>
                                    <div className="fats-number">{caloriesNumber[2]}%</div>
                                    </div>
                                   <div className="carbonydrates-item d-flex justify-content-between align-items-center">
                                   <div className="carbohydrates">Углеводы</div>
                                   <div className="carbohydrates-number">{caloriesNumber[3]}%</div>
                                   </div>
                                </div>
                                }
                            </div>

                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col sx={12} md={12}>
                        <div className="ingreadients pt-5">  
                            <div className="ingredients-box">
                                <div className="title-box">
                                    <div className="d-flex py-4">
                                        <img src={paperCraft} style={stCapIcon}/>
                                        <span style={stText}>&nbsp; &nbsp;Что вам нужно</span> 
                                    </div>
                            
                                <div className="d-flex flex-column">
                                {ingredients && ingredients.map((name) => 
                                    <div className="item-ingredient">
                                        <label for="ingredient-name">
                                            <input id="ingredient-name" type="checkbox" className="form-check-input" />&nbsp; &nbsp;{name}
                                        </label>     
                                    </div>
                                )}  
                                </div>   
                            </div>  
                        </div>                               
                    </div>
                        </Col>
                        
                    </Row>} 
                    <div className="cooking-steps" style={stCookingSteps}>
                        <div className="steps-cooking-container d-flex justify-content-start align-items-center">
                            {dataRecipe.tags[dataRecipe.tags.length - 1] !== "0" ? 
                            <img src={cooking} style={stCookingIcon}/>
                            :<img src={craft} style={stCookingIcon}/>}
                            <div className="title-steps" style={stTitleSteps}>Шаги приготовления</div>
                            {dataRecipe.tags[dataRecipe.tags.length - 1] !== "0" ?
                            <span style={stColckIcon}><Clock/> {dataRecipeTags && dataRecipeTags[dataRecipeTags.length - 1]}</span>
                            : <span> </span>}
                        </div>
                        {stepsDescriptionRecipe && stepsDescriptionRecipe.map((step, i) =>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="step d-flex justify-content-between align-items-center">
                                            <div className="number-step" style={stNumberStep}>
                                                {i + 1 }
                                            </div>
                                            <div className="description-step" style={stDescriptionStep}>{step.split("=>")[0]}</div>
                                            <div className="image-step"><img src={step.split("=>")[1]} style={stImageStep} /></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>)}
                        <div className="wise-advice">
                            <div className="title-advice" style={stTitleSteps}>Заметки от повора</div>
                            <div className="advice" style={stColckIcon}>
                            "Выключите телевизор, не отвечайте на телефонные звонки, просто сидите и читайте." 
                            <div style={stAdviceFrom}>Мудрый совет от: <span style={stAdviceSpan}>Lauren Braun Costello’s</span></div>
                            </div>
                            
                        </div>
                        
                    </div>
                   <Comments/>
                   
                </div>
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
// 63be992259b98b038f77a557
// Интересные, яркие, красивые, очень вкусные. Рулетики из крабовых палочек на праздничный стол - это отличная бюджетная закуска, которая станет украшением любого застолья и удивит своим замечательным вкусом. => Крабовые палочки
// 200 гр
// Яйца
// 3 шт.
// Твёрдый сыр
// 80 гр
// Чеснок
// 1 зубч.
// Майонез
// 2 стол.л.
// Петрушка
// по вкусу
// Перец черный молотый
// по вкусу => 
// 380 
// 52
// 41
// 7