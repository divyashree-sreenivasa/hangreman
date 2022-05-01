import {BiHelpCircle, BiBarChartAlt2} from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <BiHelpCircle size={30}/>
        
        <a href="/"><h1>hanGREman</h1></a>
        
        <BiBarChartAlt2 size={30}/>
        {/* <p>Find the hidden word - Enter a letter</p> */}
    </header>
  )
}

export default Header