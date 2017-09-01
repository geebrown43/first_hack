var form = document.getElementById('search')
var destination = document.getElementsByClassName('destination')[0]


form.addEventListener('submit', function(event) {
  event.preventDefault();

  var apiKey = 'AIzaSyCJCb8Lx2S4e3CivVKoTYseRTSCkOMR_5U'

  var name = ['restaurant']

  var latLong = ['-33.8670,151.1957','-36.848461,174.763336','45.596832,-64.952332','35.652832,139.839478']
  var randomLatLong = latLong[Math.floor(latLong.length * Math.random())]

  fetch(`https://galvanize-cors.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${randomLatLong}&radius=5000&name=${name}&key=${apiKey}`)
    .then((response) => {
      return response.json()
        .then((data) => {

          console.log(name)
          console.log(randomLatLong)
          console.log(data.results)

          destination.innerHTML = ''

          var str = data.results[0].vicinity
          region = str.split(',').pop();
          console.log(region)

          var country = document.createElement('div')
          country.classList.add('country')
          destination.append(country)
          var h1 = document.createElement('h1')
          h1.innerText= region
          country.append(h1)

          console.log(region)
          if(region === 'Alma'){
            var currency = ''
            currency = 'CAD'
            console.log(currency)
          }
          // var currency = 'AUD'

          fetch(`http://api.fixer.io/latest?symbols=${currency}`)
            .then((response) => {
              return response.json()
              .then((currencyData) => {
                var date =currencyData.rates
                for(var i in date){
                var pTag = document.createElement('p')
                pTag.textContent = date[i];
                country.append(pTag)
                console.log(pTag)
                console.log(date)
              }
            })
          })


          // function diffCurrency(region) {
          //   var currency = ''
          //      switch (region) {
          //        case 'Auckland':
          //          currency = 'NZD';
          //          console.log(currency)
          //          break;
          //        case 'Alma':
          //          currency = 'CAD';
          //          console.log(currency)
          //          break;
          //        case 'Sydney':
          //          currency = 'AUD';
          //          break;
          //        case 'Koto':
          //          currency = 'JPY';
          //          break;
          //        default:
          //          currency = 'USD';
          //          break;
          //        }
          //         return currency;
          //      }
          //       console.log(diffCurrency(region))


          for(var i = 0; i < data.results.length; i++){

            var h3 = document.createElement('h3')
            var img = document.createElement('img')
            img.classList.add('icon')
            var p = document.createElement('p')
            var star = document.createElement('img')
            star.classList.add('star')
            var div = document.createElement('div')
            div.classList.add('restaurant')

            h3.innerText = data.results[i].name
            img.setAttribute('src', data.results[i].icon)
            p.innerText = data.results[i].rating
            star.setAttribute('src', 'pictures/3D-Gold-Star-PNG-File.png')

            destination.append(img)
            destination.append(h3)
            destination.append(div)
            div.append(p)
            div.append(star)
          }
        })
    })
})
