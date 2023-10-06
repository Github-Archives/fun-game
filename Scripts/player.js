/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = (canvas.width = 800)
const CANVAS_HEIGHT = (canvas.height = 700)

let playerState = 'fall'

const dropdown = document.getElementById('animations')
console.log(dropdown)

dropdown.addEventListener('change', function (e) {
  playerState = e.target.value
})

class Player {
  constructor() {
    this.playerImage = new Image()
    this.playerImage.src = '/Assets/images/shadow_dog.png'

    this.spriteWidth = 575
    this.spriteHeight = 523
    this.gameFrame = 0
    this.staggerFrames = 5

    this.spriteAnimations = {}
    this.createAnimations()
  }

  createAnimations() {
    const animationStates = [
      {
        name: 'idle',
        frames: 7,
      },
      {
        name: 'jump',
        frames: 7,
      },
      {
        name: 'fall',
        frames: 7,
      },
      {
        name: 'run',
        frames: 9,
      },
      {
        name: 'dizzy',
        frames: 11,
      },
      {
        name: 'sit',
        frames: 5,
      },
      {
        name: 'roll',
        frames: 7,
      },
      {
        name: 'bite',
        frames: 7,
      },
      {
        name: 'ko',
        frames: 12,
      },
      {
        name: 'getHit',
        frames: 4,
      },
    ]

    animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      }
      for (let j = 0; j < state.frames; j++) {
        let positionX = j * this.spriteWidth
        let positionY = index * this.spriteHeight
        frames.loc.push({ x: positionX, y: positionY })
      }
      this.spriteAnimations[state.name] = frames
    })
  }

  animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    let position =
      Math.floor(this.gameFrame / this.staggerFrames) %
      this.spriteAnimations[playerState].loc.length
    let frameX = this.spriteWidth * position
    let frameY = this.spriteAnimations[playerState].loc[position].y

    ctx.drawImage(
      this.playerImage,
      frameX,
      frameY,
      this.spriteWidth,
      this.spriteHeight,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
    )

    this.gameFrame++
    requestAnimationFrame(this.animate.bind(this))
  }
}

const player = new Player()
player.animate()

export { Player }
