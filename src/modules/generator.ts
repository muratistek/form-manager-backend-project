import { faker } from "@faker-js/faker";
import db, { generateID } from "./db";

const entry = async () => {
  return await db.formEntry.create({
    data: {
      id: generateID(),
      publishedAt: new Date(),
      formData: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        github: faker.internet.userName(),
        comments: faker.lorem.words(20)
      }
    }
  })
}

// const entry = async () => {
//   return await db.formEntry.create({
//     data: {
//       id: generateID(),
//       publishedAt: new Date(),
//       formData: {
//         name: "Murat Istek",
//         email: "muratistekdev@gmail.com",
//         github: "https://github.com/muratistek",
//         comments: "Form manager app created with GraphQL, Apollo, Redis, Prisma, PostreSQL, Docker, React, Material UI"
//       }
//     }
//   })
// }

const clearForm = async () => {
  const recordsToDelete = await db.formEntry.findMany({
    where: { NOT: { id: "5kxVQnNGsE4_kW3H" } }  // skips the first record
  })

  const deletePromises = recordsToDelete.map((record) =>
    db.formEntry.delete({
      where: { id: record.id }
    })
  )

  await Promise.all(deletePromises)
}

const ModuleGenerator = {
  entry, clearForm
};

export default ModuleGenerator;