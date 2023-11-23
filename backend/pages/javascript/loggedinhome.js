console.log('Hello from loggedinhome.js');

document.addEventListener('DOMContentLoaded', function () {
    // Selecting the sidebar and buttons
    const sidebar = document.querySelector(".sidebar");
    const sidebarOpenBtn = document.querySelector("#sidebar-open");
    const sidebarCloseBtn = document.querySelector("#sidebar-close");
    const sidebarLockBtn = document.querySelector("#lock-icon");

    // Adding some console.log statements for debugging
    console.log('Sidebar and buttons selected:', sidebar, sidebarOpenBtn, sidebarCloseBtn, sidebarLockBtn);

    // Function to toggle the lock state of the sidebar
    const toggleLock = () => {
        console.log('Toggle lock function called!');
        sidebar.classList.toggle("locked");
        if (!sidebar.classList.contains("locked")) {
            sidebar.classList.add("hoverable");
            sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
        } else {
            sidebar.classList.remove("hoverable");
            sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
        }
    };

    // Function to hide the sidebar when the mouse leaves
    const hideSidebar = () => {
        console.log('Hide sidebar function called!');
        if (sidebar.classList.contains("hoverable")) {
            sidebar.classList.add("close");
        }
    };

    // Function to show the sidebar when the mouse enters
    const showSidebar = () => {
        console.log('Show sidebar function called!');
        if (sidebar.classList.contains("hoverable")) {
            sidebar.classList.remove("close");
        }
    };

    // Function to show and hide the sidebar
    const toggleSidebar = () => {
        console.log('Toggle sidebar function called!');
        sidebar.classList.toggle("close");
    };

    // Adding event listeners to buttons and sidebar for the corresponding actions
    sidebarLockBtn.addEventListener("click", toggleLock);
    sidebar.addEventListener("mouseleave", hideSidebar);
    sidebar.addEventListener("mouseenter", showSidebar);
    sidebarOpenBtn.addEventListener("click", toggleSidebar);
    sidebarCloseBtn.addEventListener("click", toggleSidebar);

    // Fetch user information from the server and update the HTML
    console.log('Before fetch request');
    fetch('/getuserhomepagelogin')
        .then((response) => {
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

    // Selecting the logout button
    const logoutButton = document.getElementById('logoutButton');

    // Function to handle hover effect for the logout button
    function addHoverEffect(element, colorOnHover, colorOnLeave) {
        element.addEventListener("mouseover", () => {
            element.style.backgroundColor = colorOnHover;
        });
        element.addEventListener("mouseleave", () => {
            element.style.backgroundColor = colorOnLeave;
        });
    }

    // Call the function to add hover effect for the logout button
    addHoverEffect(logoutButton, '#ddd', 'transparent');

    
});
