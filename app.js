const express = require('express')
const resturantList = require('./resturant.json')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')

//express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//setting static files
app.use(express.static('public'))
//route seeting 
app.get('/', (req, res) => {
  res.render('index', { movies: moviesList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = moviesList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies, keyword })
})

app.get('/movies/:movie_id', (req, res) => {
  res.render('show', { movie: moviesList.results[Number(req.params.movie_id) - 1] })
})

//start and listen the Express sereve
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})

//static files