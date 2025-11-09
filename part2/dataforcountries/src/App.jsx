import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      <div>
        find countried <input value={newFilter} onChange={handleFilterChange}/>
      </div>
    </form>
  )
}

const Details = ({country}) => {
  if (!country) {
    return null
  } else {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        {Object.values(country.languages).map((language, index) =>
          <li key={index}>{language}</li>
        )}
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
  )}
}

const CountryList = ({countriesToShow, detailsToShow, setDetailsToShow}) => {
  if (countriesToShow.length > 10 && !detailsToShow) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countriesToShow.length > 1) {
    return (
      <>
        {countriesToShow.map((country, index) =>
          <li key={index}>
            {country.name.common}
            <button onClick={() => setDetailsToShow(country)}>Show</button>
          </li>
        )}
      </>
    )
  } else if (!detailsToShow) {
    return (
      <div>
        No country matches
      </div>
    )
  } else {
    return null
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [detailsToShow, setDetailsToShow] = useState(null)
  const countriesToShow = countries.filter(country => country.name.common.includes(newFilter))

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setDetailsToShow(countriesToShow[0])
    }
  }, [countriesToShow])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setDetailsToShow(null)
  }

  return (
    <>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <CountryList countriesToShow={countriesToShow} detailsToShow={detailsToShow} setDetailsToShow={setDetailsToShow}/>
      <Details country={detailsToShow}/>
    </>
  )
}

export default App