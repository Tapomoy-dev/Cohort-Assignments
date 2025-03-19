
const moodSelect = document.getElementById('mood');
const logButton= document.getElementById('logMood');
const deleteButton = document.getElementById('deleteLogs');
const historyButton = document.getElementById('history');
const moodLog = document.getElementById('moodLog');

//adding eventlistner to the buttons in order to make those functional
logButton.addEventListener('click',logMood);
deleteButton.addEventListener('click',deleteAllLogs);
historyButton.addEventListener('click',showLogs)

function logMood(){
    const mood = moodSelect.value;
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
    const moodEntry = `${date} ${time}- ${mood} `;

    saveMood(moodEntry); // function for saving into local storage

    displayMoodLog(); // To display updated mood logs

}

// for storing in local storage
function saveMood(moodEntry){
    let moods = JSON.parse(localStorage.getItem('moods'))|| []; // gives previously stored moods in local storage, if none returns empty array
    moods.push(moodEntry);
    localStorage.setItem('moods',JSON.stringify(moods)); // saves mood into local storage
}

// function for displaying moods in the dom
function displayMoodLog(){
    let moods = JSON.parse(localStorage.getItem('moods'))|| [];
    moodLog.innerHTML = moods.map(mood =>`<p> ${mood}</p>`).join(''); //iterates on moods array and create new element
    moodLog.style.display =moods.length? 'block' :'none';

}

// function for deleting all logs from local storage
function deleteAllLogs(){
    localStorage.removeItem('moods');
    displayMoodLog();
}

// function for grtting mood history if stored 
function showLogs(){
    displayMoodLog();
}

