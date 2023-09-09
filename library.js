const myLibrary = [];

const booklist = document.querySelector(".booklist");

const addbookbtn = document.getElementById("addbookbtn");

const bookform = document.getElementById("bookform");

addbookbtn.addEventListener("click", () => {
    bookDialog.showModal();
  });

const confirmbtn = document.getElementById("confirmBtn");

confirmbtn.addEventListener("click", (event) => {
    event.preventDefault();
    let booktitle = document.querySelector("#booktitle").value;
    let bookauthor = document.querySelector("#bookauthor").value;
    let bookpages = document.querySelector("#bookpages").value;
    let bookread = document.querySelector("#bookread");
    let bookreadtext= bookread.options[bookread.selectedIndex].text;

    console.log(booktitle, bookauthor, bookpages, bookreadtext);

    addBookToLibrary(booktitle, bookauthor, bookpages, bookreadtext);

    bookform.reset();
    bookDialog.close();
});


const bookDialog = document.getElementById("bookDialog");


function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
}

function addBookToLibrary(title, author, pages, read) {
    let index = myLibrary.length;
    myLibrary.push(new Book(title, author, pages, read, index));
    addBookToDisplay(index);
}

function addBookToDisplay(index) {
    let book = myLibrary[index];

    let bookdiv = document.createElement('div');
    bookdiv.classList.add("book");

    let booktitle = document.createElement('p');
    booktitle.textContent = book.title;

    let bookauthor = document.createElement('p');
    bookauthor.textContent = book.author;

    let bookpages = document.createElement('p');
    bookpages.textContent = book.pages;

    let bookread = document.createElement('p');
    bookread.textContent = book.read;
    
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('removebtn');
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', function(){
        removeBook(book.index);
        rebuildBookList();
    });

    let changereadstatusbtn = document.createElement('button');
    changereadstatusbtn.classList.add('changestatusbtn');
    changereadstatusbtn.textContent = 'Change Read Status';
    changereadstatusbtn.addEventListener('click', function() {
        changeReadStatus(book.index);
        rebuildBookList();
    });
    
    bookdiv.append(booktitle, bookauthor, bookpages, bookread, removeBtn, changereadstatusbtn);
    booklist.append(bookdiv);
}

function removeBook(index) {
    if (index >= 0){
        myLibrary.splice(index, 1);
    }
}

function changeReadStatus(index) {
    if (index < 0) {
        return;
    }
    if (myLibrary[index].read === 'No') {
        myLibrary[index].read = 'Yes';
    }
    else {
        myLibrary[index].read = 'No';
    }
}

function rebuildBookList() {
    const display = document.getElementById('booklist');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
   
    for (let i=0; i<myLibrary.length; i++){
        addBookToDisplay(i);
    }
}