//Keyboard shortcuts

// document.addEventListener('keydown', function(event) {
//     switch (event.key) {
//         case 'v':
//             window.location.href = document.getElementById('visz').href;
//             break;
//         case 'h':
//             window.location.href = document.getElementById('home').href;
//             break;
//         case 'a':
//             window.location.href = document.getElementById('abt').href;
//             break;
//         case 's':
//             window.location.href = document.getElementById('scnz').href;
//             break;
//         case 'p':
//             window.location.href = document.getElementById('prds').href;
//             break;
//     }
// });

// Cursor hover effect for VISUALIZERS page
let idleTimeout;
let messageTimeout;

document.addEventListener('mousemove', debounce(handleMouseInteraction, 100));
document.addEventListener('touchstart', debounce(handleMouseInteraction, 100));

// Handles mouse or touch interaction and checks if the cursor is over a grid item
function handleMouseInteraction(event) {
    const isCursorOverGridItem = event.target.closest('.content__vis--grid__item');
    const isCursorInGridContainer = event.target.closest('.content__vis--grid');
    const idleMessage = document.getElementById('idleMessage');

    // Determine coordinates based on input type
    const x = event.touches?.[0]?.clientX || event.clientX;
    const y = event.touches?.[0]?.clientY || event.clientY;

    if (isCursorInGridContainer && !isCursorOverGridItem) {
        resetIdleTimer(x, y);
    } else {
        clearTimers();
        hideIdleMessage(idleMessage);
    }
}

// Shows the idle message after inactivity and positions it near the cursor
function displayIdleMessage(x, y) {
    if (window.innerWidth <= 800) return; // Skip for smaller screens

    const idleMessage = document.getElementById('idleMessage');
    const isCursorOverGridItem = document.elementFromPoint(x, y)?.closest('.content__vis--grid__item');
    const isCursorInGridContainer = document.elementFromPoint(x, y)?.closest('.content__vis--grid');

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
    if (x != null && y != null) {
        idleTimeout = setTimeout(() => displayIdleMessage(x, y), 1000); // Show after 1 second of inactivity
    }
}

// Clears both idle and message timers
function clearTimers() {
    clearTimeout(idleTimeout);
    clearTimeout(messageTimeout);
}

// Hides the idle message
function hideIdleMessage(idleMessage) {
    if (idleMessage) idleMessage.style.display = 'none';
}

// Positions the idle message near the cursor
function positionIdleMessage(idleMessage, x, y) {
    idleMessage.style.left = `${x + 10}px`;
    idleMessage.style.top = `${y - 8}px`;
}

// Debounce function to optimize event listeners
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}







// // VIDEO LOOPS ON HOVER
// document.addEventListener("DOMContentLoaded", function () {
//     const videos = document.querySelectorAll(".video");

//     videos.forEach((video) => {
//         video.addEventListener("mouseenter", function () {
//             video.play();
//         });

//         video.addEventListener("mouseleave", function () {
//             video.pause();
//         });
//     });

//     const isMobile = window.innerWidth <= 768;

//     if (isMobile) {
//         // Function to check if an element is in the viewport
//         function isInViewport(element) {
//             const rect = element.getBoundingClientRect();
//             return (
//                 rect.top >= 0 &&
//                 rect.left >= 0 &&
//                 rect.bottom <=
//                 (window.innerHeight || document.documentElement.clientHeight) &&
//                 rect.right <=
//                 (window.innerWidth || document.documentElement.clientWidth)
//             );
//         }

//         // Function to handle video play/pause based on viewport visibility
//         function handleVideoPlayback() {
//             videos.forEach((video) => {
//                 if (isInViewport(video)) {
//                     video.play();
//                 } else {
//                     video.pause();
//                 }
//             });
//         }

//         // Initial check when DOM content is loaded
//         handleVideoPlayback();

//         // Event listener for scroll events
//         window.addEventListener("scroll", handleVideoPlayback);
//         videos.autoplay = true;
//     }
// });


document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".video");
    let currentIndex = 0; // Tracks the index of the current video being played
    let playInterval;

    // Function to pause all videos
    function pauseAllVideos() {
        videos.forEach(video => video.pause());
    }

    // Function to play the current video and pause all others
    function playCurrentVideo() {
        pauseAllVideos(); // Pause all videos
        const currentVideo = videos[currentIndex];
        currentVideo.play();
    }

    // Function to go to the next video (looping back to the first video when the end is reached)
    function goToNextVideo() {
        currentIndex = (currentIndex + 1) % videos.length; // Loop back to the start after the last video
        playCurrentVideo();
    }

    // Start the automatic video switch every 5 seconds
    function startAutoSwitch() {
        playInterval = setInterval(goToNextVideo, 5000);
    }

    // Hover behavior: when a user hovers over a video, pause the others and play the hovered one
    videos.forEach((video, index) => {
        video.addEventListener("mouseenter", function () {
            // Stop the automatic switch when hovering
            clearInterval(playInterval);
            
            // Pause all videos
            pauseAllVideos();
            
            // Play the hovered video
            video.play();
        });

        video.addEventListener("mouseleave", function () {
            // Resume the automatic video switch after hovering ends
            startAutoSwitch();
        });
    });

    // IntersectionObserver to ensure that only visible videos play when not hovered
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                // If the video is in the viewport, play it (only if it's not currently paused)
                if (video !== videos[currentIndex] && !video.paused) {
                    video.play();
                }
            } else {
                // If the video is out of the viewport, pause it
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    // Observe each video element
    videos.forEach((video) => {
        observer.observe(video);
    });

    // Start the first video
    playCurrentVideo();

    // Start auto-switching of videos
    startAutoSwitch();
});





document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenItems = Array.from(document.querySelectorAll('.hidden'));

    const itemsToShow = 6; // Number of items to reveal per click
    let currentIndex = 0;

    // Function to reveal hidden items
    function loadMoreItems() {
        const endIndex = Math.min(currentIndex + itemsToShow, hiddenItems.length);

        for (let i = currentIndex; i < endIndex; i++) {
            hiddenItems[i].classList.remove('hidden');
        }

        currentIndex = endIndex;

        if (currentIndex >= hiddenItems.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    if (loadMoreBtn && hiddenItems.length > 0) {
        loadMoreBtn.addEventListener('click', loadMoreItems);
    } else if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
});



// Keyboard shortcut for the "M" key
document.addEventListener('keydown', (event) => {
    if (event.key === 'M' || event.key === 'm') {
        loadMoreItems();
    }
});

document.querySelectorAll('.cls-1').forEach((logo) => {
    logo.addEventListener('mouseenter', () => {
        const landingVid = document.querySelector('.landing-vid');
        if (landingVid) {
            landingVid.style.mixBlendMode = 'saturation'; // Apply 'saturation' blend mode
        }
    });

    logo.addEventListener('mouseleave', () => {
        const landingVid = document.querySelector('.landing-vid');
        if (landingVid) {
            landingVid.style.mixBlendMode = 'normal'; // Reset to 'normal' blend mode
        }
    });
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



document.addEventListener("DOMContentLoaded", () => {
    // Select the logo element
    const logo = document.querySelector("#logo");
    const logoWidth = logo.offsetWidth;
    const logoHeight = logo.offsetHeight;
  
    // Initial position and movement speed
    let posX = Math.random() * (window.innerWidth - logoWidth); // Random X position
    let posY = Math.random() * (window.innerHeight - logoHeight); // Random Y position
    let speedX = 1; // Horizontal speed
    let speedY = 1; // Vertical speed
  
    // Update the logo's position
    function moveLogo() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
  
      // Calculate new position
      posX += speedX;
      posY += speedY;
  
      // Check for collisions with the window boundaries and reverse direction if necessary
      if (posX + logoWidth >= windowWidth || posX <= 0) {
        speedX *= -1;
      }
  
      if (posY + logoHeight >= windowHeight || posY <= 0) {
        speedY *= -1;
      }
  
      // Apply the new position with smooth movement
      logo.style.left = `${posX}px`;
      logo.style.top = `${posY}px`;
  
      // Continue the animation with the next frame
      requestAnimationFrame(moveLogo);
    }
  
    // Set the logo's initial position
    logo.style.position = "absolute";
    logo.style.left = `${posX}px`;
    logo.style.top = `${posY}px`;
  
    // Start the movement animation
    moveLogo();
  });
  

 



