import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] })

export const generateID = () => nanoid(16)

const seedDB = async () => {
  if ((await db.formEntry.count()) === 0) {
    // Make sure to use "await" below to wait for the prisma promise to complete the fetch
    await db.formEntry.createMany({
      data: [
        {
          id: generateID(),
          publishedAt: new Date(),
          formData: {
            name: "Murat Istek",
            email: 'murat@mail.com',
            github: 'muratdev'
          }
        },
      ]
    })
  }
}

seedDB();

export default db;