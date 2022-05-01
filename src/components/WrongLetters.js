const WrongLetters = ({wrongLetters}) => {
  return (
    <div className="wrong-letters-container">
        <div id="wrong-letters">
          {wrongLetters.length > 0 && <p>Wrong</p>}
          {wrongLetters.map((letter, i) => <span key={i}>{letter}{i !== wrongLetters.length-1 ? ', ' : ''}</span>)}
        </div>
    </div>
  )
}

export default WrongLetters