let myLibrary = [];

const newBookForm = document.getElementById("new-book-form");
const newBookBtn = document.getElementById("new-book-btn");

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
};

function addBookToLibrary(name, author, pages, read) {
    const book = new Book(name, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.name;

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = `by ${book.author}`;

        const bookPages = document.createElement("p");
        bookPages.textContent = `${book.pages} pages`;

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);

        const readStatusBtn = document.createElement("button");
        readStatusBtn.textContent = book.read ? "Read" : "Unread";
        readStatusBtn.addEventListener("click", () => {
            book.toggleReadStatus();
            displayBooks();
        });
        bookCard.appendChild(readStatusBtn);

        // Add a button to remove the book
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            myLibrary.splice(i, 1);
            displayBooks();
        });
        bookCard.appendChild(removeBtn);
        bookList.appendChild(bookCard);
    }
}

displayBooks();

newBookBtn.addEventListener("click", () => {
    newBookForm.style.display = "block";
});

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("title-input");
    const authorInput = document.getElementById("author-input");
    const pagesInput = document.getElementById("pages-input");
    const readInput = document.getElementById("read-input");

    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    displayBooks();
    newBookForm.reset();
    newBookForm.style.display = "none";
});
