import { PrismaClient } from '@prisma/client'
import express from 'express'
import morgan from 'morgan'
import { nanoid } from 'nanoid'

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] })
const generateID = () => nanoid(16)

const seedDB = async () => {
  if ((await db.formEntry.count()) === 0) {
    // Make sure to use "await" below to wait for the prisma promise to complete the fetch
    await db.formEntry.createMany({
      data: [{
        id: generateID(),
        slug: "form-manager",
        title: "Form Manager Backend Project",
        publishedAt: new Date()
      },
      {
        id: generateID(),
        slug: "test-post 1",
        title: "Test Post 1",
      }
      ]
    })
  }
}

seedDB();

const app = express()
app.use(morgan('dev'))

app.get('/', async (req, res) => {
  const formEntries = await db.formEntry.findMany();
  res.json(formEntries)
})

const port = Number(process.env.PORT) || 8080

// In Docker, whenever you are attaching to a port in your server (express), always provide a second argument '0.0.0.0'
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`)
})