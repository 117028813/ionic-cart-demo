const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.static('./www'))

app.get('/goods', (req, res) => {
  // res.set({'Access-Control-Allow-Origin': '*'})
  fs.readFile('./goods.json', 'utf-8', (err, data) => {
    res.send(data)
  })
})

let cartGoods = []

app.post('/addToCart', (req, res) => {
  // res.set({'Access-Control-Allow-Origin': '*'})
  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', () => {
    body = JSON.parse(body)
    cartGoods = cartGoods.concat(body)
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

app.listen(3000, () => {
  console.log('http://localhost:3000')
})