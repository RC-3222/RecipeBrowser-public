export default class ParticleFire {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size

        this.weight = Math.random() * 1.5 + 1.5
        // flame goes to the left
        this.directionX = Math.random() * 2
        this.color = {
            hue: 33 + (Math.random() * 15 - 5),
            saturation: 90,
            lightness: 53,
            alpha: 1
        }
    }

    update() {
        this.y -= this.weight
        this.x += this.directionX
        if (this.size >= 0.3) this.size -= 0.15;
        this.color.saturation -= 0.08;
        this.color.lightness -= 0.03;
        this.color.alpha -= 0.01;
    }

    draw(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = `hsla(${this.color.hue},${this.color.saturation}%,${this.color.lightness}%,${this.color.alpha})`
        context.fill();
    }
}