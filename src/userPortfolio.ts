import fs from "fs-extra"
import path from "path"
import { ncp } from "ncp"
import cryptoRandomString from "crypto-random-string"
import { exec } from "child_process"
import appRoot from "app-root-path"

export const USER_PORTFOLIO_BUILDS = path.join(
  appRoot.path,
  "/tmp/userPortfolioBuilds"
)

export async function buildUserPortfolioStaticFiles(dirName: string) {
  fs.rmdirSync(USER_PORTFOLIO_BUILDS, { recursive: true }) //TODO: - this is TEMP

  const buildPath = path.join(USER_PORTFOLIO_BUILDS, dirName)
  await fs.ensureDir(buildPath) //creates dir if not exist

  return new Promise((resolve, reject) => {
    const child = exec(
      `npm run build-user-portfolio --buildOutputPath=${buildPath}`
    )
    child.stdout?.on("data", (data) => {
      console.log("on stdout data", data)
    })

    child.stderr?.on("data", (data) => {
      console.log("on stderr data", data)
    })

    child.on("close", (code) => {
      console.log("buildUserPortfolioStaticFiles with code", code)
      if (code != 0) return reject("Exec completed with exit code" + code)
      resolve()
    })
  })
}

export async function replaceBaseUrlInDocusaurusConfig(
  templateConfigFilePath: string,
  destConfigFilePath: string,
  repoName: string
) {
  const contents = fs.readFileSync(templateConfigFilePath, { encoding: "utf8" })
  const res = contents.toString().replace(/\$REPO_NAME/g, repoName)
  await fs.writeFile(destConfigFilePath, res, "utf8")
}
