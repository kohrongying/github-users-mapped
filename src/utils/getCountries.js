const axios = require("axios")
const fs = require("fs")

axios.get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    const countries = response.data;
    const countriesSmall = countries.map(c => {
      return {
        name: c.name,
        latlng: c.latlng
      };
    });
    fs.writeFileSync('../constants/countries.json', JSON.stringify(countriesSmall) )
  })
  .catch(err =>{
    console.log(err)
  })