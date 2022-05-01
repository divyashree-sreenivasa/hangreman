const Hint = ({selectedWordObj}) => {
  return (
    <div className="hint-container">
        <p>Last try❗️ <b style={{color: "green"}}>💡 Hint: </b> Here's the word definition - "{selectedWordObj.definition}"</p>
    </div>
    
  )
}

export default Hint