import React, { useContext, useState } from "react";
import Context from "../../Context";

export default () => {
    const {api, dataStep, setDataStep, dataRecipe, setDataRecipe, setFlagActiv, idRecipe} =useContext(Context);
        const [valueTags, setValueTags] = useState(dataStep);

    const addStepRecipe = e => {
        e.preventDefault();
        if(dataRecipe){
            let index = dataRecipe.tags.length - 2;
            console.log(index, dataStep);
            let tags = dataRecipe.tags
            tags.splice(index, 0, dataStep)
            api.editRecipe(idRecipe, {"tags": tags})
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    localStorage.setItem("recipe", JSON.stringify(data));
                    setDataRecipe(JSON.parse(localStorage.getItem("recipe")));
                    setValueTags(JSON.parse(localStorage.getItem("recipe")).tags[index]);
                    setFlagActiv(false);
                    window.location.reload()
            })
            
        }
    }

    const cancelEdit = e => {
        e.preventDefault();
        setFlagActiv(false);
    }

    const stHeightTextarea ={
        height: "200px"
    }

    return <div className="input-container">
        <textarea className="textarea w-50 m-2" style={stHeightTextarea} value={dataStep} onChange={e => setDataStep(e.target.value)}/>
        <div className="buttons-container m-4">
            <button className="my_btn mx-2" onClick={addStepRecipe}>Добавить шаг</button>
            <button className="my_btn mx-2" onClick={cancelEdit}>Отменить шаг</button>
        </div>
    </div>
}