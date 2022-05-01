const Help = ({ setShowHelp, showHelp }) => {
  return (
    <div className="popup-container"
      style={showHelp ? {display: "flex"} : {}}
    >
      <div className='wrapper'>
        <button className="close-btn" onClick={() => setShowHelp(false)}>X</button>
        <div className="popup popup-help">
            <p>HanGREman is just hangman with a twist. We use words relevant to GRE vocabulary test preparation.</p>
            <p> Thanks to <a href="https://s3.amazonaws.com/magoosh.resources/magoosh-gre-1000-words_oct01.pdf">Magoosh</a> for making the 1000 words resource available, which has been used here.</p>
            <div className="how-to-play-container">
              <h3><b>How to play:</b></h3>
              <p>Just type in or click on a letter you think is present in the word.</p>
              <p>Correct letters guessed are filled in the word, and marked green. Wrong letters guessed are marked red.</p> 
              <p> You die when you guess six wrong letters. On the 5th wrong guess, you get a hint: the word definition.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Help