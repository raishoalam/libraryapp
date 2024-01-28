let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let message = document.getElementById("message");
let headingEl = document.createElement("h1");
let spinner = document.getElementById("spinner");

function appendsearchResults(search_results) {
    if (search_results.length < 1) {
        message.textContent = "No results found";
        message.style.color = "#4a484a";
        message.style.fontSize = "25px";
        message.style.fontWeight = "700"
        searchResults.textContent = "";
        headingEl.textContent = "";
    } else {
        searchResults.textContent = "";
        message.textContent = "";
        headingEl.textContent = "Popular Books";
        headingEl.style.fontWeight = "600";
        headingEl.style.fontSize = "25px";
        headingEl.style.color = "#fff";
        headingEl.style.marginTop = "20px";
        headingEl.style.marginLeft = "10px";
        searchResults.appendChild(headingEl);

        for (let eachItem of search_results) {
            let title = eachItem.title;
            let image = eachItem.imageLink;
            let author = eachItem.author;
            let imageEl = document.createElement("img");
            let textEl = document.createElement("p");
            imageEl.setAttribute("src", image);
            textEl.textContent = author;
            searchResults.appendChild(imageEl);
            searchResults.appendChild(textEl);
            console.log(eachItem);
        }
    }
}
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        let searchInputValue = searchInput.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                appendsearchResults(search_results);
                spinner.classList.toggle("d-none");
            });
    }
});