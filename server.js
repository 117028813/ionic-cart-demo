const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.static('./www'))

const goods = JSON.parse(fs.readFileSync('./goods.json', 'utf-8'))

app.get('/goods', (req, res) => {
  // res.set({'Access-Control-Allow-Origin': '*'})
  fs.readFile('./goods.json', 'utf-8', (err, data) => {
    res.send(data)
  })
})

app.post('/goods', (req, res) => {
  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', () => {
    body = JSON.parse(body)
    if (body.page) {
      let page = Number.parseInt(body.page)
      let resData = goods.filter((val, ind, arr) => {
        return ind >= (5 * (page - 1)) && ind < (5 * (page - 1)) + 5
      })
      res.send(resData)
    }
  })
})

let cartGoods = []

app.post('/addToCart', (req, res) => {
  // res.set({'Access-Control-Allow-Origin': '*'})
  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', () => {
    body = JSON.parse(body)
    // cartGoods = cartGoods.concat(body)
    cartGoods = [...cartGoods, body]
    // 如果添加到购物车的商品在当前购物车内已有了，
    // 就只把新添加的数量加到购物车内已有商品的数量上
    ;(function foo() {
      for (let i = 0; i < cartGoods.length; i++) {
        for (let j = i + 1; j < cartGoods.length; j++) {
          if (cartGoods[i].id === cartGoods[j].id) {
            cartGoods[i].count += cartGoods[j].count
            cartGoods.splice(j, 1)
            foo()
          }
        }
      }
    })()
    res.send({
      result: 1,
      message: '成功添加到购物车'
    })
  })
})

app.get('/cartGoods', (req, res) => {
  // res.set({
  //   'Access-Control-Allow-Origin': '*'
  // })
  res.send(cartGoods)
})

app.post('/deleteGoods', (req, res) => {
  // res.set({'Access-Control-Allow-Origin': '*'})
  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', () => {
    body = JSON.parse(body)
    cartGoods = cartGoods.filter((val, ind, arr) => val.id !== body.id)
    res.send(cartGoods)
  })
})

app.post('/login', (req, res) => {
  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', () => {
    body = JSON.parse(body)
    const {name, password} = body
    if (name === 'admin' && password === '123456') {
      res.send({
        result: 1,
        message: '登录成功'
      })
    } else {
      res.send({
        result: 0,
        message: '用户名或密码错误'
      })
    }
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})