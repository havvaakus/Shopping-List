import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://civcik-shopping-list-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = ""
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    

    let itemID = item[0]
    let itemValue = item[1]
    
    // bosluk girildigi zaman bos kutu eklememesi icin
    if (item[1].trim() === '') {
        console.error("Add to cart is failed: Empty Text");
        return;
    }
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    
    newEl.addEventListener("click", function() {
      
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
                      
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}

let siteOwnerName = "as a New Year's gift for Nani"; // Buradaki isim, siteyi yazanın adı olabilir

// HTML içerisindeki paragraf elementine sahibin adını ekleme
document.getElementById("siteOwner").textContent += siteOwnerName;