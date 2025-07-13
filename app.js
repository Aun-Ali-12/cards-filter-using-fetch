let showCard = document.getElementById("show-card");
let filter = document.getElementById("add-option");
let filterRating = document.getElementById("add-rating");
let difficulty = [];
fetch("https://dummyjson.com/recipes")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    console.log("Recepies", data.recipes);
    data.recipes.forEach((value) => {
      //   console.log(value);
      //   console.log("name", value.name); //name of food
      //   console.log("cuisine", value.cuisine); //cuisine of food
      //   console.log("cooktime", value.cookTimeMinutes); //cooktime of food
      //   console.log("cooktime", value.rating); //rating of food
      //   console.log("cooktime", value.reviewCount); //reviews of food
      //   console.log("cooktime", value.tags); //tags of food
      //   console.log("cooktime", value.difficulty); //difficulty of food
      //   console.log("cooktime", value.image); ////img link of food

      let li = document.createElement("li");
      li.innerHTML += `
      <div id="card">
        <div><img class="img" src="${value.image}" alt=""></div> 
        <div id = "content-container">
        <div id="main-info"> 
        <h2>${value.name}</h2>
        <p class="txt">${value.cuisine}</p>
        <div class="cook-time-and-rating-container"><span class="cook-time"><div class="icon"><i class="fa-regular fa-clock"></i></div><p class="txt">${value.cookTimeMinutes}min</p></span> <span class="rating"><div class="icon star"><i class="fa-solid fa-star"></i></div><p class="txt">${value.rating}</p><p class="txt">(${value.reviewCount})</p></span><p class="txt">${value.difficulty}</p>
        <span class="rating"></span>
        </div>
            </div>
            </div>
     </div>  
      `;
      showCard.append(li);
      //Rendering options in dropdown for difficulty filter
      if (!difficulty.includes(value.difficulty)) {
        filter.innerHTML += `
    <option id="select">${value.difficulty}</option>
    `;
        difficulty.push(value.difficulty);
      }
    });
    filter.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex].text;
      console.log(selectedOption);
      showCard.innerHTML = "";
      data.recipes.forEach((value) => {
        if (selectedOption == value.difficulty) {
          let li = document.createElement("li");
          li.innerHTML += `
      <div id="card">
        <div><img class="img" src="${value.image}" alt=""></div> 
        <div id = "content-container">
        <div id="main-info"> 
        <h2>${value.name}</h2>
        <p class="txt">${value.cuisine}</p>
        <div class="cook-time-and-rating-container"><span class="cook-time"><div class="icon"><i class="fa-regular fa-clock"></i></div><p class="txt">${value.cookTimeMinutes}min</p></span> <span class="rating"><div class="icon star"><i class="fa-solid fa-star"></i></div><p class="txt">${value.rating}</p><p class="txt">(${value.reviewCount})</p></span><p class="txt">${value.difficulty}</p>
        <span class="rating"></span>
        </div>
            </div>
            </div>
     </div>  
      `;
          showCard.append(li);
        }
      });
    });
    //Function for filtering ratings
    filterRating.addEventListener("change", function () {
      let [min, max] = this.value.split("-").map(Number);
      console.log(min, max);
      let selectedOption = parseFloat(this.options[this.selectedIndex].value);
      console.log(selectedOption);
      showCard.innerHTML = "";
      // loop which will check the rating and the card will be shown which will get matched with the rating range
      data.recipes.forEach((value) => {
        if (value.rating >= min && value.rating <= max) {
          let li = document.createElement("li");
          li.innerHTML += `
      <div id="card">
        <div><img class="img" src="${value.image}" alt=""></div> 
        <div id = "content-container">
        <div id="main-info"> 
        <h2>${value.name}</h2>
        <p class="txt">${value.cuisine}</p>
        <div class="cook-time-and-rating-container"><span class="cook-time"><div class="icon"><i class="fa-regular fa-clock"></i></div><p class="txt">${value.cookTimeMinutes}min</p></span> <span class="rating"><div class="icon star"><i class="fa-solid fa-star"></i></div><p class="txt">${value.rating}</p><p class="txt">(${value.reviewCount})</p></span><p class="txt">${value.difficulty}</p>
        <span class="rating"></span>
        </div>
            </div>
            </div>
     </div>  
      `;
          showCard.append(li);
        }
      });
    });
  });
