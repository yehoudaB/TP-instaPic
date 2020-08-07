// il faut faire npm i -g json-server'   puis  'json-server db.json --watch' pour commencer 

import CardComponent from './component/card-component.js';

const grid = document.querySelector('section');
const modalContent = document.getElementById('titlesPostsLiked')
let likedPosts = [];
let likedPostsTitles =[];
const counter = document.querySelector('#counter');
const serachInput = document.querySelector('#search')
serachInput.addEventListener('keyup', showResult)

document.getElementById('btnLikedPosts').addEventListener('click', showLikedPosts)



const getLocalStorage = () =>{
    if(sessionStorage.getItem('likedPosts')){
        const storageStringLikedPost = sessionStorage.getItem('likedPosts')
        likedPosts = storageStringLikedPost.split(',')
        counter.innerText = likedPosts.length
    }
}
getLocalStorage();
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
    if(likedPosts.find(post => post === this.shadowRoot.querySelector('.card').id)){    
        likedPosts.pop(this.shadowRoot.querySelector('.card').id)
    }else{  
        likedPosts.push(this.shadowRoot.querySelector('.card').id)
    }    
    counter.innerText = likedPosts.length
    sessionStorage.setItem('likedPosts', likedPosts)
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
       })
       
    }
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showLikedPosts(){
    likedPostsTitles = [];
    modalContent.innerHTML =''
    likedPosts.forEach(likedPost =>{
        const lp = likedPost.replace('post', '')
        const found = allPosts.find(p => p.id === lp)
        likedPostsTitles.push(found.title)
    })
    console.log(modalContent)
    
    likedPostsTitles.forEach(title =>{
        console.log(title)
        modalContent.innerHTML += '<p>'+ title +'</p>'

    })
    
}



////////////////// for the modal

let modal = document.getElementById("myModal");
let btn = document.getElementById('btnLikedPosts');
let span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}