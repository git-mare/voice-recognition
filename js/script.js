// text to speech
var msg = new SpeechSynthesisUtterance()
var voices = window.speechSynthesis.getVoices()
msg.voice = voices[10]
msg.volume = 1 // 0 até 1
msg.rate = 2 // 0.1 até 10
msg.pitch = 2 // 0 até 2
msg.text = ""
msg.lang = 'pt-br'

// speech to text
var speech = true
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.interimResults = false
recognition.lang = 'pt-BR'
const words = document.querySelector('.dict')

// receive speech
words.appendChild(voice)
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
    document.getElementById("voice").innerHTML = transcript


    if (transcript == 'janela' || transcript == 'Janela.') {
        msg.text = 'Abrindo nova janela'
        speechSynthesis.speak(msg)
        recognition.abort()
        let currentWindow = window.open('https://www.google.com')
        document.getElementById("command").innerHTML = '> Nova janela aberta'
        return currentWindow

    }

    const sepIndex = transcript.indexOf(" ");
    const command = transcript.substr(0, sepIndex); // pesquisar
    const searchFor = transcript.substr(sepIndex + 1); // palavra para pesquisar
    if (command == `pesquisar` || command == `Pesquisar`) {
        msg.text = 'Pesquisando'
        speechSynthesis.speak(msg)

        document.getElementById("command").innerHTML = `> Pesquisa: ${searchFor}`
        return window.open(`https://www.google.com/search?q=${searchFor}`)
    }

    switch (transcript) {
        case 'Abrir Twitter':
            recognition.abort()
            msg.text = 'Abrindo Twitter'
            speechSynthesis.speak(msg)

            document.getElementById("command").innerHTML = '> Twitter iniciado'
            window.open('https://twitter.com/')
            break

        case 'Abrir Facebook':
            recognition.abort()
            msg.text = 'Abrindo Facebook'
            speechSynthesis.speak(msg)

            document.getElementById("command").innerHTML = '> Facebook iniciado'
            window.open('https://facebook.com/')
            break

        case 'Abrir Instagram':
            recognition.abort()
            msg.text = 'Abrindo Instagram'
            speechSynthesis.speak(msg)

            document.getElementById("command").innerHTML = '> Instagram iniciado'
            window.open('https://instagram.com/')
            break

        default:
            return
    }

})
if (speech == true) {
    recognition.start()
    recognition.addEventListener('end', recognition.start)
}