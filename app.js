let url = "https://dummyjson.com/recipes";
let showCard = document.getElementById("show-card");
let allData = [];
let difficulty = [];
let selectDifficulty = document.getElementById("add-option");
let cuisine = [];
let selectCuisine = document.getElementById("add-cuisine");
let searchBar = document.getElementById("searchBar");
let loginBtn = document.getElementById("button-login");
let signupForm = document.getElementById("signup-form");
let signinBtn = document.getElementById("signin");
let loginForm = document.getElementById("login-form");
let signupbtn = document.getElementById("signup");
let suBtn = document.getElementById("btn-su");
let liBtn = document.getElementById("btn-li"); //btn to loginto an account in login form
let cancelBtn = document.getElementById("btn-cancel"); //btn within login form to navigate user to the home page
let userSuDetails = JSON.parse(localStorage.getItem("userSignup")) || [];

//Onclick Login btn
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

//login.html will look like after click on login btn
if (loginForm) {
  signupForm.style.display = "none";
}

//when on login html, login form will be appear on that form there is a signup btn this function will be perform on the click of it.
if (signupbtn) {
  signupbtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });
}

//Account creation logic
//Creating account or signing up functionality will perform here
let suPass = document.getElementById("signup-pass");
if (suPass) {
  suPass.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      let suEmail = document.getElementById("signup-email");
      let suDetail = {
        email: suEmail.value,
        password: suPass.value,
      };
      let checkAlreadyDetail = userSuDetails.find(
        (value) => suEmail.value == value.email
      );
      if (checkAlreadyDetail) {
        console.log(userSuDetails);
        Swal.fire({
          icon: "error",
          title: "Email already exists!",
          text: "Try another email",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        console.log(userSuDetails);
        userSuDetails.push(suDetail);
        localStorage.setItem("userSignup", JSON.stringify(userSuDetails));
        Swal.fire({
          icon: "success",
          title: "Account created successfully!",
          text: "navigating to login page..",
          timer: 2000,
          showConfirmButton: false,
        });
        loginForm.style.display = "block"; //shows login form to log into account
        signupForm.style.display = "none"; //hides signup form just as acc will get created
      }
    }
  });
}

//Login logic
let checkEmail = document.getElementById("signin-email");
let checkPass = document.getElementById("signin-pass");
if (checkPass) {
  checkPass.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      let checkBoth = userSuDetails.find(
        (user) =>
          user.email == checkEmail.value && user.password == checkPass.value
      );
      if (checkBoth) {
        Swal.fire({
          icon: "success",
          title: "Login successfull!",
          text: "navigating to home page..",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Incorrect email or password!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  });
}

//onclick signin btn which is within signup form
if (signinBtn) {
  signinBtn.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });
}

//functionality on cancel button:
if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

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

  //Executes filtering of difficulty filter
  selectDifficulty.addEventListener("change", combineFilter);

  //Executes filtering of Cuisine filter
  selectCuisine.addEventListener("change", combineFilter);
  //Both filter execution at the same time
  function combineFilter() {
    let selectedD = selectDifficulty.value;
    let selectedC = selectCuisine.value;
    let filter = allData.filter((value) => {
      let userDifficulty = selectedD === "" || selectedD === value.difficulty;
      let userCuisine = selectedC === "" || selectedC === value.cuisine;
      return userDifficulty && userCuisine;
    });
    showCard.innerHTML = "";
    filter.forEach((value) => {
      render(value);
    });
  }

  //searching feature:
  searchBar.addEventListener("keyup", () => {
    let input = searchBar.value.toLowerCase();
    showCard.innerHTML = "";
    allData.forEach((element) => {
      let recipesName = element.name.toLowerCase();
      if (recipesName.includes(input)) {
        render(element);
      }
    });
  });
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
