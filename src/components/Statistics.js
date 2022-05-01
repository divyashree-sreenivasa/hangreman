const Statistics = ({ setShowStats, showStats }) => {
  let gameStats = {};
  const haveGameStats = localStorage.getItem("gameStats") !== null
   
  gameStats = JSON.parse(localStorage.getItem("gameStats"));

  return (
    <div className="popup-container"
        style={showStats ? {display: "flex"} : {}}
    >
      <div className='wrapper'>
        <button className="close-btn" onClick={() => setShowStats(false)}>X</button>
        <div className="popup popup-statistics">
            <h3><b>STATISTICS</b></h3>
            <h3>Win %: {(!haveGameStats) ? 0 : gameStats.winCount === 0 ? 0 :(gameStats.winCount * 100/(gameStats.winCount + gameStats.loseCount))}</h3>
            {/* <div className="distribution-container">
             <h2>WIN GUESS DISTRIBUTION</h2> 
            

            </div> */}
        </div>
      </div>
    </div>
  )
}

export default Statistics