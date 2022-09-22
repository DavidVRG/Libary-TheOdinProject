/* VARIABLE DECLARATIONS */
const showAddBook = document.querySelector('.addBook');
const addBookUI = document.querySelector('.addBookUI');
const cards = document.querySelector('.cards');

/* CARDS */
const cardArray = [];

/* CARD TEMPLATE */
function cardTemplate(object){
    return `
    <div class="card">
        <div class="card-body">
            <div class="id" dataset="${object.id}"></div>
            <div class="author">Author: <span class="authorJS">${object.author}</span></div>
            <div class="title">Title: <span class="titleJS">${object.title}</span></div>
            <div class="number-of-pages">Pages: <span class="pageJS">${object.pages}</span></div>
            <div class="statusUI">Status: <span class="statusJS">${object.status}</span></div>
        </div>
        <div class="btn-group">
            <button class="remove">Remove</button>
            <button class="status">Status</button>
        </div>
    </div>
    `
}

/* SHOW ADD BOOK UI */
showAddBook.addEventListener('click', () => {
    addBookUI.classList.toggle('showUI')
})

/* ADD BOOK */
addBookUI.addEventListener('submit', (event) => {
    event.preventDefault();
    let author = event.target[0].value;
    let title = event.target[1].value;
    let pages = event.target[2].value;
    cardArray.push({author: author, title: title, pages:pages, id: guidGenerator(), status: 'Unread'})
    refreshCardsUI()
    removeBook()
})

/* REMOVE BOOK */
function removeBook(){
    const removeBook = document.querySelectorAll('.remove');
    removeBook.forEach(e => {
        e.addEventListener('click', () => {
            let id = e.parentNode.parentNode.querySelector('.id').getAttribute('dataset');
            cardArray.forEach(array => {
                if(id == array.id){
                    cardArray.splice(cardArray.indexOf(array), 1)
                    refreshCardsUI()
                }
            })
        })
    })
}

/* CHANGE STATUS */
function changeStatus(){
    const status = document.querySelectorAll('.status');
    removeBook()
    status.forEach(e => {
        e.addEventListener('click', () => {
            let id = e.parentNode.parentNode.querySelector('.id').getAttribute('dataset');
            cardArray.forEach(array => {
                if(id == array.id && array.status == 'Unread'){
                    array.status = 'Read';
                    refreshCardsUI()
                }else if(id == array.id && array.status == 'Read'){
                    array.status = 'Unread';
                    refreshCardsUI()
                }
            })
        })
    })
}

/* REFRESH CARDS UI */
function refreshCardsUI(){
    cards.innerHTML = '';
    cardArray.forEach(element => {
        cards.insertAdjacentHTML('beforeend', cardTemplate(element))
    })
    changeStatus()
}

/* RANDOM ID */
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}