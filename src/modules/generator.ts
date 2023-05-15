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

const ModuleGenerator = {
  entry
};

export default ModuleGenerator;