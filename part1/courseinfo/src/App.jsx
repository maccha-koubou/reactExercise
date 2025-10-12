import { useState } from 'react'

function Header(props) {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

function Part(props) {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

function Content(props) {
  return (
    <>
      {props.parts.map((x, i) => <Part key={i} part={x.name} exercises={x.exercises} />)}
    </>
  )
}

function Total(props) {
  let number = 0
  props.parts.forEach(x => number += x.exercises)

  return (
    <>
      <p>Number of exercises {number}</p>
    </>
  )
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App