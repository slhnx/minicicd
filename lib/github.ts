import { App } from 'octokit'

export function getGithubApp(): App {
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;

  if (!appId) {
    throw new Error("GITHUB_APP_ID is missing in environment variables");
  }

  if (!privateKey) {
    throw new Error("GITHUB_APP_PRIVATE_KEY is missing in environment variables");
  }

  const formattedPrivateKey = privateKey.includes('\n')
    ? privateKey
    : privateKey.replace(/\\n/g, '\n');

  return new App({
    appId: parseInt(appId, 10),
    privateKey: formattedPrivateKey,
  });
}