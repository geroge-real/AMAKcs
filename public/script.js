//function for searching
function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const books = document.getElementsByClassName('book');
    
    for (let i = 0; i < books.length; i++) {
        const title = books[i].getAttribute('data-title').toLowerCase();
        const author = books[i].getAttribute('data-author').toLowerCase();
        
        if (title.includes(searchInput) || author.includes(searchInput)) {
            books[i].style.display = "";
        } else {
            books[i].style.display = "none";
        }
    }
}

//menu button code

// Select the menu button and menu content
const menuButton = document.querySelector('.menu-button');
const menuContent = document.querySelector('.menu-content');

// add a click event listener to toggle the 'show' class
menuButton.addEventListener('click', () => {
  menuContent.classList.toggle('show');
});




// Load profile data on both profile.html (edit page) and mainprofile.html (profile page)
function loadProfile() {
    const username = localStorage.getItem('username') || "User";
    const email = localStorage.getItem('email') || "your.email@example.com";
    const books = JSON.parse(localStorage.getItem('favoriteBooks')) || ["Book 1", "Book 2", "Book 3"];

    // If on the Edit Profile Page (profile.html)
    if (document.getElementById('username')) {
        document.getElementById('username').value = username;
        document.getElementById('email').value = email;

        const bookInputs = document.querySelectorAll('.book');
        books.forEach((book, index) => {
            if (bookInputs[index]) bookInputs[index].value = book;
        });
    }

    // If on the Main Profile Page (mainprofile.html)
    if (document.getElementById('displayName')) {
        document.getElementById('displayName').textContent = username;
        document.getElementById('displayBio').textContent = username;
        document.getElementById('displayUsername').textContent = username.toLowerCase().replace(/\s+/g, '');
    }
}

// Save profile changes to localStorage
function saveProfile() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bookInputs = document.querySelectorAll('.book');
    const favoriteBooks = Array.from(bookInputs).map(input => input.value);

    // Save data to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));

    alert("Profile information saved successfully!");

    // Redirect to main profile page to see the changes
    window.location.href = "mainprofile.html";  
}

// Run the function when the page loads
window.onload = loadProfile;


