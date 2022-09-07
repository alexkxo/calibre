const express = require('express')
const app = express()
const port = 3000

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.get('/about', (req, res) => {
    res.render('pages/about')
  })
  app.get('/inscription', (req, res) => {
    res.render('pages/inscription')
  })
  app.post('/inscription', (req, res) => {
    //les donnes a stocker dans la bd
    console.log(req.body.nom);
    res.end()
  
    })

app.listen(port, () => {
  console.log(`Server's on localhost:${port}`)
})