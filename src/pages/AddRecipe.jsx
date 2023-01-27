import React, { useState } from "react";
import { useContext } from "react";
import Context from "../Context";
import { PlusCircle } from "react-bootstrap-icons";
import WarningNotToken from "../components/WarningNotToken";

export default () => {
    const {api, token } = useContext(Context);
    const [nameDishes, setNameDishes] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [timeDishes, setTimeDishes] = useState([]);
    const [chapter, setChapter] =useState('')
    const [step, setStep] = useState("");
    const [steps, setSteps] = useState([]);
    const [timeSteps, setTimeSteps] = useState()
    const [countStep, setCountStep] = useState(0);

    const containerAddRecipe = {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
    const stAddSteps ={
        marginTop: "15px",
        padding: "4px 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        border: "1px solid #777"
    }
    const formRecipe ={
        width: "300px",
    }
    const stGroupForm = {
        paddingTop: "15px",
        gap: "5px"
    }
    const stTitleAddRecipe = {
        textAlign: "center"
    }
    const stNameDishe = {
        fontWeight: 800
    }
    const stTextArea = {
        padding: "10px"
    }
    const buttonAddRecipe = {
        position: "relative",
        left: 0,
        top: "245px",
        width: "300px",
        marginTop: "15px"
    }

    const stSddSteps={
        position: "relative",
        top: "-30px",
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
    }
    const stColoumn = {
        display: "flex",
        flexDirection: "column",
        width: "300px"
    }

    const addDataRecipe = (e) => {
        e.preventDefault();
        e.stopPropagation();
        steps.push(chapter);
        steps.push(timeDishes);
        let body = {
            "title": nameDishes,
            "text": description,
	        "image": img,
            "tags": steps
        }
        api.addBlog(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setNameDishes("");
                setDescription("");
                setImg("");
                setCountStep(0);
                setTimeDishes("");
                setSteps(steps.splice(0, steps.length))
                console.log(message.data);
            })
        // window.location.reload()
    }
    console.log(steps, timeSteps, chapter); 
    return<> {token ? <div className="container-add-recipe" >
        <h1 className="title-add-recipe" style={stTitleAddRecipe}>
            Добавить Рецепт
        </h1>
        <div className="container-form-recipe" style={containerAddRecipe}>
            <form className="form-recipe" style={formRecipe} >
                <div className="column-direction" style={stGroupForm}>
                    <label htmlFor="name-dishe" style={stNameDishe}>Незвание</label>
                    <input id="name-dishe" 
                    type="text" 
                    value={nameDishes} 
                    onChange={(e) => {
                        setNameDishes(e.target.value)
                    }}/>
                </div>
                <div className="column-direction" style={stGroupForm}>
                    <label htmlFor="text-dishe" style={stNameDishe}>Описание и Ингридиенты</label>
                    <textarea id="text-dishe" 
                    type="text" 
                    rows="6" 
                    cols="50" 
                    style={stTextArea} 
                    placeholder="<Описание:> текст => <ингредиенты:> <1>text<*> <2>text<*>"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    />
                </div>
                <div className="column-direction" style={stGroupForm}>
                    <label htmlFor="image-dishe" style={stNameDishe}>Ссылка на изображение</label>
                    <input id="image-dishe" 
                    type="text"
                    value={img}
                    onChange={(e) => {
                        setImg(e.target.value)
                    }}
                    />
                </div>
                <div className="column-direction" style={stGroupForm}>
                    <label htmlFor="time-dishe" style={stNameDishe}>Время приготовления</label>
                    <input id="time-dishe" 
                    type="text"
                    placeholder="45 мин"
                    value={timeDishes}
                    onChange={(e) => {
                        setTimeDishes(e.target.value)
                    }}
                    />
                </div>
                <div className="column-direction" style={stGroupForm}>
                    <label htmlFor="chapter" style={stNameDishe}>Категория блюд</label>
                    {chapter === "" ? setChapter("Закуски")
                    :
                    <select id="chapter" value={chapter} onChange={e => setChapter(e.target.value)}>
                        <option defaultValue>Закуски</option>
                        <option>Салат</option>
                        <option>Суп</option>
                        <option>Вторые блюда/Мясные</option>
                        <option>Вторые блюда/Рыбные</option>
                        <option>Вторые блюда/Овощные</option>
                        <option>Выпечка Торты/кексы/печенье</option>
                        <option>Выпечка Блины/оладье</option>
                        <option>Выпечка Хлеб/булочки</option>
                        <option>Десерты</option>
                        <option>Напитки</option>
                        <option>Соусы</option>
                        <option>Заготовки</option>
                        <option>Советы</option>
                        <option>Сервировка/Салфетки</option>
                        <option>Сервировка/Сладкое меню</option>
                        <option>Сервировка/Напитки</option>
                        <option>Сервировка/Вазы</option>
                        <option>Сервировка/Скатерти</option>
                        <option>Сервировка/Именные таблички и меню</option>
                    </select>}
                </div>
                    
                <button className="my_btn" 
                type="submit" 
                style={buttonAddRecipe}
                onClick={addDataRecipe}>
                    Добавить Рецепт
                </button>
            </form>
        </div>
        <div className="add-steps" style={stSddSteps}>
            <div className="column" style={stColoumn}>
                <label htmlFor="step" style={stNameDishe}>Этап {countStep + 1}</label>
                <textarea id="step"
                type="text" 
                rows="6" 
                cols="50"
                value={step}
                onChange={e => {
                    setStep(e.target.value)
                }}/>
                <button className="add-step" 
                type="button"
                style={stAddSteps} 
                onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    setCountStep(countStep + 1);
                    setSteps(prev => {
                        return [...prev, step] 
                    })
                    setStep("")    
                }}>
                    <PlusCircle/> &nbsp; Добавить этап
            </button>
            </div>
        </div>
    </div>:
    <WarningNotToken/>}
    </>
}

/* Описание: Отличный рецепт вкусного рыбного филе в соевом соусе. Приглашенные гости по достоинству оценят Ваше мастерство как кулинара! => ингредиенты:1 Рыбное филе * 2 Соевый соус * 3 Мука * 4 Соль * */