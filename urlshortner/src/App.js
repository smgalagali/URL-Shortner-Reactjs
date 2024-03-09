import './App.css';
import { useState } from 'react';
import InputShortner from './InputShortner';
import BackgroundAnimation from './BackgroundAnimation';
import LinkResult from './LinkResult';

function App() {
  const [inputValue , setInputValue]=useState("");

  return (
    <div className="container">
      <InputShortner  setInputValue={setInputValue}/>
      <BackgroundAnimation/>
      <LinkResult inputValue={inputValue}/>
    </div>
  );
}

export default App;
