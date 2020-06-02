import { Octokit } from "@octokit/rest"
import { exec } from "child_process"
import dotenv from "dotenv"
import cryptoRandomString from "crypto-random-string"
import { USER_PORTFOLIO_BUILDS } from "./userPortfolio"
import { config } from "./config"

dotenv.config() //important it is set up before octokit sets auth

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
})

// //repoName could be the linkedin unique uri
// export async function hostOnGithub(repoName: string, dirToUpload: string) {
//   const uniqueRepoName = await generateUniqueRepoName(repoName)
//   await createRepo(uniqueRepoName)
//   await uploadBuildFiles(uniqueRepoName, dirToUpload)
//   await enableGithubPages(uniqueRepoName) //do it after uploading the build files coz otherwise master isnt ready by then
// }

export async function doesRepoExist(repoName: string): Promise<boolean> {
  try {
    const res = await octokit.repos.get({
      owner: config.githubOrgName,
      repo: repoName,
    })
    return res.status === 200
  } catch (error) {
    if (error.status === 404) return false
    //404 means it doenst exist
    else throw error
  }
}

//keeps trying different repo names until it gets a unique one. 99.9999...% of the time it will be unique on the first shot
export async function generateUniqueRepoName(
  repoName: string
): Promise<string> {
  const randStrLen = 5 //number of random chars to add to end of string
  while (true) {
    const _doesRepoExist = await doesRepoExist(repoName)
    console.log(`Does ${repoName} repo already exist? ${_doesRepoExist}`)
    if (!_doesRepoExist) return repoName
    repoName = `${repoName}-${cryptoRandomString({ length: randStrLen })}`
  }
}

export async function createRepo(repoName: string) {
  octokit.repos.createInOrg({
    name: repoName,
    private: false, //we need to pay for private repos with github pages
    auto_init: false, //temp
    org: config.githubOrgName,
  })
}

async function enableGithubPages(repoName: string) {
  octokit.repos.enablePagesSite({
    owner: config.githubOrgName,
    repo: repoName,
    source: {
      branch: "master",
    },
  })
}

export async function uploadToGithub(repoName: string, dirToUpload: string) {
  //actually pushing the folder using octokit is kinda too cancer. so we just use command line.
  await new Promise((resolve, reject) => {
    const child = exec(`
        chmod u+x ${dirToUpload};
        cd ${dirToUpload}; 
        rm -rf .git;
        git init;
        git config user.email "claperone.portasaurus@gmail.com";
        git config user.name "PortosaurusBot";
        git add .;
        git commit -m "Auto generated project";
        git remote add origin https://github.com/${config.githubOrgName}/${repoName}.git;
        git push -u -f https://${process.env.GITHUB_AUTH_TOKEN}@github.com/${config.githubOrgName}/${repoName}.git;
        `)
    child.stdout?.on("data", (data) => {
      console.log("on stdout data", data)
    })
    child.stderr?.on("data", (data) => {
      console.log("on stderr data", data)
    })
    child.on("close", (code) => {
      console.log("uploadToGithub done with code", code)
      if (code != 0) return reject("Exec completed with exit code" + code)
      resolve()
    })
  })
  await enableGithubPages(repoName)
}
