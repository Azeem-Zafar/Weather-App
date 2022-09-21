const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('../utilty/geocode')
const forecast = require('../utilty/forecast.js')
const req = require('request')

const port = process.env.PORT || 3000
// console.log(__dirname)
// console.log(__filename)
const Partial = path.join(__dirname, '../partials')

hbs.registerPartials(Partial)


const appData = path.join(__dirname, '../public')

app.use(express.static(appData))
app.set('view engine', 'hbs')



app.get('/', (req, res) => {
    res.render("index", {
        title: "MyApp",
        name: "Azeem Zafar"
    })
})







app.get('/weather', (req, res) => {
    // res.render("weather", {
    //     title: "Weather Page",
    //     name: "Newly created"
    // })
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})
app.get('*', (req, res) => {
    res.render("404", {
        title: "Error Page",
        name: "Occured"
    })
    res.send("404 Page Not Found")
})


app.listen(port, () => {
    console.log("Server started correctly")
})

