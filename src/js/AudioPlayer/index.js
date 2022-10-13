import myMusic from "./myMusic.js";
import VisualizerSimple from "./MyLib/VisualizerSimple.js";
import VisualizerComplex from "./MyLib/VisualizerComplex.js";

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');

const cont = document.querySelector('.canvas-cont')
const begCoords = cont.getBoundingClientRect()

canvas.height = begCoords.height;
canvas.width = begCoords.width;

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const [{inlineSize: width, blockSize: height}] = entry.borderBoxSize;

        canvas.height = height;
        canvas.width = width;

        // resetting visualizer
        audioVisualizer.reset(width, height)
    }
})

// creating visualizer
const audioVisualizer = new VisualizerComplex(ctx, canvas.width, canvas.height)

resizeObserver.observe(cont)

const audioCtx = new window.AudioContext()
audioCtx.suspend().catch(e=>console.error(e))

const myAudio = document.getElementById('audio1')

const fileSelector = document.getElementById('audio-upload')
fileSelector.addEventListener('change', function (ev) {
    myAudio.src = URL.createObjectURL(this.files[0])
})

myAudio.addEventListener('playing', function (ev) {
    //console.log('audio started playing')
    audioVisualizer.start()
    audioCtx.resume().catch(e=>console.error(e))
})
myAudio.addEventListener('ended', function (ev) {
    //console.log('audio ended')
    audioVisualizer.stop()
    audioCtx.suspend().catch(e=>console.error(e))
})
myAudio.addEventListener('pause', function (ev) {
    //console.log('audio paused')
    audioVisualizer.stop()
    audioCtx.suspend().catch(e=>console.error(e))
})

const audioSrc = audioCtx.createMediaElementSource(myAudio)


const analyser = audioCtx.createAnalyser() // for getting 'frequency and time' data
audioSrc.connect(analyser)
analyser.connect(audioCtx.destination)

// initialization of audio analyzer
audioVisualizer.initAudioAnalyser(analyser)


