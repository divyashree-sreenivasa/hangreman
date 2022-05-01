import { useEffect } from "react";
import { showNotification as show } from "../helpers/helpers";


const Keyboard = ({ correctLetters, wrongLetters,
                    setCorrectLetters, setWrongLetters,
                    selectedWord, setShowNotification }) => {

    const handleKeyClick = (event) => {
      const letter = event.target.value;

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

  const row1 = "QWERTYUIOP".split('');
  const row2 = "ASDFGHJKL".split('');
  const row3 = "ZXCVBNM".split('');

  return (
    <div className="keyboard">
        <div className='keyboard-row'>
            {row1.map(key => {
                return <button key={key} value={key}
                            style={(correctLetters.includes(key) && {backgroundColor: "#3CB371"}) || (wrongLetters.includes(key) && {backgroundColor: "#CC474B"}) || {backgroundColor: "#202e3a"}} 
                            onClick={handleKeyClick}
                       >{key}</button>
            })} 
        </div> 
        <div className='keyboard-row'>
            {row2.map(key => {
                return <button key={key} value={key}
                    style={(correctLetters.includes(key) && {backgroundColor: "#3CB371"}) || (wrongLetters.includes(key) && {backgroundColor: "#CC474B"}) || {backgroundColor: "#202e3a"}} onClick={handleKeyClick}
                >{key}</button>
            })} 
        </div>     
        <div className='keyboard-row'>
            {row3.map(key => {
                return <button key={key} value={key}
                    style={(correctLetters.includes(key) && {backgroundColor: "#3CB371"}) || (wrongLetters.includes(key) && {backgroundColor: "#CC474B"}) || {backgroundColor: "#202e3a"}} onClick={handleKeyClick}
                >{key}</button>
            })} 
        </div>            
    </div>
  )
}

export default Keyboard