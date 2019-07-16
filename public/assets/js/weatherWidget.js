window.addEventListener('load', () => {
  let long
  let lat
  //   let temperatureDescription = document.querySelector('.temp')
  let temperatureDegree = document.querySelector('.temperature')
  let locationTimezone = document.querySelector('.city')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/60e82f9c4079cd00729a55f1e8903064/${lat},${long}`

      fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          const { temprature, summary } = data.currently

          temperatureDegree.textContent = temperature
          locationTimezone.textContent = data.timezone
        })
    })
  }
})
