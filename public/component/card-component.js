export default class CardComponent extends HTMLElement{
    constructor(){
        super();
        this._root = this.attachShadow({mode:'open'})
    }

    likeBtn;
    
    connectedCallback(){
        
        let post = this.post
        let tagsFormated='';
        let tags = ''
        tags = post.tags.split(',')
        
        tags.forEach(tag => {
            tag = `<span class="tag">#${tag}</span>`
            tagsFormated+= tag
        });
        this._root.innerHTML = `<style>
                                    @import "./component/card-component.css" 
                                </style>
                                <div class="card" id="post${post.id}">
                                    <img src="img/${post.img}" alt="image" >
                                    <div class="imgDescription">
                                        <h3 class="title">${post.title}</h3>
                                        <div class="likeBtn" >&#10084;</div>
                                    </div>   
                                    <div class="tags" >
                                        ${tagsFormated}
                                    </div>
                                </div>`
                            
        this.likeBtn  = this._root.querySelector('.likeBtn');
        
        this.likeBtn.addEventListener('click',this.likeAnImage );

        this.updateLikeBtn()
        

    }

    likeAnImage(){    
        this.dispatchEvent(
            new CustomEvent('clickOnLikeB'), {
                detail: { cliked: this.post },
        });
        if(this.style.color ==="red"){
            this.style.color ="grey"
        } else{
            this.style.color ="red"
        }
    }

    updateLikeBtn(){
        const storageLikedPost =sessionStorage.getItem('likedPosts')
        if(storageLikedPost.includes(this.shadowRoot.querySelector('.card').getAttribute('id'))){
            this.likeBtn.style.color = 'red'
        }else {
            this.likeBtn.style.color = 'grey'
        }
    }
}