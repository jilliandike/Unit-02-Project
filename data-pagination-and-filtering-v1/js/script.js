/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const studentsPerPage = 9;


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage (list, page) {
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = page * studentsPerPage;
   const studentList = document.querySelector(".student-list");
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
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


// Call functions
showPage(data, 1);
addPagination(data);


//Adding Extra Credit sections
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

//Variables needed for searching
const studentSearchInput = document.getElementById('search');
const studentSearchButton = document.querySelector('button[type=button]');
const label = studentSearchInput.parentNode;  
const studentList = document.querySelector(".student-list");


function searchStudentData(input) {
   let newList = [];
   for (i = 0; i < data.length; i++) {
      let firstName = data[i].name.first.toLowerCase();
      let lastName = data[i].name.last.toLowerCase();
      let fullName = firstName + lastName;
         
      if ( fullName.toLowerCase().includes(studentSearchInput.value.toLowerCase())) {
         newList.push(data[i]);
      } 
   }
   showPage(newList, 1);
   addPagination(newList);
   
   if (newList.length === 0){
      studentList.innerHTML = `<h3>No results were found.</h3>`;
   }
}

label.addEventListener('keyup', () => {
   searchStudentData(studentSearchInput.value);
});

studentSearchButton.addEventListener('click', () => {
   searchStudentData(studentSearchInput.value);
});
