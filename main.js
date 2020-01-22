class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  static dispalyBooks() {
    const storedBookd = [
      {
        title: "roman o Londonu",
        author: "Milos Crnjanski",
        isbn: "049583"
      },
      {
        title: "roman o Londonu 2",
        author: "Milos Crnjanski",
        isbn: "049585"
      }
    ];
    const books = storedBookd;
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
      console.log(el.classList);

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

// event on mounting the dom

document.addEventListener("DOMContentLoaded", UI.dispalyBooks);

document.getElementById("book-form").addEventListener("submit", e => {
  // prev
  e.preventDefault();
  //prev

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  }
  const book = new Book(title, author, isbn);
  console.log(book);
  UI.addBookToList(book);
  UI.showAlert("Book Added", "success");
  UI.clearFilds();

  // return book;
});

document.getElementById("book-list").addEventListener("click", e => {
  UI.deleteBook(e.target);
  UI.showAlert("Book Deleted", "success");
});
