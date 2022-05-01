import {BiHelpCircle, BiBarChartAlt2} from 'react-icons/bi';

const Header = ({ setShowHelp, setShowStats }) => {
  return (
    <header>
        <BiHelpCircle size={30} onClick={() => setShowHelp(true)} 
            style={{cursor: "pointer"}}
        />
        
        <a href="/"><h1>hanGREman</h1></a>
        
        <BiBarChartAlt2 size={30} onClick={() => setShowStats(true)}
            style={{cursor: "pointer"}}
        />
        {/* <p>Find the hidden word - Enter a letter</p> */}
    </header>
  )
}

export default Header