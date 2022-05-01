import React, { useEffect, useState } from 'react'
import {checkWin} from '../helpers/helpers'

const Popup = ({ selectedWord, 
                 correctLetters, 
                 wrongLetters, 
                 setCanPlay, 
                 playAgain,
                 selectedWordObj }) => {
  let finalMessage = '';
  let revealWord = '';
  let canPlay = true;
  let gameStatus = checkWin(correctLetters, wrongLetters, selectedWord);
  const [close, setClose] = useState(false);

  if(gameStatus === 'win') {
      finalMessage = 'Congratulations, you got it! 🥳';
      revealWord = `'${selectedWord}'`;
      canPlay = false;
  } else if(gameStatus === 'lose') {
      finalMessage = 'Sorry, you lost. 😢 Better luck next time!'
      revealWord = `... the word was '${selectedWord}'`;
      canPlay = false;
  }

  useEffect(() => setCanPlay(canPlay));

  return (
    <div className="popup-container" 
         style={finalMessage !== '' && !close ? {display: "flex"} : {}}>
      <div className='wrapper'>
        <button className="close-btn" onClick={() => setClose(true)}>X</button>
        <div className="popup">
            <h2>{finalMessage}</h2>
            <h3>{revealWord}<span> ({selectedWordObj.partOfSpeech})</span></h3>
            <h3>Definition: {selectedWordObj.definition}</h3>
            <p>Example: <i>{selectedWordObj.example}</i></p>
            <button onClick={playAgain}>Play Again</button>
        </div>
      </div>
    </div>
  )
}

export default Popup