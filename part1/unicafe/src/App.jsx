import { useState } from 'react'

const Display = props => <div>{props.name} {props.value}</div>

const Header = ( {title} ) => {
  return (
    <h2>{title}</h2>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title='Give feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <Header title='Statistics' />
      <Display name='good' value={good} />
      <Display name='neutral' value={neutral} />
      <Display name='bad' value={bad} />
    </div>
  )
}

export default App