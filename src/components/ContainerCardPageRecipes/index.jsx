import React,{useContext} from "react";
import Context from "../../Context";
import CardPageRecipes from "../CardPageRecipes";

export default({arr}) =>  {
    const {months} = useContext(Context);
    
    return <div className="container-cards">
                    {arr && arr.map((rcp, i) => <CardPageRecipes
                        key={i}
                        _id={rcp._id}
                        image_dishe={rcp.image}
                        image_author={rcp.author.avatar}
                        name_author={rcp.author.name}
                        create_date={`${new Date(rcp.created_at).getDate()}
                        ${months[new Date(rcp.created_at).getMonth()]}
                        ${new Date(rcp.created_at).getFullYear()}`}
                        quantity_like={rcp.likes.length > 5 ? <span className="text-warning">{rcp.likes.length}</span> : <span className="text-dark">{rcp.likes.length}</span> }
                        name_recipe={rcp.title}
                        about_dishe={rcp.text.length > 55 ? `${rcp.text.slice(0,55)}...` : rcp.text}
                        />)
                    }
                </div>
}