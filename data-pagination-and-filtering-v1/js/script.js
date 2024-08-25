/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


//Declaring global variables that are used throughout the project.
const studentsPerPage = 9;
const studentList = document.querySelector(".student-list");

/**
 * This function creates the elements needed to display nine students and appends them to the page.
 *
 * @param {number} startIndex - Number to begin our index of students.
 * @param {number} endIndex - Number that ends the index of students.
 * @return {html} - Returns and inserts nine students on the page based on their index position.
 */
function showPage (list, page) {
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = page * studentsPerPage;
   studentList.innerHTML = '';
   
   for (i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
       studentList.insertAdjacentHTML("beforeend", studentItem);  
      }
   }
}

/**
 * This function creates the elements needed to display pagination buttons and appends them to the page.
 *
 * @param {number} numberOfPages - Stores the number of pages needed.
 * @param {string} linkList - Stores the ul element with class of link-list.
 * @return {string} - Returns and inserts the necessary page number buttons, listens for them to be clicked, and applies 
 * an active class to the one most recently clicked.
 */
function addPagination(list) {
   const numberOfPages = Math.ceil(list.length / studentsPerPage);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = '';

   for (i = 1; i <= numberOfPages; i++) {
      const button = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      linkList.insertAdjacentHTML("beforeend", button); 
      linkList.querySelector("button").classList.add("active"); 
   }
     
   linkList.addEventListener("click", (e) => {
      const activeButton = linkList.querySelector(".active");
      const buttonClicked = e.target.closest("button");
      

      if (buttonClicked) {
         activeButton.classList.remove("active");
         buttonClicked.classList.add("active");
         showPage(list, buttonClicked.innerHTML);   
      }
   }
)}

// Calls the functions described above to populate student data and page number buttons.
showPage(data, 1);
addPagination(data);

//Inserts HTML for a search input field.
const header = document.querySelector('header');
header.insertAdjacentHTML('beforeend', 
   `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `
);

//Declares the variables needed for searching and filtering student names.
const studentSearchInput = document.getElementById('search');
const studentSearchButton = document.querySelector('button[type=button]');
const label = studentSearchInput.parentNode;  

/**
 * This function searches through student names, filters, and returns any names that match the text entered in the search input.
 *
 * @param {array} newList - Stores names that match the search text.
 * @return {html} - Returns and inserts matching students on the page and necessary page number buttons.
 */
function searchStudentData(input) {
   let newList = [];
   for (i = 0; i < data.length; i++) {
      let firstName = data[i].name.first.toLowerCase();
      let lastName = data[i].name.last.toLowerCase();
      let fullName = firstName + lastName;
         
      if (fullName.toLowerCase().includes(studentSearchInput.value.toLowerCase())) {
         newList.push(data[i]);
      } 
   }
   showPage(newList, 1);
   addPagination(newList);
   
   if (newList.length === 0) {
      studentList.innerHTML = `<h3>No results were found.</h3>`;
   }
}

//These event listeners are listening for keyboard input in the search field and any clicks on the search button.
label.addEventListener('keyup', () => {
   searchStudentData(studentSearchInput.value);
});

studentSearchButton.addEventListener('click', () => {
   searchStudentData(studentSearchInput.value);
});
