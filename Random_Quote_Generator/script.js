const generateQuote = document.getElementById('generateQuote');
const newButton = document.getElementById('newQuote');
const copyButton = document.getElementById('copyQuote');
const shareButton = document.getElementById('share');

// adding event listener to each button with function
newButton.addEventListener('click', generateNewQuote);
copyButton.addEventListener('click',copyToClipboard);
shareButton.addEventListener('click',shareOnX);

// fetching freeapi and generating new quote
function generateNewQuote(){
    fetch ('https://api.freeapi.app/api/v1/public/quotes/quote/random')
    .then((response)=>response.json())
    .then((data) => {
        const quote = data.data;
         generateQuote.textContent = `${quote.content}   - ${quote.author}`

    })
    .catch(() =>{
        generateQuote.textContent = "Something went wrong"
    })
}



// creating a function to copy the quote to clipboard using window.navigator.clipboard method
function copyToClipboard() {
    const quote = generateQuote.innerText
    window.navigator.clipboard.writeText(quote)
    .then(() => {
        alert("Copied to Clipboard");
    })
    .catch(() => {
        alert("Failed to Copy")
    })
}

//  creating a fumction for sharing the quote to 'X' platform 
function shareOnX() {
    const content = `${generateQuote.innerText}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`
    window.open(url, '_blank')
}
// to show daily quotes 
generateNewQuote();