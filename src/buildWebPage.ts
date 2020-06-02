import { generateUniqueRepoName, createRepo, uploadToGithub } from "./github"
import {
  replaceBaseUrlInDocusaurusConfig,
  buildUserPortfolioStaticFiles,
  USER_PORTFOLIO_BUILDS,
} from "./userPortfolio"
import appRoot from "app-root-path"
import path from "path"

export async function buildUserWebPage(
  linkedinUid: string,
  linkedinVanityName: string
) {
  const repoName: string = linkedinVanityName
  const uniqueRepoName = await generateUniqueRepoName(repoName)

  await replaceBaseUrlInDocusaurusConfig(
    path.join(appRoot.path, "templates", "docusaurus.config.template.js"),
    path.join(appRoot.path, "docusaurus", "docusaurus.config.js"),
    uniqueRepoName
  )
  console.log("replaceBaseUrlInDocusaurusConfig done")
  await buildUserPortfolioStaticFiles(uniqueRepoName)
  console.log("buildUserPortfolioStaticFiles done")

  await createRepo(uniqueRepoName)
  console.log("createRepo done")
  await new Promise((resolve) => setTimeout(resolve, 4000)) //give it a mo to actually create on their github servers, or we might get an error
  await uploadToGithub(
    uniqueRepoName,
    path.join(USER_PORTFOLIO_BUILDS, uniqueRepoName, "build") //it should be hosted at root so the url is nice on github pages
  )
}
