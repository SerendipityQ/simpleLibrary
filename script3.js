let library=[{
    title: "Sherlock Holmes",
    author: "Sir Arthur Conan Doyle",
    pages: 234,
    status: "No"
  }];

class Book {
  constructor(title, author,pages,status) {
    this.title = title;
    this.author = author;
    this.pages=pages;
    this.status = status;
  }
}



//DOM ELEMENTS
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const status=document.querySelector('#read');
const table = document.querySelector("#table")
const tableBody = document.querySelector("#book-list");
const button=document.querySelector(".open-button");
const defaultRow=document.querySelector(".default")
const form=document.querySelector("#form1");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  render();
  clearForm();
  hideForm();
});



//SHOW / HIDE FORM
button.addEventListener("click",showForm);

function showForm() {
  form.style.display = 'block';
  document.getElementById('table').style.display = 'none';
}

function hideForm(){
  form.style.display = 'none';
  document.getElementById('table').style.display = 'block';
}



table.addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == "Delete") {
      if (confirm(`Are you sure you want to delete ${currentTarget.innerText}?`))
        deleteBook(findBook(library, currentTarget.innerText));
    }
    if ((e.target.innerHTML=="Yes")||(e.target.innerHTML=="No")) {
      changeStatus(findBook(library, currentTarget.innerText));
    }
    updateLocalStorage();
    render();
  });



function addBookToLibrary() {
  if (title.value.length === 0 || author.value.length === 0) {
    alert("Please, fill all the fields");
    return;
  }
  if(status.checked==true){
  status.value="Yes";
  }else{
  status.value="No";
  }
  const newBook = new Book(title.value, author.value,pages.value,status.value);

  library.push(newBook);
  updateLocalStorage();
}

function changeStatus(book) {
  if (library[book].status === "Yes") {
    library[book].status = "No";
  } else library[book].status = "Yes";
}

function deleteBook(currentBook) {
  library.splice(currentBook, currentBook + 1);
}



function findBook(libraryArray, title) {
  if (libraryArray.length === 0 || libraryArray === null) {
    return;
  }
  for (book of libraryArray)
    if (book.title === title) {
      return libraryArray.indexOf(book);
    }
}


function clearForm() {
  title.value = "";
  author.value = "";
  pages.value="";
  status.checked=false;
}


function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));

}
function checkLocalStorage() {
  if (localStorage.getItem("library")) {
    library = JSON.parse(localStorage.getItem("library"));
  }
}


function render() {
  checkLocalStorage();
  tableBody.innerHTML = "";
  library.forEach((book) => {
    const htmlBook = `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</button></td>
        <td><button id="read-btn">${book.status}</button></td>
        <td><button id="del-btn">Delete</button></td>
      </tr>
      `;
    tableBody.insertAdjacentHTML("afterbegin", htmlBook);
  });
}

render();
