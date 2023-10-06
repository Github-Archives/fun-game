const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

// see inherent canvas functions
console.log(ctx)
// set canvas width/height
const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

// variable to update to show animation
let x = 0

function animate() {
  // clear entire canvas before next render
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  // draw a simple rectangle
  ctx.fillRect(x, 50, 100, 100)
  // increase value to show rectangle moving horizontally
  x++
  // animates by calling current function infinately
  requestAnimationFrame(animate)
}
// start the animation sequence
animate()
