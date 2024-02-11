const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000;


const chef = require("./data/chef.json");
const food = require("./data/items.json");

app.use(cors())

app.get('/chef', (req, res) => {
    res.send(chef)
})
app.get('/chef_recipes/:chefId', (req, res) => {
    const selectedChef = chef.find(c => c.id == req.params.chefId)
    res.send(selectedChef)
})
app.get('/recipies/:chefId', (req, res) => {
    const selectedRecipes = food.filter(c => c.chef_id == req.params.chefId)
    res.send(selectedRecipes)
})
app.get('/recipies', (req, res) => {
    res.send(food)
})
app.get('/featured_recipies', (req, res) => {
    const generateRandomNumbersArray = (min, max, count) => Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min)
    const randomNumbersArray = generateRandomNumbersArray(0, 76, 6);

    const featuredRecipies = food.filter(f => randomNumbersArray.includes(f.id))

    res.send(featuredRecipies)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})