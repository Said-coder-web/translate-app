export const speak = (text: string, lang: string) => {
  if(!text.trim() || !("speechSynthesis" in window)) return

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = .7
  window.speechSynthesis.speak(utterance)
}