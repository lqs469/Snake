var root = document.getElementById('root')

const step = 10
const __UP__ = '__UP__'
const __DOWN__ = '__DOWN__'
const __LEFT__ = '__LEFT__'
const __RIGHT__ = '__RIGHT__'

var h = new tail(24, 24)
var snake = [h]
var level = 1

function tail (x, y) {
  this.x = x
  this.y = y
  this.dir

  this.body = document.createElement('div')
  this.body.className = 'body'
  this.body.style.left = `${x * 10}px`
  this.body.style.top = `${y * 10}px`
  root.appendChild(this.body)

  this.move = (dir) => {
    this.dir = dir
    this.eat()

    switch (dir) {
      case __UP__:
        this.y--
        break
      case __DOWN__:
        this.y++
        break
      case __LEFT__:
        this.x--
        break
      case __RIGHT__:
        this.x++
        break
      default:
    }
    this.body.style.left = `${this.x * 10}px`
    this.body.style.top = `${this.y * 10}px`

    if (this.x > 49 || this.x < 0 || this.y > 49 || this.y < 0) {
      this.dead()
    }

    return this
  }

  this.follow = () => {
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].move(snake[i].dir)
      snake[i].dir = snake[i - 1].dir
    }
  }

  this.eat = () => {
    snake.map((b, i) => {
      if (i > 0 && b.x === h.x && b.y === h.y) {
        this.dead()
      }
    })

    if (this.x === apple.x && this.y == apple.y) {
      this.grow()
      apple.reborn()
      level++
    }
  }

  this.grow = () => {
    let t
    let last = snake[snake.length - 1]

    switch (last.dir) {
      case __UP__:
        t = new tail(last.x, last.y + 1)
        break
      case __DOWN__:
        t = new tail(last.x, last.y - 1)
        break
      case __LEFT__:
        t = new tail(last.x + 1, last.y)
        break
      case __RIGHT__:
        t = new tail(last.x - 1, last.y)
        break
      default:
    }

    t.dir = last.dir
    snake.push(t)
  }

  this.dead = () => {
    alert(`game over!!\npoints: ${snake.length - 1}`)
    location.reload()
  }
}

var apple = new apple(Math.round(Math.random() * 49), Math.round(Math.random() * 49))

function apple (x, y) {
  this.x = x
  this.y = y
  this.dir

  this.body = document.createElement('div')
  this.body.className = 'apple'
  this.body.style.left = `${x * 10}px`
  this.body.style.top = `${y * 10}px`
  root.appendChild(this.body)

  this.reborn = () => {
    this.x = Math.round(Math.random() * 49)
    this.y = Math.round(Math.random() * 49)
    this.body.style.left = `${this.x * 10}px`
    this.body.style.top = `${this.y * 10}px`
  }
}

var interval

window.addEventListener('keydown', (e) => {
  clearInterval(interval)
  interval = window.setInterval(() => {
    switch (e.key) {
      case 'w':
        h.dir !== __DOWN__ ? h.move(__UP__).follow() : h.move(__DOWN__).follow()
        break
      case 's':
        h.dir !== __UP__ ? h.move(__DOWN__).follow() : h.move(__UP__).follow()
        break
      case 'a':
        h.dir !== __RIGHT__ ? h.move(__LEFT__).follow() : h.move(__RIGHT__).follow()
        break
      case 'd':
          h.dir !== __LEFT__ ? h.move(__RIGHT__).follow() : h.move(__LEFT__).follow()
        break
      default:
    }
  }, 100 / level)
})
