// "Абстрактный" класс, экземпляры которого создаваться не будут (только экземплеры классов-наследников)
export default class Visualizer {
    constructor(ctx, width, height) {
        this.currentAnimFrame = null;

        this.ctx = ctx
        this.width = width
        this.height = height
    }

    initAudioAnalyser(audioAnalyser) {
        this.audioAnalyser = audioAnalyser

        this.audioAnalyser.fftSize = 256;

        this.bufferLength = this.audioAnalyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength)
    }

    start() {
        if (!this.currentAnimFrame) this.animate()
    }

    stop() {
        cancelAnimationFrame(this.currentAnimFrame)
        this.currentAnimFrame = null;
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    // реализация метода в наследующих классах
    _drawVisualizer() {
        // ...
        console.log('shouldn\'t see this...')
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.audioAnalyser.getByteFrequencyData(this.dataArray); // copies current frequency data
        this._drawVisualizer()
        this.currentAnimFrame = requestAnimationFrame(this.animate.bind(this))
    }

    reset(newWidth, newHeight) {
        this.width = newWidth
        this.height = newHeight
    }
}