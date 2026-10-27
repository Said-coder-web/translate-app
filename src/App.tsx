import {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchTranslate} from "./redux/translateSlice";

// Components
import DetectLanguage from "./components/DetectLanguage";

// Types
import type {AppDispatch} from "./redux/store";

// images
import logo from "./assets/images/logo.svg";

import "./App.css";

function App() {
  const [inputText, setInputText] = useState<string>("Hello, how are you?");
  const [fromLanguage, setFromLanguage] = useState<string>("en");
  const [toLanguage, setToLanguage] = useState<string>("fr");
  const dispatch = useDispatch<AppDispatch>();

  const handleTranslate = () => {
    if (inputText.trim() === "") return;
    dispatch(
      fetchTranslate({text: inputText, from: fromLanguage, to: toLanguage}),
    );
  };

  return (
    <main className="pt-25">
      <div className="container">
        <div className="logo">
          <img
            src={logo}
            alt="logo"
            className="mx-auto h-6.75 w-31.75 object-cover"
          />
        </div>

        <div className="content mt-18.25 flex gap-3 max-[1024px]:flex-col">
          <DetectLanguage
            isTranslated
            inputText={inputText}
            setInputText={setInputText}
            setLanguage={setFromLanguage}
            onTranslate={handleTranslate}
            language={fromLanguage}
          />

          <DetectLanguage setLanguage={setToLanguage} language={toLanguage}/>
        </div>
      </div>
    </main>
  );
}

export default App;
