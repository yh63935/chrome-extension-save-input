let myWebsites = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const websitesFromLocalStorage = JSON.parse( localStorage.getItem("myWebsites") )
const tabBtn = document.getElementById("tab-btn")

if (websitesFromLocalStorage) {
    myWebsites = websitesFromLocalStorage
    render(myWebsites)
}

// Saves current tab as a saved website
tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { //retrieves current tab
        myWebsites.push(tabs[0].url)
        localStorage.setItem("myWebsites", JSON.stringify(myWebsites) )
        render(myWebsites)
    })
})

// Render the websites as list items
function render(websites) {
    let listItems = ""
    for (let i = 0; i < websites.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${websites[i]}'>
                    ${websites[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// Delete all websites from localStorage when  delete button is double-clicked
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myWebsites = []
    render(myWebsites)
})

// Adds input as saved websites
inputBtn.addEventListener("click", function() {
    myWebsites.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myWebsites", JSON.stringify(myWebsites))
    render(myWebsites)
})