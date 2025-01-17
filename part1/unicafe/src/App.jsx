import { useState } from 'react'

const StatisticsLine = props => <tr><td>{props.name}</td><td>{props.value}</td></tr>

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

const Statistics = ( { good, neutral, bad } ) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
    return (
      <table>
        <tbody>
          <StatisticsLine name='good' value={good} />
          <StatisticsLine name='neutral' value={neutral} />
          <StatisticsLine name='bad' value={bad} />
          <StatisticsLine name='all' value={all} />
          <StatisticsLine name='average' value={average} />
          <StatisticsLine name='positive' value={positive + ' %'} />
        </tbody>
      </table>
    )
}

const App = () => {
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App