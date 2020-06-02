import express from "express"
import dotenv from "dotenv"
import path from "path"
import get from "axios"
import post from "axios"
import cors from "cors"
import Queue from "bull"
import { config, REDIS_URL } from "./config"
import { UserPortfolioQueueData } from "./model"

let userPortfolioQueue = new Queue(
  config.buildUserPortfolioQueueName,
  REDIS_URL
)

dotenv.config()
const app = express()
const port = process.env.PORT || 1337

app.listen(port, () => console.log(`Listening on port: ${port}`))
app.use(cors({ origin: "*" }))

app.get("/build_user_portfolio", async (req, res) => {
  const queueData: UserPortfolioQueueData = {
    linkedinUid: "tempUid",
    linkedinVanityName: "tempvanityname",
  }
  let job = await userPortfolioQueue.add(queueData)
  console.log("new job build_user_portfolio", job.id)
  res.json({ jobId: job.id })
})

userPortfolioQueue.on("global:completed", (jobId, result) => {
  console.log(`Job ${jobId} completed with result ${result}`)
})

// Allows the client to query the state of a background job
app.get("/job/:id", async (req, res) => {
  let id = req.params.id
  let job = await userPortfolioQueue.getJob(id)

  if (job === null) {
    res.status(404).end()
  } else {
    let state = await job.getState()
    let progress = job.progress()
    let reason = job.failedReason
    res.json({ id, state, progress, reason })
  }
})

app.get("/get_access_token", async (req, res) => {
  try {
    const { code, redirect_uri } = req.query

    if (!code || !redirect_uri) {
      throw { error: "invalid_request" }
    }
    try {
      const resp = await post(`https://www.linkedin.com/oauth/v2/accessToken`, {
        headers: {
          "content-type": `application/x-www-form-urlencoded`,
        },
        params: {
          grant_type: `authorization_code`,
          code: code,
          redirect_uri: redirect_uri,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        },
      })
      res.send(resp.data)
    } catch (error) {
      throw error.response.data
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get("/get_liteprofile", async (req, res) => {
  try {
    const { access_token } = req.query
    if (!access_token) {
      throw { error: "invalid_request, no access_token" }
    }
    try {
      const resp = await get(`https://api.linkedin.com/v2/me`, {
        params: {
          projection: `(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))`,
          oauth2_access_token: access_token,
        },
      })
      res.send(resp.data)
    } catch (error) {
      /// we throw this error to let the user reauthenticate to renew the token,
      /// it is likely that
      throw { error: "reauthenticate" }
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

//send built production website to client
const reactBuildFolder = path.join(__dirname, "..", "client", "build")
app.use(express.static(reactBuildFolder))
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: reactBuildFolder })
})
export default app
