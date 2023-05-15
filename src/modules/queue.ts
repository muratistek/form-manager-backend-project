import { Queue, Worker } from "bullmq";
import ModuleGenerator from "./generator";

const QUEUE_NAME = 'default';

if (!process.env.REDIS_HOST) {
  console.warn('REDIS_HOST is not initialized')
}

const connection = {
  host: process.env.REDIS_HOST
}

export const queue = new Queue(QUEUE_NAME, { connection });

const worker = new Worker(QUEUE_NAME, async (job) => {
  if (job.name === 'generateEntries') {
    const entry = await ModuleGenerator.entry()
    console.log(entry)
  }
  if (job.name === 'deleteFormData') {
    await ModuleGenerator.clearForm()
  }

}, { connection });


export const enqueue = async (job: string, data?: any) => {
  await queue.add(job, data)
}
