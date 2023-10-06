/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = (canvas.width = 800)
const CANVAS_HEIGHT = (canvas.height = 700)

let gameSpeed = 10

export class Background {
  constructor() {
    this.backgroundLayers = []
    this.createLayers()
  }

  createLayers() {
    const layers = [
      {
        imageSrc: 'Assets/images/backgroundLayers/layer-1.png',
        speedModifier: 0.2,
      },
      {
        imageSrc: 'Assets/images/backgroundLayers/layer-2.png',
        speedModifier: 0.4,
      },
      {
        imageSrc: 'Assets/images/backgroundLayers/layer-3.png',
        speedModifier: 0.6,
      },
      {
        imageSrc: 'Assets/images/backgroundLayers/layer-4.png',
        speedModifier: 0.8,
      },
      {
        imageSrc: 'Assets/images/backgroundLayers/layer-5.png',
        speedModifier: 1,
      },
    ]

    layers.forEach((layerInfo) => {
      const layer = new Layer(layerInfo.imageSrc, layerInfo.speedModifier)
      this.backgroundLayers.push(layer)
    })
  }

  update() {
    this.backgroundLayers.forEach((layer) => layer.update())
  }

  draw() {
    this.backgroundLayers.forEach((layer) => layer.draw())
  }
}

class Layer {
  constructor(imageSrc, speedModifier) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 700
    this.image = new Image()
    this.image.src = imageSrc
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
  }

  update() {
    this.speed = gameSpeed * this.speedModifier
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x -= this.speed
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height,
    )
  }
}

// Initialization
window.addEventListener('load', function () {
  const slider = document.getElementById('slider')
  slider.value = gameSpeed
  const showGameSpeed = document.getElementById('showGameSpeed')
  showGameSpeed.innerHTML = gameSpeed

  slider.addEventListener('change', function (eventObject) {
    gameSpeed = eventObject.target.value
    showGameSpeed.innerHTML = eventObject.target.value
  })

  const background = new Background()

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    background.update()
    background.draw()
    requestAnimationFrame(animate)
  }

  animate()
})
