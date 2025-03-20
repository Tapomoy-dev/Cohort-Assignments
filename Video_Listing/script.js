
const searchBar = document.getElementById('searchBar');
const videoContainer = document.querySelector('.video-container');

let videoArray = [] // empty array for storing video data

// fetching videos from api

async function fetchVideos(){

    // defining api url and function
    const url = 'https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest'
    const options = { method: 'GET', headers: { accept: 'application/json' } }

    try {
        const response = await fetch(url, options)
        const videoData = await response.json()

        videoArray= videoData.data.data // storing videos in the video array
        displayVideos(videoArray) // for rendering videos
        
        
    }catch(error){
        alert("Failed to fetch")
        console.log(error)
    }
}

function displayVideos (videos){
    videoContainer.innerHTML= ''; // cleared previously stored videos
    videos.forEach((video) =>{   
        //accssing video data
        const thumbnail = video.items.snippet.thumbnails.medium 
        const title = video.items.snippet.title
        const channel = video.items.snippet.channelTitle

        const videoElement = document.createElement('div') // creating a video element, assignimg class and inner html
        videoElement.classList.add('video-element')
        videoElement.innerHTML=`
            <div class="video-card">
                <div class="thumbnail-card">
                    <a href="https://www.youtube.com/watch?v=${video.items.id}" target='_blank' title='${title}'>
                        <img src="${thumbnail.url}" alt="Video Thumbnail" width="${thumbnail.width}">
                    </a>
                </div>
                <div class="content-card">
                    ${title} </br> Channel: ${channel}
                </div>
            </div>`;
            videoContainer.appendChild(videoElement) // one video element added to videoContainer 
    });
}
// added eventlistener in searchbar for filtring videos
searchBar.addEventListener('input',()=>{
    const searchedVideo = searchBar.value.trim().toLowerCase()
    const filteredvideo = videoArray.filter((video)=>
            video.items.snippet.title.toLowerCase().includes(searchedVideo)
            )
            displayVideos(filteredvideo);
});

// function called to fetch videos on loading the web page
fetchVideos();


