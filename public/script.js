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

// Add a click event listener to toggle the 'show' class
menuButton.addEventListener('click', () => {
  menuContent.classList.toggle('show');
});




// Function to load profile information on both pages
window.onload = function() {
    const username = localStorage.getItem('username') || "Pisay Dela Cruz"; // Default value
    const email = localStorage.getItem('email') || "atlmendoza@pshs.edu.ph";
    const books = JSON.parse(localStorage.getItem('favoriteBooks')) || [];

    // If on the edit profile page (profile.html)
    if (document.getElementById('username')) {
        document.getElementById('username').value = username;
        document.getElementById('email').value = email;

        const bookInputs = document.querySelectorAll('.book');
        books.forEach((book, index) => {
            if (bookInputs[index]) bookInputs[index].value = book;
        });
    }

    // If on the main profile page (mainprofile.html)
    if (document.getElementById('displayName')) {
        document.getElementById('displayName').textContent = `Welcome, ${username}!`;
    }
    if (document.getElementById('displayUsername')) {
        document.getElementById('displayUsername').textContent = username;
    }
};

// Function to save profile changes
function saveProfile() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const bookInputs = document.querySelectorAll('.book');
    const favoriteBooks = Array.from(bookInputs).map(input => input.value);

    // Save to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));

    alert("Profile information saved successfully!");
}

