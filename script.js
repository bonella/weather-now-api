console.log("Status: 'lendo o js'\n")
console.log('Token: 97c83ccff59245d2a36222808241104')
console.log("URL: 'https://api.weatherapi.com/v1/forecast.json?key=97c83ccff59245d2a36222808241104&q=${city}&days=1&aqi=no&alerts=no'\n\n")

let topCard = document.querySelector('.top-card')
let messageDiv = document.querySelector('.message')
let cityDiv = document.querySelector('.city')
let variationDiv = document.querySelector('.variation-temp')
let tempDiv = document.querySelector('.temp')
let conditionDiv = document.querySelector('.condition')
let windHumidityDiv = document.querySelector('.wind-humidity')
let form = document.querySelector('.form-city')
let search = document.querySelector('.search-city')

getWeather('Sao Paulo')

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    cityDiv.innerHTML = ""
    variationDiv.innerHTML = ""
    tempDiv.innerHTML = ""
    conditionDiv.innerHTML = ""
    windHumidityDiv.innerHTML = ""
    console.log(search.value)
    getWeather(search.value)

})

async function getWeather(city) {
    
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=97c83ccff59245d2a36222808241104&q=${city}&days=3&aqi=no&alerts=no&lang=pt`);
    let data = await response.json();
 
    console.log("Erro: " + response.status)
    // Verificando se há dados e se há dados.results
    if (data.hasOwnProperty("current")) {
        console.log(data.location.name) // Nome da cidade
        cityDiv.innerHTML += `<h2>${data.location.name}</h2>
                            <h3>${data.location.region}</h3>
                            <h4>${data.location.country}</h4>`
        console.log(data.location.localtime) // Dia da semana
        console.log(data.current.temp_c) // Temperatura atual
        tempDiv.innerHTML = `<h1>${data.current.temp_c}ºC</h1>`
        console.log(data.forecast.forecastday[0].day.mintemp_c) // Temperatura minima dia atual 
        console.log(data.forecast.forecastday[0].day.maxtemp_c) // Temperatura maxima dia atual 
        variationDiv.innerHTML += `<h3>${data.forecast.forecastday[0].day.mintemp_c}°C</h3>
                                <h3>/ ${data.forecast.forecastday[0].day.maxtemp_c}°C</h3>`
        console.log(data.current.condition.text) // Condicao 
        console.log(data.current.condition.icon) // Condicao icone
        console.log(data.current.wind_kph) // Wind vento km/h
        console.log(data.current.humidity) // Umidade %
        conditionDiv.innerHTML += `<img src='${data.current.condition.icon}'>
                                <h1>${data.current.condition.text}</h1>`

        windHumidityDiv.innerHTML += `<h2>Vento: ${data.current.wind_kph} km/h </h2>
                                    <h2>Umidade: ${data.current.humidity}%</h2>`
    } else {

        if (data.error.message == 'No matching location found.') {
            messageDiv.innerHTML = "<p>Nenhum local correspondente encontrado.</p>";
            setTimeout(function() {
                document.getElementById('message').textContent = '';
            }, 3000);

        } if (data.error.message == 'Parameter q is missing.') {
            messageDiv.innerHTML = "<p>Necessário informar uma cidade</p>";
            setTimeout(function() {
                document.getElementById('message').textContent = '';
            }, 5000);
        } 
        console.log(data.error.message)
        getWeather('Sao Paulo')
    }

}

