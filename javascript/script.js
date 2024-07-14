$(document).ready(function () {
   
   fetchMealsByName(name)
 //-------------------menu events---------------------------
   $("#closeBtn").on("click", function () {
      $("#sideBar").animate({ left: `-200px` }, 500);
      $("#closeBtn").addClass("d-none");
      $("#openBtn").removeClass("d-none");
      $('#myList').toggleClass('show');
   });

   $("#openBtn").on("click", function () {
      $("#sideBar").animate({ left: `0px` }, 500);
      $("#openBtn").addClass("d-none");
      $("#closeBtn").removeClass("d-none");
      $('#myList').addClass('show');
   });

   $("#search").on("click", function () {
      hideAllGrids();
      $(".searchInputs").removeClass("d-none").addClass("d-flex");
      $(".search-grid").removeClass("d-none").addClass("d-flex");
      $("#sideBar").animate({ left: `-200px` }, 500);
      $("#closeBtn").addClass("d-none");
      $("#openBtn").removeClass("d-none");
      $('#myList').toggleClass('show');
   });

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

   //-------------------menu displays---------------------------

   function displayCats(categories) {
      const catGrid = $(".cat-grid");
      catGrid.empty();
      categories.forEach(category => {
         const categoryHTML = `<div class="col-md-3 ms-md-0 ms-3 category" catName="${category.strCategory}">
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
         const areaHTML = `<div class="col-md-3 ms-md-0 ms-3  text-center cursor-pointer area" areaName="${area.strArea}">
                    <i class="fa-solid fa-house-laptop fa-4x text-white "></i>
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
         const ingredHTML = `<div class="col-md-3 mt-3 ms-md-0 ms-3  ingredient" ingredName="${ingredients[i].strIngredient}">
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

   function displayMeals(meals) {
      const searchGrid = $(".search-grid");
      searchGrid.empty();
      meals.forEach(meal => {
         const mealHTML = `
              <div class="col-md-3">
                  <div id="${meal.idMeal}" class="meal mb-2 ms-md-0 ms-3  rounded rounded-2 position-relative overflow-hidden cursor-pointer">
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
   // --------------Function to show the overlay message-------------
   function showOverlayMessage() {
      const overlayMessage = $('<div class="overlay-message bg-warning text-black">Press anywhere to close this page!</div>');
      $('body').append(overlayMessage);
      overlayMessage.fadeIn(500).delay(800).fadeOut(500, function () {
          $(this).remove();
      });
   }

    //------------- Function to show-hide the spinner------------------
    function showSpinner() {
      $("#loadingSpinner").removeClass("d-none");
   }

   function hideSpinner() {
      $("#loadingSpinner").addClass("d-none");
   }
   //-----------------------Meal details---------------------------

   $(document).on("click", ".meal", function (event) {
      hideAllGrids()
      var mealElement = event.target.closest('.meal');
      if (mealElement) {
         var mealID = mealElement.getAttribute('id');
         console.log("Meal ID:", mealID);
         fetchMealDetails(mealID);
      }
   });

   $(document).on("click", function (event) {
      const instructionsPg = $(".instructions-pg");
      const searchGrid = $(".search-grid");
      if (instructionsPg.hasClass("d-flex")) {
         instructionsPg.addClass("d-none").removeClass("d-flex");
         searchGrid.removeClass("d-none").addClass("d-flex");
      }
   });

   async function fetchMealDetails(mealID){
      showSpinner()
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
          const response = await fetch(url);
          const data = await response.json();
          hideSpinner()
          if (data.meals) {
            displayMealDetails(data.meals);
            showOverlayMessage();
          }
   }

   function displayMealDetails(meals) {
      let instructionsPg = $(".instructions-pg");
      instructionsPg.empty();
      meals.forEach(meal => {
         const detailsHTML = `
              <div class="col-md-4 ms-md-0 ms-3 ">
                  <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                  <h2>${meal.strMeal}</h2>
              </div>
              <div class="col-md-8 ms-md-0 ms-3 ">
                  <h2>Instructions</h2>
                  <p>${meal.strInstructions}</p>
                  <h3><strong>Area:</strong> ${meal.strArea}</h3>
                  <h3><strong>Category:</strong> ${meal.strCategory}</h3>
                  <h3><strong>Recipes:</strong></h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${getIngredientsList(meal)}
                  </ul>
                  <h3><strong>Tags:</strong></h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${getTagsList(meal.strTags)}
                  </ul>
                  <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                  <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
              </div>`;
         instructionsPg.append(detailsHTML);
      });
      instructionsPg.removeClass("d-none").addClass("d-flex");
   }

   function getIngredientsList(meal) {
      let ingredientsHTML = '';
      for (let i = 1; i <= 20; i++) {
         const ingredient = meal[`strIngredient${i}`];
         const measure = meal[`strMeasure${i}`];
         if (ingredient && ingredient.trim() !== '') {
            ingredientsHTML += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
         }
      }
      return ingredientsHTML;
   }

   function getTagsList(tagsString) {
      if (!tagsString) return '';
      return tagsString.split(',').map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join('');
   }
   //------------------------Fillter By Area-------------------------
   $(document).on("click", ".area", function (event) {
      hideAllGrids();
      var areaElement = event.target.closest('.area');
      if (areaElement) {
         var areaName = areaElement.getAttribute('areaName');
         console.log("Area name:", areaName);
         if (areaName) {
            fetchArea(areaName);
         }
      }
   });

   $(document).on("click", function (event) {
      const areaMealsBg = $(".areaMealsBg");
      const areaGrid = $(".area-grid");
      if (areaMealsBg.hasClass("d-flex")) {
         areaMealsBg.addClass("d-none").removeClass("d-flex");
         areaGrid.removeClass("d-none").addClass("d-flex");
      }
   });

   async function fetchArea(areaName){
      showSpinner()
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`;
          const response = await fetch(url);
          const data = await response.json();
          hideSpinner()
          if (data.meals) {
            displayAreaMeals(data.meals);
            showOverlayMessage();
          }
   }

   function displayAreaMeals(meals) {
      let areaMealsBg = $(".areaMealsBg");
      areaMealsBg.empty();
      meals.forEach(meal => {
         const mealHTML = `
              <div class="col-md-3 ms-md-0 ms-3  mt-2">
                  <div id="${meal.idMeal}" class="meal rounded rounded-2 position-relative overflow-hidden cursor-pointer">
                      <img src="${meal.strMealThumb}" alt="" class="w-100">
                      <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                          <h3>${meal.strMeal}</h3>
                      </div>
                  </div>
              </div>`;
         areaMealsBg.append(mealHTML);
      });
      $(".areaMealsBg").addClass("d-flex").removeClass("d-none");
   }

   //---------------------------------------------------------
   //-----------------Fillter By Ingredients------------------
   $(document).on("click", ".ingredient", function (event) {
      hideAllGrids();
      var ingredElement = event.target.closest('.ingredient');
      if (ingredElement) {
         var ingredName = ingredElement.getAttribute('ingredName');
         console.log("ingredient name:", ingredName);
         if (ingredName) {
            fetchIngredients(ingredName);
         }
      }
   });

   $(document).on("click", function (event) {
      const ingredMealsBg = $(".ingredMealsBg");
      const ingredientsGrid = $(".ingred-grid");
      if (ingredMealsBg.hasClass("d-flex")) {
         ingredMealsBg.addClass("d-none").removeClass("d-flex");
         ingredientsGrid.removeClass("d-none").addClass("d-flex");
      }
   });

   async function fetchIngredients(ingredName) {
      showSpinner()
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredName}`;
          const response = await fetch(url);
          const data = await response.json();
          hideSpinner()
          if (data.meals) {
            displayIngredMeals(data.meals);
            showOverlayMessage();
          }
   }

   function displayIngredMeals(meals) {
      let ingredMealsBg = $(".ingredMealsBg");
      ingredMealsBg.empty();
      meals.forEach(meal => {
         const mealHTML = `
              <div class="col-md-3 ms-md-0 ms-3 mt-2">
                  <div id="${meal.idMeal}" class="meal rounded rounded-2 position-relative overflow-hidden cursor-pointer">
                      <img src="${meal.strMealThumb}" alt="" class="w-100">
                      <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                          <h3>${meal.strMeal}</h3>
                      </div>
                  </div>
              </div>`;
              ingredMealsBg.append(mealHTML);
      });
      $(".ingredMealsBg").addClass("d-flex").removeClass("d-none");
   }


   //-----------------Fillter By Categories------------------
   $(document).on("click", ".category", function (event) {
      hideAllGrids();
      var catElement = event.target.closest('.category');
      if (catElement) {
         var catName = catElement.getAttribute('catName');
         console.log("category name:", catName);
         if (catName) {
            fetchCategories(catName);
         }
      }
   });

   $(document).on("click", function (event) {
      const catMealsBg = $(".catMealsBg");
      const catGrid = $(".cat-grid");
      if (catMealsBg.hasClass("d-flex")) {
         catMealsBg.addClass("d-none").removeClass("d-flex");
         catGrid.removeClass("d-none").addClass("d-flex");
      }
   });

   async function fetchCategories(catName) {
      showSpinner()
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`;
          const response = await fetch(url);
          const data = await response.json();
          hideSpinner()
          if (data.meals) {
            displayCatMeals(data.meals);
            showOverlayMessage();
          }
    }

   function displayCatMeals(meals) {
      let catMealsBg = $(".catMealsBg");
      catMealsBg.empty();
      meals.forEach(meal => {
         const mealHTML = `
              <div class="col-md-3 mt-2 ms-md-0 ms-3 ">
                  <div id="${meal.idMeal}" class="meal rounded rounded-2 position-relative overflow-hidden cursor-pointer">
                      <img src="${meal.strMealThumb}" alt="" class="w-100">
                      <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                          <h3>${meal.strMeal}</h3>
                      </div>
                  </div>
              </div>`;
              catMealsBg.append(mealHTML);
      });
      $(".catMealsBg").addClass("d-flex").removeClass("d-none");
   }

   //-----------------------------------------------

   //--------------------Menu Fetchs-----------------
   async function fetchMealsByName(name) {
      showSpinner();
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
      const response = await fetch(url);
      const data = await response.json();
      hideSpinner();
          if (data.meals) {
              displayMeals(data.meals);
          }
    }

   async function fetchMealsByLetter(letter) {
      showSpinner()
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
          const response = await fetch(url);
          const data = await response.json();
      hideSpinner()
          if (data.meals) {
              displayMeals(data.meals);
          }
    }

   async function fetchMealsCat() {
      showSpinner()
      const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
      const response = await fetch(url);
      const data = await response.json();
      hideSpinner()
      if (data.categories) {
         displayCats(data.categories);
      }

   }

   async function fetchMealsArea() {
      showSpinner()
      const url =  `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
      const response = await fetch(url);
      const data = await response.json();
      hideSpinner()
      if (data.meals) {
         displayAreas(data.meals);
      }

   }

   async function fetchMealsIngredients() {
      showSpinner()
      const url =  `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
      const response = await fetch(url);
      const data = await response.json();
      hideSpinner()
      if (data.meals) {
         displayIngredients(data.meals);
      }

   }

   //-----------------------------------------------
   function hideAllGrids() {
      $(".first-grid").addClass("d-none");
      $(".searchInputs").addClass("d-none").removeClass("d-flex");
      $(".search-grid").addClass("d-none").removeClass("d-flex");
      $(".cat-grid").addClass("d-none");
      $(".area-grid").addClass("d-none");
      $(".ingred-grid").addClass("d-none");
      $(".contact").addClass("d-none");
      $(".instructions-pg").addClass("d-none");
      $(".areaMealsBg").removeClass("d-flex").addClass("d-none");
      $(".ingredMealsBg").removeClass("d-flex").addClass("d-none");
      $(".catMealsBg").removeClass("d-flex").addClass("d-none");
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

   //------------------------------------------------------

})
