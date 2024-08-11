const searchbox = document.querySelector(".searchbox");
const btn = document.querySelector(".btn");
const recipecontainer = document.querySelector(".recipe-container");
const recipeDetailsContaine =document.querySelector(".recipe-detail-content");
const recipeCloseBtn =document.querySelector(".recipe-close-btn");



//function to get recipe 
const fetchrecipes = async (query)=>{
    recipecontainer.innerHTML = " <h2>fetching recipe... </h2>";
    const data = await  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response= await data.json();

    recipecontainer.innerHTML = "";
    response.meals.forEach(meal =>{
        const recipeDiv = document.createElement(`div`)
        recipeDiv.classList.add(`recipe`);
        recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <p> <span>${meal.strArea} </span> Dish</p>
          <p> Belong to  <span>${meal.strCategory} </span>  Ctegory</p>
        `
        const button = document.createElement(`button`);
        button.textContent = `View Recipe`;
        recipeDiv.appendChild(button);


        //addin addEventlistener to Recipe to button 
        button.addEventListener(`click`, ()=>{
            openReciPopup(meal)
        })



        recipecontainer.appendChild(recipeDiv);             
    });
        
}
// function to fetch ingredients and measurements
const fetchIngredints = (meal)=>{
    let ingredientslist = ""; // variables
    for (let i=1; i<=20; i++){
        const ingredient = meal[`strIngredien${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
          ingredientslist += `<li>${measure}  ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientslist;

}

const openReciPopup = (meal)=> {
    recipeDetailsContaine.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <h3>Ingredents:</h3>
      <ul>${fetchIngredints(meal)}</ul>


    `

    recipeDetailsContaine.parentElement.style.display ="block"
    console.log(openReciPopup)

}


btn.addEventListener(`click`,(e)=>{
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    fetchrecipes(searchinput);
   //alert(`button click`)
});

