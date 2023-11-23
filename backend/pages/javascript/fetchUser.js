// fetchUser.js
const cacheBuster = new Date().getTime(); // Add a timestamp as a cache buster
const url = `/getuserhomepagelogin?cacheBuster=${cacheBuster}`;
document.addEventListener('DOMContentLoaded', function () {
    // Fetch user information from the server and update the HTML
    console.log('Before fetch request');
    fetch('/getuserhomepagelogin')
        .then((response) => {
            console.log('Inside fetch request');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((user) => {
            console.log('User data:', user);
            document.getElementById('username').textContent = user.username;
            document.getElementById('user-email').textContent = user.email;
        })
        .catch((error) => console.error(error));
});
