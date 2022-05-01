import './App.css';
import Header from './components/Header'
import Figure from './components/Figure'
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { useEffect, useState } from 'react';
import {showNotification as show} from './helpers/helpers';
import {data as words} from './data';
import Keyboard from './components/Keyboard';
import Hint from './components/Hint';


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

  const playAgain = () => {
    setCanPlay(true);

    setCorrectLetters([]);
    setWrongLetters([]);
    setShowHint(false);
    getNewRandomWord();
  }

  return (
    <div className='app'>
      <Header/> 
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
