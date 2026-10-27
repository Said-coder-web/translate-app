import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {speak} from "../utils/speak";

// Components
import Languages from "./languages/Languages";
import Loading from "./loading/Loading";

// Types
import type {RootState} from "../redux/store";
type Props = {
  isTranslated?: boolean;
  inputText?: string;
  setInputText?: (text: string) => void;
  setLanguage: (code: string) => void;
  onTranslate?: () => void;
  language: string;
};

// images
import sound from "../assets/images/sound_max_fill.svg";
import copy from "../assets/images/Copy.svg";
import translate from "../assets/images/Sort_alfa.svg";

function DetectLanguage({
  isTranslated,
  inputText = "",
  setInputText,
  setLanguage,
  onTranslate,
  language,
}: Props) {
  const {loading, data, error} = useSelector(
    (state: RootState) => state.dataTranslate,
  );
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const translatedText = data?.responseData?.translatedText ?? "";
  const textToSpeak = isTranslated ? inputText : translatedText;

  const handleSpeak = () => speak(textToSpeak, language);

  const handleCopy = async () => {
    if (!textToSpeak.trim()) return;

    try {
      await navigator.clipboard.writeText(textToSpeak);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // يمنع النزول لسطر جديد
      onTranslate?.();
    }
  };

  return (
    <section
      data-translate={isTranslated}
      className="p-6 text-white flex-[50%] border border-(--border-box) rounded-2xl bg-(--bg-content) data-[translate=true]:bg-(--bg-translate)">
      <header className="pb-4 flex items-center gap-3 text-[14px] font-medium text-(--counter) border-b border-(--border-content)">
        {isTranslated && <h1 className="px-3.25 py-3">Detect Language</h1>}

        <Languages
          onSelectLanguage={setLanguage}
          defaultLanguage={isTranslated ? "en" : "fr"}
        />
      </header>

      <div className={`input_text pt-7.25 mb-3.25 ${!isTranslated && "h-52"}`}>
        {isTranslated ? (
          <>
            <textarea
              name="input-text"
              className="w-full h-34.5 pb-2.5 outline-none text-4 font-semibold text-(--white) resize-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-(--focus-language)"
              placeholder="Type or paste your text here..."
              maxLength={500}
              dir="auto"
              value={inputText}
              onChange={(e) => setInputText?.(e.target.value)}
              onKeyDown={handleKeyDown}></textarea>

            <div
              data-counter={
                inputText.length === 500
                  ? "limit"
                  : inputText.length > 480
                    ? "near-limit"
                    : inputText.length > 450
                      ? "warning"
                      : undefined
              }
              className="count text-end text-[12px] font-normal text-(--counter) transition duration-300 data-[counter=warning]:text-yellow-300 data-[counter=near-limit]:text-orange-400 data-[counter=limit]:text-red-500">
              {inputText.length}/500
            </div>
          </>
        ) : (
          <p
            data-loading={loading}
            className="w-full h-34.5 pb-2.5 text-4 font-semibold text-(--white) resize-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-(--focus-language) data-[loading=true]:flex data-[loading=true]:items-center data-[loading=true]:justify-center overflow-y-auto">
            {loading && <Loading />}
            {!loading && data && data?.responseData?.translatedText}
            {!loading && error && "No result!"}
          </p>
        )}
      </div>

      <div className="actions flex items-end justify-between">
        <div className="left flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="p-2.5 border border-(--border-content) rounded-xl transition duration-300 hover:bg-(--white)">
            <img src={sound} alt="image-sound" />
          </button>
          <button
            onClick={handleCopy}
            data-copied={copied || undefined}
            className="group p-2.5 border border-(--border-content) rounded-xl transition duration-300 hover:bg-(--white) relative">
            <img src={copy} alt="image-copy" />

            <span className="text-sm text-(--white) absolute -top-full left-1/2 -translate-x-1/2 bg-green-500 p-1.25 rounded-lg transition duration-300 scale-0 origin-bottom group-data-copied:scale-100">
              Copied!
            </span>
          </button>
        </div>

        {isTranslated && (
          <div className="right">
            <button
              onClick={onTranslate}
              className="px-7.5 py-4 flex items-center gap-3.75 bg-(--blue) border border-(--hover-blue) rounded-[10px] transition duration-300 hover:shadow-[0_0_20px_rgba(74,102,232,0.3)]">
              <img src={translate} alt="image-translate" />
              <span>Translate</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default DetectLanguage;
