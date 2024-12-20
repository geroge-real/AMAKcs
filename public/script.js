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

document.querySelector('.menu-button').addEventListener('click', function() {
  const menuContent = document.querySelector('.menu-content');
  menuContent.classList.toggle('show');
});

window.addEventListener('click', function(event) {
  // Close the dropdown if the user clicks outside the menu
  if (!event.target.closest('.menu')) {
    const menuContent = document.querySelector('.menu-content');
    if (menuContent.classList.contains('show')) {
      menuContent.classList.remove('show');
    }
  }
});



//profile js to save
window.onload = function() {

    const username = localStorage.getItem('username');

    const email = localStorage.getItem('email');

    const books = JSON.parse(localStorage.getItem('favoriteBooks'));

    if (username) document.getElementById('username').value = username;

    if (email) document.getElementById('email').value = email;

    if (books) {

        const bookInputs = document.querySelectorAll('.book');

        books.forEach((book, index) => {

            if (bookInputs[index]) bookInputs[index].value = book;

        });

    }

};

// this is function to save profile to localstorage (temporary)

function saveProfile() {

    const username = document.getElementById('username').value;

    const email = document.getElementById('email').value;

    const bookInputs = document.querySelectorAll('.book');

    const favoriteBooks = Array.from(bookInputs).map(input => input.value);

    localStorage.setItem('username', username);

    localStorage.setItem('email', email);

    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));

    alert("Profile information saved successfully!");

}
