import throng from "throng"
import Queue from "bull"
import { config, REDIS_URL } from "./config"

import { UserPortfolioQueueData } from "./model"
import { buildUserWebPage } from "./buildWebPage"

// Connect to a local redis intance locally, and the Heroku-provided URL in production

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY ?? 2

// The maxium number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 3 //arbirtary number that I set...shourdn't be too high as CPU intensive

function start() {
  // Connect to the named work queue
  let userPortfolioQueue = new Queue(
    config.buildUserPortfolioQueueName,
    REDIS_URL
  )
  userPortfolioQueue.process(maxJobsPerWorker, async (job) => {
    // This is an example job that just slowly reports on progress
    // while doing no work. Replace this with your own job logic.
    const jobData: UserPortfolioQueueData = job.data
    console.log("job started with id", job.id)
    // await new Promise((resolve) => setTimeout(resolve, 10000))

    await buildUserWebPage(jobData.linkedinUid, jobData.linkedinVanityName)

    //TODO: - we can implement some sort of loading bar dtf
    // let progress = 0
    // while (progress < 20) {
    //   //   await sleep(50)
    //   await new Promise((resolve) => setTimeout(resolve, 1000))
    //   console.log("progress", progress)
    //   progress += 1
    //   job.progress(progress)
    // }

    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    return { value: "Some return value" }
  })
}
// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start })
