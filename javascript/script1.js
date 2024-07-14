$(document).ready(function () {

    fetchMealsByName(name)
    function hideAllGrids() {
       $(".first-grid").addClass("d-none");
       $(".searchInputs").addClass("d-none").removeClass("d-flex");
       $(".search-grid").addClass("d-none").removeClass("d-flex");
       $(".cat-grid").addClass("d-none");
       $(".area-grid").addClass("d-none");
       $(".ingred-grid").addClass("d-none");
       $(".contact").addClass("d-none");
       $(".instructions-pg").addClass("d-none");
    }
    function displayMeals(meals) {
       const searchGrid = $(".search-grid");
       searchGrid.empty();
       meals.forEach(meal => {
          const mealHTML =`
               <div class="col-md-3">
                   <div id="meal" class="meal mb-2 rounded rounded-2 position-relative overflow-hidden cursor-pointer">
                       <img src="${meal.strMealThumb}" alt="" class="w-100">
                       <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                           <h3>${meal.strMeal}</h3>
                       </div>
                   </div>
               </div>`
           ;
          searchGrid.append(mealHTML);
       });
       searchGrid.removeClass("d-none").addClass("d-flex");
    }
 
    function displayCats(categories) {
       const catGrid = $(".cat-grid");
       catGrid.empty();
       categories.forEach(category => {
          const categoryHTML = `<div class="col-md-3">
                     <div class="cat mb-1 me-1 position-relative overflow-hidden rounded-2 cursor-pointer">
                         <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-100">
                         <div class="cat-layer position-absolute text-black text-center">
                             <h3>${category.strCategory}</h3>
                             <p class="fs-6">${category.strCategoryDescription}</p>
                         </div>
                     </div>;`
          catGrid.append(categoryHTML);
       })
       catGrid.removeClass("d-none").addClass("d-flex");
    }
 
    function displayAreas(areas) {
       const areaGrid = $(".area-grid");
       areaGrid.empty();
       areas.forEach(area => {
          const areaHTML = `<div class="col-md-3 text-center cursor-pointer">
                     <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                     <h3 class="text-white">${area.strArea}</h3>
                      </div>`;
          areaGrid.append(areaHTML);
       })
       areaGrid.removeClass("d-none").addClass("d-flex");
    }
 
    function displayIngredients(ingredients) {
       const ingredientsGrid = $(".ingred-grid");
       ingredientsGrid.empty();
       for (let i = 0; i < 20; i++) {
          const ingredHTML = `<div class="col-md-3 mt-3">
                     <div  class="rounded-2 text-center cursor-pointer">
                         <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                         <h3 class="text-white">${ingredients[i].strIngredient}</h3>
                         <p class="text-white overflow-hidden" style="height: 60px;">${ingredients[i].strDescription}</p>
                     </div>
                 </div>`
          ingredientsGrid.append(ingredHTML);
       }
       ingredientsGrid.removeClass("d-none").addClass("d-flex");
    }
 
    $("#search").on("click", function () {
       hideAllGrids();
       $(".searchInputs").removeClass("d-none").addClass("d-flex");
       $(".search-grid").removeClass("d-none").addClass("d-flex");
       $("#sideBar").animate({ left: -200,px }, 500);
       $("#closeBtn").addClass("d-none");
       $("#openBtn").removeClass("d-none");
       $('#myList').toggleClass('show');
    });
 
    $("#categories").on("click", function () {
       hideAllGrids();
       fetchMealsCat();
       $(".cat-grid").removeClass("d-none");
       $("#sideBar").animate({ left: `-200px` }, 500);
       $("#closeBtn").addClass("d-none");
       $("#openBtn").removeClass("d-none");
       $('#myList').toggleClass('show');
    });
 
    $("#area").on("click", function () {
       hideAllGrids();
       fetchMealsArea();
       $(".area-grid").removeClass("d-none");
       $("#sideBar").animate({ left: `-200px` }, 500);
       $("#closeBtn").addClass("d-none");
       $("#openBtn").removeClass("d-none");
       $('#myList').toggleClass('show');
    });
 
    $("#ingredients").on("click", function () {
       hideAllGrids();
       fetchMealsIngredients();
       $(".ingred-grid").removeClass("d-none");
       $("#sideBar").animate({ left: `-200px` }, 500);
       $("#closeBtn").addClass("d-none");
       $("#openBtn").removeClass("d-none");
       $('#myList').toggleClass('show');
    });
 
    $("#contact").on("click", function () {
       hideAllGrids();
       $(".contact").removeClass("d-none");
       $("#sideBar").animate({ left: `-200px` }, 500);
       $("#closeBtn").addClass("d-none");
       $("#openBtn").removeClass("d-none");
       $('#myList').toggleClass('show');
    });
 
    $("#meal").on("click" , function(){
       console.log("heloo");
       hideAllGrids();
       $(".instructions-pg").removeClass("d-none");
 
    })
 
    //-----------------Fetch API's------------------------
    function fetchMealsByName(name) {
       const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=${name}";
       fetch(url)
          .then(response => response.json())
          .then(data => {
             if (data.meals) {
                displayMeals(data.meals);
             }
          });
    }
 
    function fetchMealsByLetter(letter) {
       const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}";
       fetch(url)
          .then(response => response.json())
          .then(data => {
             if (data.meals) {
                displayMeals(data.meals);
             }
          });
    }
 
    $("#searchByName").on("input", function () {
       const name = $(this).val();
       if (name) {
          fetchMealsByName(name);
       }
    });
 
    $("#searchByLetter").on("input", function () {
       const letter = $(this).val();
       if (letter && letter.length === 1) {
          fetchMealsByLetter(letter);
       }
    });
 
    function fetchMealsCat() {
       const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
       fetch(url)
          .then(response => response.json())
          .then(data => {
             if (data.categories) {
                displayCats(data.categories);
             }
          });
    }
 
    function fetchMealsArea() {
       const url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
       fetch(url)
          .then(response => response.json())
          .then(data => {
             if (data.meals) {
                displayAreas(data.meals);
             }
          });
    }
 
    function fetchMealsIngredients() {
       const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
       fetch(url)
          .then(response => response.json())
          .then(data => {
             if (data.meals) {
                displayIngredients(data.meals);
             }
          })
          .catch(error => {
             console.error('Error fetching ingredients:', error);
          });
    }
 
    //-----------------Validation---------------------------
 
    const emailInput = document.getElementById("emailInput");
    const emailAlert = document.getElementById("emailAlert");
    function validateEmail() {
       var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(emailInput.value) || emailInput.value == null) {
          emailAlert.classList.remove("d-none");
          return false;
       } else {
          emailAlert.classList.add("d-none");
       }
       return true;
    }
    emailInput.addEventListener("input", validateEmail);
 
 
    const nameInput = document.getElementById("nameInput");
    const nameAlert = document.getElementById("nameAlert");
    function validateName() {
       let nameRegex = /^[a-zA-Z\s]+$/;
       if (!nameRegex.test(nameInput.value) || nameInput.value == null) {
          nameAlert.classList.remove("d-none");
          return false;
       } else {
          nameAlert.classList.add("d-none");
       }
       return true;
    }
    nameInput.addEventListener("input", validateName);
 
    const phoneInput = document.getElementById("phoneInput");
    const phoneAlert = document.getElementById("phoneAlert");
    function validatePhone() {
       let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
       if (!phoneRegex.test(phoneInput.value) || phoneInput.value == null) {
          phoneAlert.classList.remove("d-none");
          return false;
       } else {
          phoneAlert.classList.add("d-none");
       }
       return true;
    }
    phoneInput.addEventListener("input", validatePhone);
 
 
    const ageInput = document.getElementById("ageInput");
    const ageAlert = document.getElementById("ageAlert");
    function validateAge() {
       if (ageInput.value == null) {
          ageAlert.classList.remove("d-none");
          return false;
       } else {
          ageAlert.classList.add("d-none");
       }
       return true;
    }
    ageInput.addEventListener("input", validateAge);
 
    const passwordInput = document.getElementById("passwordInput");
    const passwordAlert = document.getElementById("passwordAlert");
    function validatePassword() {
       let passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/;
       if (!passwordRegex.test(passwordInput.value)) {
          passwordAlert.classList.remove("d-none");
          return false;
       } else {
          passwordAlert.classList.add("d-none");
       }
       return true;
    }
    passwordInput.addEventListener("input", validatePassword);
 
    const repasswordInput = document.getElementById("repasswordInput");
    const repasswordAlert = document.getElementById("repasswordAlert");
    function validateRepassword() {
       if (repasswordInput.value !== passwordInput.value) {
          repasswordAlert.classList.remove("d-none");
          return false;
       } else {
          repasswordAlert.classList.add("d-none");
       }
       return true;
    }
    repasswordInput.addEventListener("input", validateRepassword);
 
    function validateForm() {
       const isEmailValid = validateEmail();
       const isNameValid = validateName();
       const isPhoneValid = validatePhone();
       const isAgeValid = validateAge();
       const isPasswordValid = validatePassword();
       const isRepasswordValid = validateRepassword();
 
       if (isEmailValid && isNameValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid) {
          submitBtn.removeAttribute("disabled");
       } else {
          submitBtn.setAttribute("disabled", true);
       }
    }
    emailInput.addEventListener("input", validateForm);
    nameInput.addEventListener("input", validateForm);
    phoneInput.addEventListener("input", validateForm);
    ageInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);
    repasswordInput.addEventListener("input", validateForm);
 
    //-----------------Validation---------------------------
 
    //-----------------SideMenu-----------------------------
 
    $("#closeBtn").on("click", function () {
       console.log("closeBtn");
       $("#sideBar").animate({ left: `-200px`}, 500);
       $("#closeBtn").addClass("d-none");
       $("#openBtn").removeClass("d-none");
       $('#myList').toggleClass('show');
    });
 
    $("#openBtn").on("click", function () {
       console.log("openBtn");
       $("#sideBar").animate({ left: `0px` }, 500);
       $("#openBtn").addClass("d-none");
       $("#closeBtn").removeClass("d-none");
       $('#myList').toggleClass('show');
    });
 
    //-----------------SideMenu---------------------------
 
 
       
 
 });
 
 
 