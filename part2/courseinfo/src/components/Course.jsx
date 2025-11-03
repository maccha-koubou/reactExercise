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
      {props.parts.map((x, i) => <Part key={x.id} part={x.name} exercises={x.exercises} />)}
    </>
  )
}

function Total(props) {
  let number = props.parts.reduce((lastValue, parts) => lastValue + parts.exercises, 0)

  return (
    <>
      <p>Number of exercises {number}</p>
    </>
  )
}

function Course({course : {name, parts}}) {
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course