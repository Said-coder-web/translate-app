import {useState} from "react";

// images
import arrowDowen from "../../assets/images/Expand_down.svg";

// Styles
import "./languages.css";

// Types
type LanguagesProps = {
  defaultLanguage: string;
  onSelectLanguage: (code: string) => void;
};
type LanguageMenu = {name: string; code: string};

function Languages({defaultLanguage, onSelectLanguage}: LanguagesProps) {
  const [activeCode, setActiveCode] = useState<string>(defaultLanguage);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedInMenu, setSelectedInMenu] = useState<string>("Spanish");

  const languageMenu: LanguageMenu[] = [
    {name: "English", code: "en"},
    {name: "French", code: "fr"},
    {name: "Spanish", code: "es"},
    {name: "Arabic", code: "ar"},
    {name: "German", code: "de"},
    {name: "Italian", code: "it"},
    {name: "Japanese", code: "ja"},
    {name: "Korean", code: "ko"},
  ];

  const handleLanguageSelect = (code: string) => {
    setActiveCode(code);
    onSelectLanguage(code);
    setShowMenu(false);
  };
  const handleMenueSelect = (name: string, code: string): void => {
    handleLanguageSelect(code);
    setSelectedInMenu(name);
  };

  return (
    <div className="languages flex items-center gap-3 relative">
      {languageMenu.slice(0, 2).map((language, i) => (
        <button
          key={i}
          data-same={activeCode === language.code || undefined}
          className="px-3.25 py-3 hover:text-(--white) data-same:bg-(--focus-language) data-same:text-(--white) data-same:rounded-[10px] "
          onClick={() => handleLanguageSelect(language.code)}>
          {language.name}
        </button>
      ))}

      <button
        data-same={
          languageMenu
            .slice(2)
            .some((language) => activeCode === language.code) || undefined
        }
        className="px-3.25 py-3 flex items-center gap-2 data-same:bg-(--focus-language) data-same:text-(--white) data-same:rounded-[10px]"
        onClick={() => setShowMenu(!showMenu)}>
        <span>{selectedInMenu}</span>
        <img
          src={arrowDowen}
          alt="image-arrow-dowen"
          className={`transition duration-300 ${showMenu ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <ul
        data-show-menu={showMenu}
        className="data-[show-menu=false]:opacity-0 data-[show-menu=false]:-translate-y-5 data-[show-menu=false]:invisible transition duration-300 absolute top-12 right-0 max-h-50 bg-(--black) border border-(--border-box) rounded-lg w-[50%] overflow-y-auto shadow-xl z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-(--focus-language) data-showMenu:opacity-100 data-showMenu:translate-y-0 data-showMenu:visible">
        {languageMenu.slice(2).map((language, i) => (
          <li key={i}>
            <button
              onClick={() => handleMenueSelect(language.name, language.code)}
              className="px-3.25 py-3 w-full text-left hover:bg-(--focus-language)">
              {language.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Languages;
