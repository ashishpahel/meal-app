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

// on click search button user get the meal item 
searchBtn.addEventListener('click', getMealList);
//on click user get more details about specific meal item
mealList.addEventListener('click', getMealRecipe);
// to close the more details section 
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the name
function getMealList(){
    let searchInputTxt = document.getElementById('input-data').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
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
                                <button class="addtofav">Add to Fav</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
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

//redirect user to fav page
function gotoFav(){
    location.href = "fav.html";
}




// if user click on fav btn from any meal items then this set interval function notify to the addmetolist func
setInterval(() => {
    if(favbtn!=null){
        for(let i=0; i<favbtn.length; i++){
            favbtn[i].addEventListener("click", addmetolist);
        }
    }
}, 1000);


// this function add fav item in the fav list using local storage
function addmetolist(evt){
    // fetching id of meal item that user click to add item in fav list
    var favMealId = evt.target.parentElement.parentElement.parentElement.dataset.id;
    console.log(favMealId);
    // create array in local storage
    if(localStorage.getItem('data') == null){
        localStorage.setItem('data', '[]');
    }

    var localArray = JSON.parse(localStorage.getItem('data'));
    localArray.push(favMealId);

    localStorage.setItem('data', JSON.stringify(localArray));
}







// Creating a array of all meal name to suggest user while typing in search box
const mealName = [ "Apple Frangipan Tart", "Apple & Blackberry Crumble", "Apam balik", "Ayam Percik",
   "Bakewell tart", "Bread and Butter Pudding", "Beef Wellington", "Baingan Bharta", "Beef Brisket Pot Roast",
    "Beef Sunday Roast", "Braised Beef Chilli", "Beef stroganoff", "Broccoli & Stilton soup", "Bean & Sausage Hotpot",
    "Banana Pancakes", "Beef Dimpling Stew", "Beef and Mustard Pie", "Beef and Oyster Pie", "Blackberry Fool",
    "Battenberg Cake", "Beef Bourguignon", "Brie wrapped in prosciutto & brioche", "BeaverTails",
    "Brown Stew Chicken", "Beef Lo Mein", "Baked salmon with fennel & tomatoes", "Budino Di Ricotto",
    "Breakfast Potatoes", "Bitterballen (Dutch meatballs)", "BBQ Pork Sloppy Joes",
    "Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber", "Big Mac", "Bigos (Hunters Stew)",
    "Boxty Breakfast", "Beef Rendang", "Burek", "Chcolate Gatean", "Chicken Enchilada Casserole",
    "Cream Cheese Tart", "Christmas Pudding Flapjack", "Chicken Handi", "Chicken Alfredo Primavera", 
    "Chicken Fajita Mac and Cheese", "Cajun spiced fish tacos", "Crock Pot Chicken Baked Tacos", 
    "Chicken Karaage", "Coq au vin", "Chilli prawn linguine", "Clam chowder", "Creamy Tomato Soup", 
    "Chicken & mushroom Hotpot", "Chicken Couscous", "Chocolate Avacodo Mousse", "Choc Chips Pecan Pie", 
    "Chocolate Raspberry Brownies", "Chickpea Fajitas", "Chicken Ham and Leek Pie", "Chicken Parmentier", 
    "Carrot Cake", "Chelsea Buns", "Choclate Souffle", "Chinon Apple Tarts", "Chicken Marengo", 
    "Canadian Butter Tarts", "Chicken Basquaise", "Callaloo Jamaican Style", "Chicken Congee", 
    "Chocolate Caramel Crispy", "Chakchouka", "Cashew Ghoriba Biscuits", "Corba", "Christmas Pudding Trifle", 
    "Classic Christmas pudding", "Christmas cake", "Corned Beef and Cabbage", "Crispy Sausages and Greens", 
    "Chicken Quinoa Greek Salad", "Chick-Fil-A Sandwich", "Coddled pork with cider", "Cevapi Sausages", 
    "Croatian lamb peka", "Croatian Bean Stew", "Chivito uruguayo", "Dal fry", "Dundee cake", "Duck Counfit", 
    "Eton Mess", "Eccles Cakes", "English Breakfast", "Escobitch Fish", "Egg Drop Soup", "Egyptian Fatteh", 
    "Fish pie", "Fettucine alfredo", "Full English Breakfast", "Flamiche", "French Omelette", 
    "Hot Chocolate Fudge", "Hot and Sour Soup", "Jam Roly-Poly", "Key Lime Pie", "Kidney Bean Curry", 
    "Kedgeree", "Kung Pao Chicken", "Kafteji", "Koshari", "Lasagne", "Lamb and Potato pie", "Leblebi Soup", 
    "Matar Paneer", "Minced Beef Pie", "Madeira Cake", "Minve Pies", "Moussaka", "Pad See Ew", "Poutine", 
    "Pancakes", "Pumpkin Pie", "Parkin Cake", "Pate Chinois", "Rappie Pie", "Red Peas Soup", "Roti John", 
    "Spicy Arrabiata Penne", "Squash linguine", "Spanish Tortilla", "Summer Pudding", "Summer Priston", 
    "Sugar Pie", "Stamppot", "Sushi", "Turkey Meatloaf", "Tuna Nicoise", "Tahini Lentils", "Three Fish Pie", 
    "Treacle Tart", "Tourtiere", "Vegan Lasagna", "Wontons", ]


// show suggestions related to user input key
function autocomplete(input, list) {
    //Add an event listener to compare the input value with all meal
    input.addEventListener('input', function () {
        //Close the existing list if it is open
        closeList();

        //If the input is empty, exit the function
        if (!this.value)
            return;

        //Create a suggestions <div> and add it to the element containing the input field
        suggestions = document.createElement('div');
        suggestions.setAttribute('id', 'suggestions');
        this.parentNode.appendChild(suggestions);

        //Iterate through all entries in the list and find matches
        for (let i=0; i<list.length; i++) {
            if (list[i].toUpperCase().includes(this.value.toUpperCase())) {
                //If a match is found, create a suggestion <div> and add it to the suggestions <div>
                suggestion = document.createElement('div');
                suggestion.innerHTML = list[i];
                
                suggestion.addEventListener('click', function () {
                    input.value = this.innerHTML;
                    closeList();
                });
                suggestion.style.cursor = 'pointer';

                suggestions.appendChild(suggestion);
            }
        }

    });

    function closeList() {
        let suggestions = document.getElementById('suggestions');
        if (suggestions)
            suggestions.parentNode.removeChild(suggestions);
    }
}
autocomplete(document.getElementById('input-data'), mealName);