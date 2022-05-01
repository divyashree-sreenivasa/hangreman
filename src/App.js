import './App.css';
import Header from './components/Header'
import Figure from './components/Figure'
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { useEffect, useState } from 'react';
import {checkWin, showNotification as show} from './helpers/helpers';
import {data as words} from './data';
import Keyboard from './components/Keyboard';
import Hint from './components/Hint';
import Statistics from './components/Statistics';
import Help from './components/Help';


let selectedWord;
let selectedWordObj;

const getNewRandomWord = () => {
  selectedWordObj = words[Math.floor(Math.random() * words.length)];
  selectedWord = selectedWordObj["word"].toUpperCase();
}

getNewRandomWord();

function App() {
  const [canPlay, setCanPlay] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);
 
  useEffect(() => {
    const handleKeyDown = (event) => {
      const {key, keyCode} = event;

      if(canPlay && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toUpperCase();
        console.log(key, keyCode);
        
        if(selectedWord.includes(letter)) {
          if(!correctLetters.includes(letter)) {
            setCorrectLetters([...correctLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if(!wrongLetters.includes(letter)) {
            setWrongLetters([...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [canPlay, correctLetters, wrongLetters]);

  useEffect(() => {
    if(wrongLetters.length === 5) setShowHint(true);
    else setShowHint(false);
  }, [wrongLetters])

  useEffect(() => {
    let gameStatus = checkWin(correctLetters, wrongLetters, selectedWord);
    const gameStatsInit = {
      winCount: 0,
      loseCount: 0,
      gameCount: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0]
    }
    let gameStats = {};

    if(localStorage.getItem("gameStats") === null) 
        localStorage.setItem("gameStats", JSON.stringify(gameStatsInit));
    console.log(JSON.parse(localStorage.getItem("gameStats")));

    gameStats = JSON.parse(localStorage.getItem("gameStats"));

    if(canPlay === false) {
      if(gameStatus === 'win') {
        gameStats.winCount += 1;
        gameStats.guessDistribution[wrongLetters.length] += 1;
        localStorage.setItem("gameStats", JSON.stringify(gameStats));
      } else if(gameStatus === 'lose') {
          gameStats.loseCount += 1; 
          localStorage.setItem("gameStats", JSON.stringify(gameStats));
      }
    }
    // } else {
    //   gameStats.gameCount += 1;
    //   localStorage.setItem("gameStats", JSON.stringify(gameStats));
    // }
  }, [canPlay, correctLetters, wrongLetters])

  const playAgain = () => {
    setCanPlay(true);

    setCorrectLetters([]);
    setWrongLetters([]);
    setShowHint(false);
    getNewRandomWord();
  }

  return (
    <div className='app'>
      <Header setShowStats={setShowStats} setShowHelp={setShowHelp}/> 
      <Statistics setShowStats={setShowStats} showStats={showStats}/>
      <Help setShowHelp={setShowHelp} showHelp={showHelp}/>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        {/* <WrongLetters wrongLetters={wrongLetters}/> */}
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        
      </div>
      {showHint && <Hint selectedWordObj={selectedWordObj}/>}
      <Keyboard correctLetters={correctLetters} 
                wrongLetters={wrongLetters} 
                setCorrectLetters={setCorrectLetters} 
                setWrongLetters={setWrongLetters}
                selectedWord={selectedWord}
                setShowNotification={setShowNotification}
      />
      <Popup selectedWord={selectedWord} correctLetters={correctLetters} wrongLetters={wrongLetters} setCanPlay={setCanPlay} playAgain={playAgain} selectedWordObj={selectedWordObj} />
      <Notification showNotification={showNotification}/>
      
    </div>
  );
}

export default App;
