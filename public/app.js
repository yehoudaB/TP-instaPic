// il faut faire npm i -g json-server'   puis  'json-server db.json --watch' pour commencer 

import CardComponent from './component/card-component.js';

const grid = document.querySelector('section');
let likedPosts = [];
const counter = document.querySelector('#counter');
const serachInput = document.querySelector('#search')
serachInput.addEventListener('keyup', showResult)


let allPosts=[];

const getPost = () =>{
    fetch('http://localhost:3000/posts')
    .then(response =>  response.json())
    .then((data) =>{
        allPosts = data
        data.forEach((post) => {
            const newElement = document.createElement('card-component')
            newElement.post = post;
            grid.appendChild(newElement)        
            newElement.addEventListener('click', updateLikeCounter)
        });
    }).then(()=>{
        serachInput.addEventListener('keyup', showResult)
    })
}
getPost();
customElements.define('card-component', CardComponent)



function updateLikeCounter(){
    const like = this.shadowRoot.querySelector('.likeBtn')
    if(like.style.color === 'red'){
        likedPosts.push(this.shadowRoot.querySelector('.card').id)
    }else{
        likedPosts.pop(this.shadowRoot.querySelector('.card').id)
    }
    console.log(likedPosts)

    counter.innerText = likedPosts.length
}




function showResult(){

    if(this.value.length >0){
        let stringPost;
        removeAllChildNodes(grid);

        allPosts.forEach(post =>{
            stringPost = JSON.stringify(post)
            stringPost = stringPost.toLocaleLowerCase()
            if(stringPost.includes(this.value)){
                const newElement = document.createElement('card-component')
                newElement.post = post;
                grid.appendChild(newElement);
                newElement.addEventListener('click', updateLikeCounter)
            }            

                       
/*             if(stringPost.includes(this.value) == false){
               
                console.log(grid.childNodes[post.id].shadowRoot.querySelector('#post'+post.id))
                grid.childNodes[post.id].shadowRoot.removeChild(grid.childNodes[post.id].shadowRoot.querySelector('#post'+post.id))
            }   */
            
       })
       
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}