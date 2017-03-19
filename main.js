var root = document.getElementById('root')
const step = 10
const __LEFT__ = '__LEFT__'
const __UP__ = '__TOP__'
const __RIGHT__ = '__RIGHT__'
const __DOWN__ = '__DOWN__'

var h = new tail(0, 0).show()
var snake = [h]
var apple = new apple(Math.round(Math.random() * 49), Math.round(Math.random() * 49)).show()

h.move(__RIGHT__)

function tail (x, y) {
  this.x = x
  this.y = y
  this.dir = ''

  this.tail = document.createElement('img')
  this.tail.className = 'tail'
  this.tail.src = './tail.svg'

  this.show = () => {
    this.tail.style.left = `${this.x * step}px`
    this.tail.style.top = `${this.y * step}px`
    root.appendChild(this.tail)
    return this
  }

  this.move = (dir) => {
    this.eat()

    this.dir = dir
    var d = [0, 0]
    switch (this.dir) {
      case __UP__:
        d = [0, -1]
        break
      case __DOWN__:
        d = [0, 1]
        break
      case __LEFT__:
        d = [-1, 0]
        break
      case __RIGHT__:
        d = [1, 0]
      default:
    }

    this.x = this.x + d[0]
    if (this.x === 50) {
      this.x = 49
    } else if (this.x === -1) {
      this.x = 0
    }

    this.y = this.y + d[1]
    if (this.y === 50) {
      this.y = 49
    } else if (this.y === -1) {
      this.y = 0
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
    return this
  }

  this.grow = () => {
    let last = snake[snake.length - 1]
    let d = [0, 0]

    switch (snake[snake.length - 1].dir) {
      case __DOWN__:
        d = [0, -1]
      break
      case __UP__:
        d = [0, 1]
      break
      case __RIGHT__:
        d = [-1, 0]
      break
      case __LEFT__:
        d = [1, 0]
      break
      default:
    }

    var t = new tail(last.x + d[0], last.y + d[1]).show()
    t.dir = last.dir
    snake.push(t)

    console.log(`points ${snake.length}`)

    return this
  }

  this.follow = () => {
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].move(snake[i].dir)
      snake[i].dir = snake[i - 1].dir
    }

    return this
  }

  this.dead = () => {
    snake.map((t, i) => {
      if (i > 0 && this.x === t.x && this.y === t.y) {
        alert('game over!')
        location.reload()
      }
    })
  }
}

function apple (x, y) {
  this.x = x
  this.y = y

  this.apple = document.createElement('img')
  this.apple.className = 'apple'
  this.apple.src = './apple.svg'

  this.show = () => {
    this.apple.style.left = `${this.x * step}px`
    this.apple.style.top = `${this.y * step}px`
    root.appendChild(this.apple)
    return this
  }

  this.reborn = () => {
    this.x = Math.round(Math.random() * 49)
    this.y = Math.round(Math.random() * 49)
    this.show()
  }
}

// window.addEventListener('click', () => {
//   h.grow()
// })

var interval

window.addEventListener('keydown', (e) => {

  if ((h.dir === __RIGHT__ && e.key != 'a') ||
    (h.dir === __LEFT__ && e.key != 'd') ||
    (h.dir === __UP__ && e.key != 's') ||
    (h.dir === __DOWN__ && e.key != 'w')) {
    clearInterval(interval)
    interval = window.setInterval(() => {
      switch (e.key) {
        case 'w':
        h.move(__UP__).follow().dead()
        break
        case 's':
        h.move(__DOWN__).follow().dead()
        break
        case 'a':
        h.move(__LEFT__).follow().dead()
        break
        case 'd':
        h.move(__RIGHT__).follow().dead()
        break
        default:
      }
    }, 50)
  }
})
