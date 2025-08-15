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


// VISUALIZER SECTION //

let videos = [
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/PKMN002-2025.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/EDT2HDK-001.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/PKMN001-2025.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/CQ03-0024-2025__lores.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/CQ02-0023-2025__lores.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/CQ01-0022-2025.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0021-2025.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0020-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0019-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0018-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0017-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0016-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0015-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0014-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0013-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0012-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0011-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0010-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0009-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0008-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0007-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0006-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0005-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0004-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0003-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0002-2024.mp4',
    'https://storage.googleapis.com/fredito-online/assets/videos/mp4/0001-2024.mp4',


    // Add more vid names as needed
];

let videosDate = [
    'PKMN002-0027-2025',
    'EDT2001-0026-2025',
    'PKMN001-0025-2025',
    'CQ03-0024-2025',
    'CQ02-0023-2025',
    'CQ01-0022-2025',
    '0021-2025',
    '0020-2024',
    '0019-2024',
    '0018-2024',
    '0017-2024',
    '0016-2024',
    '0015-2024',
    '0014-2024',
    '0013-2024',
    '0012-2024',
    '0011-2024',
    '0010-2024',
    '0009-2024',
    '0008-2024',
    '0007-2024',
    '0006-2024',
    '0005-2024',
    '0004-2024',
    '0003-2024',
    '0002-2024',
    '0001-2024',
]

let remainingVideos = [...videos]; // Clone the videos array to keep track of remaining videos
let videoListContainer = document.getElementById('videoList');

// Function to update the video list and highlight the currently playing video
function updateVideoList() {
    videoListContainer.innerHTML = ''; // Clear the existing list

    videos.forEach((videoURL, index) => {
        const listItem = document.createElement('li');
        // Reverse the order: Display numbers in reverse (last index becomes 1)
        const reversedIndex = videos.length - 1 - index;
        listItem.textContent = `${reversedIndex + 1}`;
        listItem.style.listStyleType = 'none';
        listItem.style.padding = '3px';

        // Highlight the currently playing video
        if (remainingVideos.length === videos.length && videoURL === document.getElementById('visVid').src) {
            listItem.style.fontWeight = '400';
            listItem.style.color = 'whitesmoke';
        } else if (remainingVideos.length < videos.length && videoURL === document.getElementById('visVid').src) {
            listItem.style.fontWeight = '400';
            listItem.style.color = 'black';
            listItem.style.backgroundColor = 'rgba(98, 187, 139, 1)';
            listItem.style.border = '1px solid rgba(98, 187, 139, 1)';
        }

        // Add event listener to click on list item to select the video
        listItem.addEventListener('click', () => {
            loadSpecificVideo(index);
        });

        videoListContainer.appendChild(listItem);
    });
}

// Function to load the specific video when clicked from the list
function loadSpecificVideo(index) {
    document.getElementById('visVid').src = videos[index];
    document.getElementById('visDate').textContent = videosDate[index];
    remainingVideos = remainingVideos.filter(video => video !== videos[index]); // Remove clicked video from remainingVideos
    updateVideoList(); // Update the list after selecting a video
}

// Function to get a random video and update the video player
function getRandomVideo() {
    if (remainingVideos.length === 0) {
        // If all videos have been played, reset the remainingVideos array
        remainingVideos = [...videos];
    }

    // Get a random index from the remaining videos
    const randomIndex = Math.floor(Math.random() * remainingVideos.length);

    // Get the video URL and date
    const videoURL = remainingVideos[randomIndex];
    const videoDate = videosDate[videos.indexOf(videoURL)];

    // Set the video source and video date
    document.getElementById('visVid').src = videoURL;
    document.getElementById('visDate').textContent = videoDate;

    // Remove the played video from the remainingVideos array
    remainingVideos.splice(randomIndex, 1);

    // Update the list of videos
    updateVideoList();
}

// Add event listener to the video element
document.getElementById('visVid').addEventListener('click', getRandomVideo);

// Initially load a random video and date when the page loads
window.onload = () => {
    getRandomVideo();
    updateVideoList();
};

// Prevent video download
const videoElement = document.getElementById('visVid');

if (videoElement) {
  videoElement.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
}