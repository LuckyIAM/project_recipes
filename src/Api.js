class Api {
    constructor(token){
        this.path = "https://api.react-learning.ru";
        this.token = token;
    }
    // POST https://api.react-learning.ru/signup
    getSignUp(body){
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    }
    //POST https://api.react-learning.ru/signin // авторизация
    getSignIn(body){
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(body)
        })
    }
    //POST https://api.react-learning.ru/v2/:groupId/posts
    addBlog(body){
        return fetch(`${this.path}/v2/group-7/posts`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    // GET https://api.react-learning.ru/v2/:groupId/posts
    getBlogs(){
        return fetch(`${this.path}/v2/group-7/posts`,{
            method: "GET",
            headers: {
                authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json"
            }
        })
    }
    // GET https://api.react-learning.ru/v2/:groupId/posts/:id
    getRecipe(id_recipe){
        return fetch(`${this.path}/v2/group-7/posts/${id_recipe}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${this.token}`,
                "Context-Type": "application/json" 
            }
        })
    }
    //PATCH https://api.react-learning.ru/v2/:groupId/posts/:postId
    editRecipe(id, body){
        return fetch(`${this.path}/v2/group-7/posts/${id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
    //POST https://api.react-learning.ru/v2/:groupId/posts/comments/:postId
    addComment(idRecipe, body){
        return fetch(`${this.path}/v2/group-7/posts/comments/${idRecipe}`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
    // GET https://api.react-learning.ru/v2/:groupId/posts/comments/:postId
    getComment(idRec){
        return fetch(`${this.path}/v2/group-7/posts/comments/${idRec}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json"
            }
        })
    }
    //PUT https://api.react-learning.ru/v2/:groupId/posts/likes/:postId 
    addLike(id){
        return fetch(`${this.path}/v2/group-7/posts/likes/${id}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json"
            }
        })
    }
    // DELETE https://api.react-learning.ru/v2/:groupId/posts/likes/:postId
    deleteLike(id_recipe){
        return fetch(`${this.path}/v2/group-7/posts/likes/${id_recipe}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${this.token}`,
                "Contant-Type": "application/json"
            }
        })
    }
}
export default Api;