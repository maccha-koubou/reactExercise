import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      <div>
        filter shown with<input value={newFilter} onChange={handleFilterChange}/>
      </div>
    </form>
  )
}

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addName}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={addName}>add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow, deleteName}) => {
  return (
    <>
      {personsToShow.map(person =>
        <li key={person.id}>
          {person.name}
          {person.number}
          <button onClick={() => deleteName(person.id, person.name)}>delete</button>
        </li>
      )}
    </>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const personsToShow = persons.filter(person => person.name.includes(newFilter))

  useEffect(() => {
    personService
      .getAll()
      .then(gotPersons => {
        setPersons(gotPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      const popupText = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(popupText)){
        const newPerson = {...persons.find(person => person.name === newName), number: newNumber}
        personService
          .update(newPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(
                person => person.id === newPerson.id ? returnedPerson : person
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)  
          })
      }
    } else {
      const newPerson = {
        name: newName,
        id: String(persons.length + 1),
        number: newNumber,
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setErrorMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteName={deleteName}/>
    </div>
  )
}

export default App