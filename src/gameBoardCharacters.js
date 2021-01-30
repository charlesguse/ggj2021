export const gameCharacters = (scene) => {
  return scene.add.circle(randomX(), randomY(), 10, randomColor())
}

function randomX() {
  return Math.floor(Math.random() * window.innerWidth)
}

function randomY() {
  return Math.floor(Math.random() * window.innerHeight)
}

function randomColor() {
  let color = '0x'

  for (let i = 0; i < 6; i++) {
    const random = Math.random()
    const bit = (random * 16) | 0
    color += (bit).toString(16)
  }

  return color
}