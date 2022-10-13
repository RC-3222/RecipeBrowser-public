import VisualizerSimple from "./Visualizers/VisualizerSimple.js";
import VisualizerComplex from "./Visualizers/VisualizerComplex.js";

export default class AudioPlayer {
    constructor() {
        //this.parentElem = null;
        //this._generate();
        //this._takeControl();
    }

    _generate() {
        // -------------- формирование HTML-части --------------
        this.audioPlayer = document.createElement('div')
        this.audioPlayer.className = 'audio-player'

        const fileInputCont = document.createElement('div')
        fileInputCont.className = 'audio-audio-player__file-chooser-container'

        this.fileInput = document.createElement('input')
        this.fileInput.className = 'audio-player__file-chooser'
        this.fileInput.id = "audio-upload"
        this.fileInput.setAttribute("type","file")
        this.fileInput.setAttribute("accept","audio/*")

        const fileInputLabel = document.createElement('label')
        fileInputLabel.className = 'audio-player__file-chooser-label'
        fileInputLabel.innerText = 'Choose an audio file here'
        fileInputLabel.setAttribute("for","audio-upload")

        fileInputCont.appendChild(this.fileInput)
        fileInputCont.appendChild(fileInputLabel)

        this.audio = document.createElement('audio')
        this.audio.className = 'audio-player__player'
        this.audio.controls = true

        this.canvas = document.createElement('canvas')
        this.canvas.className = 'audio-player__visualizer__canvas'

        this.canvasCont = document.createElement('div')
        this.canvasCont.className = 'audio-player__visualizer'
        this.canvasCont.appendChild(this.canvas)

        this.audioPlayer.appendChild(fileInputCont)
        this.audioPlayer.appendChild(this.audio)
        this.audioPlayer.appendChild(this.canvasCont)
        // -----------------------------------------------------

        this.canvWatcher = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const [{inlineSize: width, blockSize: height}] = entry.borderBoxSize;

                this.canvas.height = height;
                this.canvas.width = width;

                this.audioVisualizer?.reset(width, height)
            }
        })

        this.audioCtx = new window.AudioContext()
        const audioSrc = this.audioCtx.createMediaElementSource(this.audio)

        this.analyser = this.audioCtx.createAnalyser()
        audioSrc.connect(this.analyser)
        this.analyser.connect(this.audioCtx.destination)
    }

    _takeControl() {
        this.audio.addEventListener('playing', (ev) => {
            this.audioVisualizer?.start()
            this.audioCtx.resume().catch(e=>console.error(e))
        })
        this.audio.addEventListener('ended', (ev) => {
            this.audioVisualizer?.stop()
            this.audioCtx.suspend().catch(e=>console.error(e))
        })
        this.audio.addEventListener('pause', (ev) => {
            this.audioVisualizer?.stop()
            this.audioCtx.suspend().catch(e=>console.error(e))
        })

        this.fileInput.addEventListener('change', (ev) => {
            this.audio.src = URL.createObjectURL(ev.target.files[0])
        })

    }

    show(parentElem) {
        this.parentElem = parentElem
        this.parentElem.appendChild(this.audioPlayer)

        const canvBox = this.canvasCont.getBoundingClientRect()
        this.canvas.width = canvBox.width
        this.canvas.height = canvBox.height

        const VisualizerType = Math.random() >= 0.5 ? VisualizerComplex : VisualizerSimple;

        this.audioVisualizer = new VisualizerType(this.canvas.getContext('2d'), this.canvas.width,this.canvas.height);
        this.canvWatcher.observe(this.canvasCont)

        this.audioVisualizer.initAudioAnalyser(this.analyser)
    }


    reset(reInit = false) {
        this.audioVisualizer?.stop()
        this.audioCtx?.suspend().catch((e)=>console.error(e))
        this.audioVisualizer = null;

        this.canvWatcher?.unobserve(this.canvasCont);
        if (this.audioPlayer?.parentElement) this.parentElem?.removeChild(this.audioPlayer);
        this.parentElem = null;

        if (reInit) {
            this._generate();
            this._takeControl();
        }
    }
}