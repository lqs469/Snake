var root = document.getElementById('root')
var step = 10

var h = new body(24, 24, 'snake')
var apple = new body(Math.round(Math.random() * 49), Math.round(Math.random() * 49), 'apple')
var snake = [h]

function body (x, y, type) {
  this.x = x
  this.y = y

  this.body = document.createElement('div')
  this.body.className = type === 'apple' ? 'apple' : 'body'

  this.body.style.top = `${this.x * step}px`
  this.body.style.left = `${this.y * step}px`

  root.appendChild(this.body)

  this.move = (x, y, eat) => {
    snake.map((s, i) => {
      if (i > 0 && x === s.x && y === s.y) {
        this.dead()
      }
    })

    if (x > 49 || x < 0 || y > 49 || y < 0) {
      this.dead()
    }

    eat && this.eat(x, y)
    this.x = x
    this.y = y
    this.body.style.top = `${this.x * step}px`
    this.body.style.left = `${this.y * step}px`
  }

  this.eat = (x, y) => {
    if (x === apple.x && y === apple.y) {
      apple.reborn()
      this.grow()
    } else {
      this.follow()
    }
  }

  this.follow = () => {
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].move(snake[i - 1].x, snake[i - 1].y, false)
    }
  }

  this.grow = () => {
    snake.splice(1, 0, new body(this.x, this.y, 'snake'))
  }

  this.reborn = () => {
    this.x = Math.round(Math.random() * 49)
    this.y = Math.round(Math.random() * 49)

    this.body.style.top = `${this.x * step}px`
    this.body.style.left = `${this.y * step}px`
  }

  this.dead = () => {
    location.reload()
  }
}

var interval
window.addEventListener('keydown', (e) => {
  clearInterval(interval)
  interval = window.setInterval(() => {
    switch (e.key) {
      case 'a':
        h.move(h.x, h.y - 1, true)
        break
      case 'd':
        h.move(h.x, h.y + 1, true)
        break
      case 'w':
        h.move(h.x - 1, h.y, true)
        break
      case 's':
        h.move(h.x + 1, h.y, true)
        break
    }
  }, 50)
})
