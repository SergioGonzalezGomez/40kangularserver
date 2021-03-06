const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const LegionsRoutes = require('./src/api/legions/legions.routes')
const BattlesRoutes = require('./src/api/battles/battles.routes')
const documentation = require('./src/utils/documentation/index.json')
const { connectDb } = require('./src/utils/database/db')
connectDb()
const PORT = process.env.PORT || 8000

const app = express()



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200', "https://40kangular.vercel.app", "https://40kangular.vercel.app/legions"],
    credentials: true
}))

app.use(express.json({
    limit: '5mb'
}))

app.use(express.urlencoded({ limit: '5mb', extended: true }))


app.use('/legions', LegionsRoutes)
app.use('/battles', BattlesRoutes)
app.use('/', (req, res, next) => {
    return res.json(documentation)
})

app.use('*', (req, res, next) => {
    return next(setError(404, 'Route not found'))
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error')
})

app.disable('x-powered-by')

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})