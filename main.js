class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  static dispalyBooks() {
    const books = Store.getBooks();
    books.forEach(book => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
    `;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      // console.log(el.classList);

      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }
  static clearFilds() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    let books = [];
    if (localStorage.getItem("books") !== null) {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, ind) => {
      if (book.isbn === isbn) {
        books.splice(ind, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// event on mounting the dom

document.addEventListener("DOMContentLoaded", UI.dispalyBooks);

document.getElementById("book-form").addEventListener("submit", e => {
  // prev
  e.preventDefault();
  //prev

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  if (title !== "" && author !== "" && isbn !== "") {
    const book = new Book(title, author, isbn);
    //console.log(book);
    UI.addBookToList(book);
    //
    Store.addBook(book);
    UI.showAlert("Book Added", "success");
    UI.clearFilds();
  } else {
    UI.showAlert("Please fill in all fields", "danger");
  }
});
console.log(window.localStorage.books);

document.getElementById("book-list").addEventListener("click", e => {
  UI.deleteBook(e.target);
  //

  console.log(e.target.parentElement.previousElementSibling.textContent);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert("Book Deleted", "success");
});
