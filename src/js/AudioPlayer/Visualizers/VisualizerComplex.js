import Visualizer from "./Visualizer.js";

export default class VisualizerComplex extends Visualizer {
    constructor(ctx, width, height) {
        super(ctx, width, height);
        this.addI = 0

        this.ctx.lineCap = 'round'
        this.ctx.shadowOffsetX = 0
        this.ctx.shadowOffsetY = 0
        this.ctx.shadowBlur = 20
    }

    _drawVisualizer() {
        this.audioAnalyser.fftSize = 128;
        const barWidth = 15
        this.addI+=0.5;
        let x = 0
        for (let i = 0; i < this.dataArray.length; i++) {
            const barHeight = this.dataArray[i] * 0.75

            this.ctx.save()

            this.ctx.translate(this.width/2, this.height/2)
            this.ctx.rotate(i + Math.PI*4 / this.bufferLength + this.addI * 0.01);

            this.ctx.shadowColor = `hsl(${i*4 + this.addI}, 100%, 50%)`
            this.ctx.strokeStyle = `hsl(${i*4 + this.addI}, 100%, 50%)`
            this.ctx.fillStyle = `hsl(${i*4 + this.addI}, 100%, 50%)`

            this.ctx.lineWidth = Math.min(100 / barHeight, 20) + 5

            this.ctx.beginPath()
            this.ctx.moveTo(0, 0)
            this.ctx.lineTo(0, barHeight)
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.arc(0, barHeight * 1.2, barHeight/20, 0, Math.PI * 2)
            this.ctx.fill()


            this.ctx.beginPath()
            this.ctx.arc(0, barHeight * 1.8, barHeight/10, 0, Math.PI * 2)
            this.ctx.fill()

            x += barWidth;

            this.ctx.restore()
        }
    }
}