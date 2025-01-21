const Header = ({ course }) => <h3>{course}</h3>

const Total = ({ sum }) => <b>Total of {sum} exercises</b>

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) =>
        <Part key={i} part={part} />
      )}
    </div>
  )
}

const Course = ({ course, parts }) => {
  const sum = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 0
  )
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course