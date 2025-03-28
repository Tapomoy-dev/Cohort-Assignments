const booksContainer = document.getElementById("booksContainer") ;
const searchBar = document.getElementById("searchBar");
const sortByLetter = document.getElementById("sortByLetter");
const sortByDate = document.getElementById("sortByDate");
const toggleBtn = document.getElementById("toggleBtn");
const prevPage = document.getElementById("prevPage");
const nextPage= document.getElementById("nextPage");
const pageInfo= document.getElementById("pageInfo");
const API_URL = "https://api.freeapi.app/api/v1/public/books";


let books = [];
let currentPage = 1;
let totalPages = 1;
let isGridView = false;


// fetching data from api
async function fetchbooks(page=1){
    try {
        const response =await fetch (`${API_URL}?page=${page}`);

        if (!response.ok){
            throw new Error("Network error:"+ response.status);
            
        }
        const bookData = await response.json();
        books = bookData.data.data;
        totalPages = bookData.data.totalPages;
        updatePagenavigation();
        displayBooks(books);
    } catch(error){
        console.log("Error fetching videos:", error);
        
    }
   
}

// function for displaying books
function displayBooks(bookList) {
    booksContainer.innerHTML = "";
    booksContainer.className = isGridView ? "gridView" : "ListView"

    // console.log(booksContainer.className);

    bookList.forEach(book => {
        const {title, authors, publisher, publishedDate, imageLinks, infoLink } = book.volumeInfo;
        
        const bookDiv = document.createElement("div");
        bookDiv.className = "bookDiv";
        bookDiv.innerHTML = `
            <img src = " ${imageLinks.thumbnail}" alt="${title}">

            <div>
                <h3> ${title}</h3>
                <p><span> Author: </span>${authors ? authors.join(","): "Unknown"} </p>
                <p><span> Publisher: </span> ${publisher || "Unknown"}</p>
                <p><span> Published Date: </span> ${publishedDate || "N/A"}</p>
               <a href = "${infoLink}" target= "_blank"> More Info </a>
            </div>
        `;
        booksContainer.appendChild(bookDiv);
        
    });
    
}

// function for searching books
searchBar.addEventListener("input",() => {
    const query =searchBar.value.trim().toLowerCase();
    const filteredBooks = books.filter(book =>
        book.volumeInfo.title.toLowerCase().includes(query) 
        );
    
    console.log(filteredBooks);
    displayBooks(filteredBooks);

})

// sorting of books by letters on book title
sortByLetter.addEventListener("click",()=>{
    books.sort((a,b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
    
    displayBooks(books);
})

// sorting of books by date
sortByDate.addEventListener("click",()=>{
    books.sort((a,b) => new Date (a.volumeInfo.publishedDate) - new Date(b.volumeInfo.publishedDate));
    displayBooks(books);
})  

// toggle view
toggleBtn.addEventListener("click", ()=>{
    isGridView =!isGridView;
    toggleBtn.textContent =isGridView? "List View": "Grid View";
    displayBooks(books);
})

// page navigation controls

nextPage.addEventListener("click",() => {
    if (currentPage< totalPages) {
        Page=currentPage++;
        fetchbooks(Page);
    }
})

prevPage.addEventListener("click", () => {
    if (currentPage>1) {
        Page=currentPage--;
        fetchbooks(Page);
    }
})

function updatePagenavigation() {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
    
}

// loading to the web page
fetchbooks();