var root = document.getElementById('root')
const step = 10
const __LEFT__ = '__LEFT__'
const __UP__ = '__TOP__'
const __RIGHT__ = '__RIGHT__'
const __DOWN__ = '__DOWN__'

var h = new tail(24, 24)
var snake = [h]
var apple = new apple(Math.round(Math.random() * 49), Math.round(Math.random() * 49))

function tail (x, y) {
  this.x = x
  this.y = y
  this.dir = ''

  this.tail = document.createElement('div')
  this.tail.className = 'tail'

  this.tail.style.left = `${this.x * step}px`
  this.tail.style.top = `${this.y * step}px`
  root.appendChild(this.tail)

  this.move = (dir) => {
    this.dir = dir || this.dir
    this.eat()

    var overSize = (value) => value > 49 || value < 0 ? this.death() : value

    switch (this.dir) {
      case __UP__:
        this.y = overSize(this.y - 1)
        break
      case __DOWN__:
        this.y = overSize(this.y + 1)
        break
      case __LEFT__:
        this.x = overSize(this.x - 1)
        break
      case __RIGHT__:
        this.x = overSize(this.x + 1)
      default:
    }

    this.tail.style.left = `${this.x * step}px`
    this.tail.style.top = `${this.y * step}px`
    return this
  }

  this.eat = () => {
    if (this.x === apple.x && this.y === apple.y) {
      apple.reborn()
      this.grow()
    }
  }

  this.grow = () => {
    let last = snake[snake.length - 1]
    let t

    switch (snake[snake.length - 1].dir) {
      case __DOWN__:
        t = new tail(last.x, last.y - 1)
      break
      case __UP__:
        t = new tail(last.x, last.y + 1)
      break
      case __RIGHT__:
        t = new tail(last.x - 1, last.y)
      break
      case __LEFT__:
        t = new tail(last.x + 1, last.y)
      break
      default:
    }

    t.dir = last.dir
    snake.push(t)

    console.log(`points ${snake.length}`)
  }

  this.follow = () => {
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].move().dir = snake[i - 1].dir
    }

    return this
  }

  this.self = () => {
    snake.map((t, i) => {
      if (i > 0 && this.x === t.x && this.y === t.y) {
        this.death()
      }
    })
  }

  this.death = () => {
    alert('game over!')
    location.reload()
  }
}

function apple (x, y) {
  this.x = x
  this.y = y

  this.apple = document.createElement('div')
  this.apple.className = 'apple'

  this.apple.style.left = `${x * step}px`
  this.apple.style.top = `${y * step}px`
  root.appendChild(this.apple)

  this.reborn = () => {
    this.x = Math.round(Math.random() * 49)
    this.y = Math.round(Math.random() * 49)
    this.apple.style.left = `${this.x * step}px`
    this.apple.style.top = `${this.y * step}px`
  }
}

var interval

window.addEventListener('keydown', (e) => {
  if (!h.dir || (h.dir === __RIGHT__ && e.key != 'a') ||
    (h.dir === __LEFT__ && e.key != 'd') ||
    (h.dir === __UP__ && e.key != 's') ||
    (h.dir === __DOWN__ && e.key != 'w')) {
    clearInterval(interval)
    interval = window.setInterval(() => {
      switch (e.key) {
        case 'w':
          h.move(__UP__).follow().self()
          break
        case 's':
          h.move(__DOWN__).follow().self()
          break
        case 'a':
          h.move(__LEFT__).follow().self()
          break
        case 'd':
          h.move(__RIGHT__).follow().self()
          break
        default:
      }
    }, 20)
  }
})
