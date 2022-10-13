import FireEffect from "./FireEffect/FireEffect.js";

export default class AnimSystem {
    constructor(width, height, ctx) {
        this.width = width
        this.height = height
        this.ctx = ctx

        this.activeElement = null;
        this.animationStarted = false
        this.currentAnimationFrame = null

        this.effect = new FireEffect(width, height)
    }

    setActiveElement(element) {
        this.activeElement = element;
    }

    resetActiveElement() {
        this.activeElement = null;
    }

    start() {
        if (this.animationStarted) return;

        this.animationStarted = true
        this._animate()
    }

    stop() {
        if (!this.animationStarted) return;

        this.animationStarted = false
        cancelAnimationFrame(this.currentAnimationFrame)
        this.currentAnimationFrame = null
    }

    _animate() {
        this.ctx.clearRect(0, 0, this.width, this.height)

        this.effect.generateParticles(this.activeElement)
        this.effect.updateParticles()
        this.effect.drawParticles(this.ctx)

        this.currentAnimationFrame = requestAnimationFrame(this._animate.bind(this))
    }

    reset(newWidth, newHeight, newCtx) {
        //this.stop()

        this.width = newWidth;
        this.height = newHeight

        this.ctx = newCtx

        this.effect.reset(newWidth, newHeight)
    }
}