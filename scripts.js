//Keyboard shortcuts

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'v':
            window.location.href = document.getElementById('visz').href;
            break;
        case 'h':
            window.location.href = document.getElementById('home').href;
            break;
        case 'a':
            window.location.href = document.getElementById('abt').href;
            break;
        case 's':
            window.location.href = document.getElementById('scnz').href;
            break;
        case 'p':
            window.location.href = document.getElementById('prds').href;
            break;
    }
});

// Cursor hover effect for VISUALIZERS page
let idleTimeout;
let messageTimeout;

document.addEventListener('mousemove', handleMouseInteraction);
document.addEventListener('touchstart', handleMouseInteraction); // Added for mobile touch support

// Handles mouse or touch interaction and checks if the cursor is over a grid item
function handleMouseInteraction(event) {
    const isCursorOverGridItem = event.target.closest('.content__vis--grid__item');
    const isCursorInGridContainer = event.target.closest('.content__vis--grid');
    const idleMessage = document.getElementById('idleMessage');

    if (isCursorInGridContainer && !isCursorOverGridItem) {
        // Get coordinates from touch events if available
        const x = event.clientX || event.touches[0].clientX;
        const y = event.clientY || event.touches[0].clientY;
        resetIdleTimer(x, y);
    } else {
        clearTimers();
        hideIdleMessage(idleMessage);
    }
}

// Shows the idle message after inactivity and positions it near the cursor
function displayIdleMessage(x, y) {
    // Prevent idle message from showing on smaller screens
    if (window.innerWidth <= 800) return;

    const idleMessage = document.getElementById('idleMessage');
    const isCursorOverGridItem = document.elementFromPoint(x, y).closest('.content__vis--grid__item');
    const isCursorInGridContainer = document.elementFromPoint(x, y).closest('.content__vis--grid');

    // Show the idle message only if the cursor is inside the grid container but outside grid items
    if (isCursorInGridContainer && !isCursorOverGridItem) {
        positionIdleMessage(idleMessage, x, y);
        idleMessage.style.display = 'block';

        messageTimeout = setTimeout(() => {
            hideIdleMessage(idleMessage);
        }, 4500); // Hide message after 4.5 seconds
    }
}

// Resets the idle timer to wait for inactivity before showing the message
function resetIdleTimer(x, y) {
    clearTimers();
    hideIdleMessage(document.getElementById('idleMessage'));
    idleTimeout = setTimeout(() => displayIdleMessage(x, y), 1000); // Show after 1 second of inactivity
}

// Clears both idle and message timers
function clearTimers() {
    clearTimeout(idleTimeout);
    clearTimeout(messageTimeout);
}

// Hides the idle message
function hideIdleMessage(idleMessage) {
    idleMessage.style.display = 'none';
}

// Positions the idle message near the cursor
function positionIdleMessage(idleMessage, x, y) {
    idleMessage.style.left = `${x + 10}px`;
    idleMessage.style.top = `${y - 8}px`;
}

// Initialize idle timer on page load
resetIdleTimer();






// VIDEO LOOPS ON HOVER
document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".video");

    videos.forEach((video) => {
        video.addEventListener("mouseenter", function () {
            video.play();
        });

        video.addEventListener("mouseleave", function () {
            video.pause();
        });
    });

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Function to check if an element is in the viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // Function to handle video play/pause based on viewport visibility
        function handleVideoPlayback() {
            videos.forEach((video) => {
                if (isInViewport(video)) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }

        // Initial check when DOM content is loaded
        handleVideoPlayback();

        // Event listener for scroll events
        window.addEventListener("scroll", handleVideoPlayback);
        videos.autoplay = true;
    }
});

// LOAD MORE BUTTON
const loadMoreBtn = document.getElementById('loadMoreBtn');
const hiddenItems = document.querySelectorAll('.hidden');

let itemsToShow = 2; // Number of items to reveal per click
let currentIndex = 0;

// Function to reveal hidden items
function loadMoreItems() {
    const endIndex = currentIndex + itemsToShow;

    // Loop through the hidden items and reveal them
    for (let i = currentIndex; i < endIndex && i < hiddenItems.length; i++) {
        hiddenItems[i].classList.remove('hidden');
    }

    currentIndex = endIndex;

    // Hide the 'Load More' button if all items are visible
    if (currentIndex >= hiddenItems.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Event listener for the 'Load More' button
loadMoreBtn.addEventListener('click', loadMoreItems);

// Keyboard shortcut for the "M" key
document.addEventListener('keydown', (event) => {
    if (event.key === 'M' || event.key === 'm') {
        loadMoreItems();
    }
});


// //REMOVE HIDDEN ON MOBILE
// // Function to check the screen width and remove the 'hidden' class
// function checkScreenWidth() {
//     const elements = document.querySelectorAll('.hidden'); // Select all elements with the 'hidden' class
//     if (window.matchMedia('(max-width: 750px)').matches) {
//       elements.forEach(element => {
//         element.classList.remove('hidden'); // Remove the 'hidden' class
//       });
//     }
//   }
  
//   // Run the function on page load
//   checkScreenWidth();