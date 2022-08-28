import './App.css';
import { Login } from './login';
import {Route,Routes} from "react-router-dom"
import { Transcation } from './transcation';
import { Landing } from './landing';
import { Transcationhistory } from './transcationhistory';
import { Customerset } from './customerset';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} ></Route>
        <Route path="/transcation" element={<Transcation/>} />
        <Route path="/landing" element={<Landing/> }/>
        <Route path="/transcationhistory" element={<Transcationhistory/>}/>
        <Route path="/customerset" element={<Customerset/>}/>
      </Routes>
    </div>
  );
}

export default App;
