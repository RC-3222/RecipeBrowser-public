import Visualizer from "./Visualizer.js";

export default class VisualizerSimple extends Visualizer {
    constructor(ctx, width, height) {
        super(ctx, width, height);
        this.addI = 0
    }

    _drawVisualizer() {
        this.addI += 0.01;

        const barWidth = this.width / this.bufferLength
        let x = 0
        for (let i = 0; i < this.bufferLength; i++) {
            const barHeight = this.dataArray[i] * 0.75
            this.ctx.fillStyle = `hsl(${i*0.6+this.addI}, 100%, 50%)`
            this.ctx.fillRect(x, this.height - barHeight, barWidth, barHeight)
            x += barWidth;
        }
    }
}