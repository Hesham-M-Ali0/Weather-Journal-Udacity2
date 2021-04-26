// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */
const dateId = document.getElementById('date');
const tempId = document.getElementById('temp');
const contentId = document.getElementById('content');
const generate = document.getElementById('generate');

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=960ae15f899f65ca3e7fcc795520ce5e&units=metric';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

//api.openweathermap.org/data/2.5/weather?zip=${inputZIP}&appid=${apiKey}

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', start);

/* Function called by event listener */
function start(e){
    const inputZIP = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // Condition to check if the user has been add a value inside the input element.
    if(inputZIP){
        getData(baseURL, inputZIP, apiKey)
        .then(function(data){
            // console.log(data);
            postData('/addData', {temp: data.main.temp, date: newDate, content:feelings});
        })
        .then(() => updateUI())
    } else { // If the input is empty alert him to enter ZIP code
        alert('Please, enter a ZIP code!')
    }
}

/* Function to GET Web API Data*/
const getData = async (baseURL, zip, apiKey) =>{
    const response = await fetch(baseURL+zip+apiKey)
    try{
        const data = await response.json();
        return data;
    } catch(error) {
        // Appropriately handle the error
        console.log('error', error)
    }
    
}

/* Function to POST data */
const postData = async (url = '/addData', data = {})=>{
    console.log(data)
    const response = await fetch(url, {
        method: 'POST', // GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // Include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        return;
    }catch(error){
        // Appropriately handle the error
        console.log('error', error)
    }
}

/* Function to GET Project Data */
const updateUI = async() => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        dateId.innerHTML = 'Date: ' + allData.date;
        tempId.innerHTML = 'Temp: ' + allData.temp;
        contentId.innerHTML = 'You feel: ' + allData.feelings;
    }catch(error){
        console.log('error', error);
    }
}