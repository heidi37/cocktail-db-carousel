//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

//global variables
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
let drinksArray = []
let carouselPos = ""
let intervalId = ""

// original render
document.querySelector("#getCocktail").addEventListener('click', function(){
  localStorage.removeItem('drinksArray')
  carouselPos = 0
  let drink = document.querySelector("input").value
  fetch(url + drink)
  .then(res => res.json())
  .then(data => {
    drinksArray = data
    console.log(drinksArray)
    localStorage.setItem('drinksArray', JSON.stringify(drinksArray));
    renderDrinks(drinksArray.drinks)
  })
})

//carousels the results
//const intervalId = setInterval(carouselDrinks, 1000)
document.querySelector('#startCarousel').addEventListener('click', function(){
  intervalId = setInterval(carouselDrinks, 2000)
})

function carouselDrinks(){
  document.querySelector('#startCarousel').style.display = "none"
  document.querySelector('#stopCarousel').style.display = "inline-block"
  let retrievedDrinksArray = JSON.parse(localStorage.getItem('drinksArray'));
  if(carouselPos > retrievedDrinksArray.drinks.length - 1){
    carouselPos = 0
  } 
  renderDrinks(retrievedDrinksArray.drinks)
  carouselPos ++;
}

document.querySelector('#stopCarousel').addEventListener('click', stopCarouselDrinks)

function stopCarouselDrinks(){
  document.querySelector('#startCarousel').style.display = "inline-block"
  document.querySelector('#stopCarousel').style.display = "none"
  clearInterval(intervalId)
  carouselPos --;
}


//right arrow click to advance
document.querySelector(".right").addEventListener('click', function(drinksArray){
  let retrievedDrinksArray = JSON.parse(localStorage.getItem('drinksArray'));
  carouselPos ++;
  if(carouselPos > retrievedDrinksArray.drinks.length - 1){
    carouselPos = retrievedDrinksArray.drinks.length - 1
  } 
  renderDrinks(retrievedDrinksArray.drinks)  
})

//left arrow click to go back
document.querySelector(".left").addEventListener('click', function(drinksArray){
  console.log(carouselPos)
  let retrievedDrinksArray = JSON.parse(localStorage.getItem('drinksArray'));
  console.log(retrievedDrinksArray)
  carouselPos --;
  if(carouselPos < 0){
    carouselPos = 0
  } 
  renderDrinks(retrievedDrinksArray.drinks)
})

//renders the individual drink info
function renderDrinks(array){
  document.querySelector("h2").innerText = array[carouselPos].strDrink
  document.querySelector("img").src = array[carouselPos].strDrinkThumb
  document.querySelector(".instructions").innerText = `${array[carouselPos].strInstructions}`
  document.querySelector('#counter').innerHTML = `<p><strong><span class="numberColor">${carouselPos + 1}</span></strong> of <strong>${array.length}</strong></p>`
  document.querySelector(".output").style.display = "flex"
  document.getElementById("ingredientList").innerHTML = ""
  getIngredients(array)
}

//grabs the drink ingredients from the 16 drink properties if not null
function getIngredients(array){
  console.log("get ingredients", array)
  const ul = document.getElementById("ingredientList")
  for(let i = 1; i <= 16; i ++){
    let ingredientKey = "strIngredient" + i
    if (array[carouselPos][ingredientKey]){
    console.log(array[carouselPos][ingredientKey])
    const li = document.createElement("li")
    li.textContent = array[carouselPos][ingredientKey]
    ul.appendChild(li)
    }
  } 
}