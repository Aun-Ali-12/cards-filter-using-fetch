// supa base setup
const supabaseUrl = "https://cpjqfwsuzsjdtyxewurf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwanFmd3N1enNqZHR5eGV3dXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NjI1NTYsImV4cCI6MjA2ODQzODU1Nn0.lfERtCAQ2IVtx2SrwPUuhx7m9iwywo0bAbNLdXlQHH8";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

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
let suEmail = document.getElementById("signup-email");
let suPass = document.getElementById("signup-pass");
let logoutBtn = document.getElementById("logout");
//first hide logout btn
if (logoutBtn) {
  logoutBtn.style.display = "none";
}
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
async function insertData() {
  if (suEmail.value.length <= 0 || suPass.value.length <= 0) {
    Swal.fire({
      icon: "error",
      title: "Input Filed Empty!",
      text: "Fill all the input fields!",
      timer: 2000,
      showConfirmButton: false,
    });
    return signupForm;
  }
  const { data, error } = await supabaseClient.auth.signUp({
    email: suEmail.value,
    password: suPass.value,
  });
  if (error || !data.user) {
    Swal.fire({
      icon: "error",
      title: "Email already exists!",
      text: "Try another email",
      timer: 2000,
      showConfirmButton: false,
    });
    console.error(error);
  } else {
    Swal.fire({
      icon: "success",
      title: "Account created successfully!, check your mail to verify.",
      text: "navigating to login page..",
      timer: 2000,
      showConfirmButton: false,
    });
    loginForm.style.display = "block"; //shows login form to log into account
    signupForm.style.display = "none"; //hides signup form just as acc will get created
    console.error(error);
  }
}

if (signupForm) {
  suBtn.addEventListener("click", () => {
    insertData();
  });
  suPass.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      insertData();
    }
  });
}

//Login logic
let checkEmail = document.getElementById("signin-email");
let checkPass = document.getElementById("signin-pass");
async function userLogin() {
  if (checkEmail.value.length <= 0 || checkPass.value.length <= 0) {
    Swal.fire({
      icon: "error",
      title: "Input Filed Empty!",
      text: "Fill all the input fields!",
      timer: 2000,
      showConfirmButton: false,
    });
    return loginForm;
  }
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: checkEmail.value,
    password: checkPass.value,
  });
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Invalid login details",
      text: "Check your email or password",
      timer: 2000,
      showConfirmButton: false,
    });
    return loginForm;
  } else {
    Swal.fire({
      icon: "success",
      title: "Loggedin successfully!",
      text: "navigating to home page..",
      timer: 2000,
      showConfirmButton: false,
    });
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }
}
if (loginForm) {
  liBtn.addEventListener("click", () => {
    userLogin();
  });
  checkPass.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      userLogin();
    }
  });
}

//logout button show logic:
async function logoutShow() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) {
    if (loginBtn) {
      loginBtn.style.display = "block";
      logoutBtn.style.display = "none";
    }
  } else {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  }
}
logoutShow();

//logout logic:
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // blue
      cancelButtonColor: "#d33", // red
      confirmButtonText: "Yes, logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Do your logout logic here
        const { error } = await supabaseClient.auth.signOut();
        Swal.fire(
          "Logged Out!",
          "You have been successfully logged out.",
          "success"
        );
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
      }
    });
  });
}
//onclick signin btn which is within signup form
if (signinBtn) {
  signinBtn.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });
}

//Google Auth:
let googleAuth = document.getElementById("btn-GAuth");
if (googleAuth) {
  googleAuth.addEventListener("click", async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Try again",
        timer: 2000,
        showConfirmButton: false,
      });
      return loginForm;
    } else {
      Swal.fire({
        icon: "success",
        title: "Loggedin successfully!",
        text: "navigating to home page..",
        timer: 2000,
        showConfirmButton: false,
      });
    }
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
if (showCard) {
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
}
