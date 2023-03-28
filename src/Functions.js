import React, {useContext} from "react";
import Context from "./Context";


export default (id) => {
    const {api,token, userToken, apiUser, setFavourite, favourite, setFlagLike, flagLike} = useContext(Context);

    const setLike = () => {
        if(flagLike){
            if(token){
                api.deleteLike(id)
                    .then(res => res.json())
                    .then(data => {
                        setFavourite(prev => {
                            if(favourite.length > 0){
                                setFlagLike(false);
                                return prev.filter(recipe => recipe._id !== id)   
                            }else{
                                setFavourite()
                            }
                        })
                    })
            }else if(userToken){
                apiUser.deleteLike(id)
                    .then(res => res.json())
                    .then(data => {
                        setFavourite(prev => {
                            if(favourite.length > 0){
                                setFlagLike(false);
                                return prev.filter(recipe => recipe._id !== id)   
                            }else{
                                setFavourite()
                            }
                        })
                    })
            }
            
        }else{
            if(token){
                api.addLike(id)
                .then(res => res.json())
                .then(data => {
                    setFavourite(prev => {
                        return [...prev,data]
                    })
                    setFlagLike(true)
                })
            }else if(userToken){
                apiUser.addLike(id)
                .then(res => res.json())
                .then(data => {
                    setFavourite(prev => {
                        return [...prev,data]
                    })
                    setFlagLike(true)
               })
            }
        }
            
    }

    const  filtredRecipes = (arr, strName) => {
        let result = [];
        arr.map(rcp => {
            let chapter_index = (rcp.tags).length - 2;
            if(rcp.tags[chapter_index] === strName){
                result.push(rcp);  
            }
        })
        return result;
    }
    return {filtredRecipes, setLike}
}




