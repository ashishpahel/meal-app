// decalaring all variable that needed in this app
const searchBtn = document.getElementById('input-button');
const mealList = document.getElementById('meal');
const favMealList = document.getElementById('fav-meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
var favbtn = document.getElementsByClassName("addtofav");
var removebtn = document.getElementsByClassName("remove2");
var eachFavMeal = document.getElementsByClassName("meal-item");
const cart = document.getElementsByClassName("cart");

// creating the fav list if local storage is not null and show fav meal list on user screen
function createFavMealList(){
    let arr = JSON.parse(localStorage.getItem("data"));
    let html = "";
    // local storage array has meal id in it and here we are running over loop to fetch all 
    // meal item by id
    for(var i=0; i<arr.length; i++){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arr[i]}`)
    .then(response => response.json())
    .then(data => {
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <div class="two-buttons">
                                <a href = "#" class = "recipe-btn">Get Recipe</a>
                                <button class="remove2" onclick="deleteItem()">Remove</button>
                            </div>
                        </div>
                    </div>
                `;
            favMealList.innerHTML = html;
        });
        }
    });
}
}

// Deleting removal item from the list
function deleteItem() {
    for (let i = 0; i < eachFavMeal.length; i++) {
        removebtn[i].addEventListener("click", removeMealFromFav);
    }
}
function removeMealFromFav(evt){
    // Fetching the meal id and storing in a variable
    var indexValue = evt.target.parentElement.parentElement.parentElement.dataset.id;
    // removing element from screen
    evt.target.parentNode.parentNode.parentNode.remove();
    //creating an array and find the index of deleting meal id
    let myArray = JSON.parse(localStorage.getItem("data"));
    for(let i = 0; i<myArray.length; i++){
        if(indexValue == myArray[i]){
            myArray.splice(i, 1); // removing it from the local storage
        }
    }
    // update the local storage
    localStorage.setItem("data", JSON.stringify(myArray));
}

// redirect user to home page
function gotoHome(){
    location.href = "index.html";
}



// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal of meal recipe and youtube video
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

window.addEventListener('DOMContentLoaded', createFavMealList);
favMealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});