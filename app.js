let url = "https://dummyjson.com/recipes";
let showCard = document.getElementById("show-card");
let allData = [];
let difficulty = [];
let selectDifficulty = document.getElementById("add-option");
let cuisine = [];
let selectCuisine = document.getElementById("add-cuisine");
async function fetchApi() {
  //Fetching api
  let response = await fetch(url);
  //Getting response
  let data = await response.json();
  console.log(response);
  console.log(data);
  allData = data.recipes; //assigning recipes array to our global allData array
  console.log("all data arr", allData);
  console.log(data.recipes);
  console.log(data);
  console.log(data);
  console.log(data);
  //render cards to show on web
  allData.forEach((value) => {
    render(value);
    //adding difficult key into difficulty filter
    if (!difficulty.includes(value.difficulty)) {
      difficulty.push(value.difficulty);
      selectDifficulty.innerHTML += `
  <option value = "${value.difficulty}">${value.difficulty}</option>
  `;
    }

    //adding cuisine(region) key into cuisine filter
    if (!cuisine.includes(value.cuisine)) {
      cuisine.push(value.cuisine);
      selectCuisine.innerHTML += `
  <option value = "${value.cuisine}">${value.cuisine}</option>
  `;
    }
  });

  let selectD = "";
  let selectC = "";
  //Executes filtering of difficulty filter
  selectDifficulty.addEventListener("change", function () {
    selectD = selectDifficulty.value;
    console.log(selectD);
    showCard.innerHTML = ""; //removes all cards
    combineFilter();
    // allData.forEach((value) => {
    //   if (selectD == value.difficulty) {
    //     return render(value);
    //   }
    //   if (selectD == "all") {
    //     return render(value);
    //   }
    // });
  });

  //Executes filtering of Cuisine filter
  selectCuisine.addEventListener("change", function () {
    selectC = selectCuisine.value;
    console.log(selectC);
    showCard.innerHTML = ""; //removes all cards
    combineFilter();
    // allData.forEach((value) => {
    //   if (selectC == value.cuisine) {
    //     return render(value);
    //   }
    //   if (selectC == "all") {
    //     return render(value);
    //   }
    // });
  });
  //Both filter execution at the same time
  function combineFilter() {
    showCard.innerHTML = ""; //removes all cards
    allData.forEach((value) => {
      let matchDifficulty = !selectD || value.difficulty == selectD;
      let matchCuisine = !selectC || value.cuisine == selectC;
      console.log(matchDifficulty);
      console.log(matchCuisine);
      if (matchDifficulty && matchCuisine) {
        return render(value);
      }
    });
  }
}
//render function which will be used to render cards
function render(element) {
  let li = document.createElement("li");
  li.innerHTML += `
      <div id="card">
        <div><img class="img" src="${element.image}" alt=""></div> 
        <div id = "content-container">
        <div id="main-info"> 
        <h2>${element.name}</h2>
        <p class="txt">${element.cuisine}</p>
        <div class="cook-time-and-rating-container"><span class="cook-time"><div class="icon"><i class="fa-regular fa-clock"></i></div><p class="txt">${element.cookTimeMinutes}min</p></span> <span class="rating"><div class="icon star"><i class="fa-solid fa-star"></i></div><p class="txt">${element.rating}</p><p class="txt">(${element.reviewCount})</p></span><p class="txt">${element.difficulty}</p>
        <span class="rating"></span>
        </div>
            </div>
            </div>
     </div>  
      `;
  showCard.append(li);
}

fetchApi();
