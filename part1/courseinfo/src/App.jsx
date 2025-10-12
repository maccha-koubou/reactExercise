import { useState } from 'react'

function Header(propt) {
  return (
    <>
      <h1>{propt.course}</h1>
    </>
  )
}

function Part(propt) {
  return (
    <>
      <p>
        {propt.part} {propt.exercises}
      </p>
    </>
  )
}

function Content(propt) {
  return (
    <>
      <Part part={propt.part1} exercises={propt.exercises1} />
      <Part part={propt.part2} exercises={propt.exercises2} />
      <Part part={propt.part3} exercises={propt.exercises3} />
    </>
  )
}

function Total(propt) {
  return (
    <>
      <p>Number of exercises {propt.exercises1 + propt.exercises2 + propt.exercises3}</p>
    </>
  )
}

function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App