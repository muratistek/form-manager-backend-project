import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ test: "server with json" })
})

const port = Number(process.env.PORT) || 8080

// In Docker, whenever you are attaching to a port in your server (express), always provide a second argument '0.0.0.0'
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`)
})