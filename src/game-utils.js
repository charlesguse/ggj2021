import EPT from './utils'

export function splashRandomX() {
  return randomIntegarInRange(75, EPT.world.width - 25)
}

export function splashRandomY() {
  return randomIntegarInRange(150, EPT.world.height - 125)
}

export function randomColor() {
  let color = '0x'

  for (let i = 0; i < 6; i++) {
    const random = Math.random()
    const bit = (random * 16) | 0
    color += (bit).toString(16)
  }

  return color
}

export function randomIntegarInRange(min, max) {  
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
} 