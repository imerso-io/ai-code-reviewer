import 'dotenv/config'
import axios from 'axios'
import commitIterator from './commit-iterator'

const headers = ({
  'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json'
})

const params = {
  user: process.env.GITHUB_USER,
  repo: process.env.GITHUB_REPO,
  pullNumber: process.env.GITHUB_PULL_NUMBER
}
const url = `https://api.github.com/repos/${params.user}/${params.repo}/pulls/${params.pullNumber}/commits`

async function getCommits() {
  try {
    const response = await axios.get(url, { headers })

    const commits = await response.data

    commitIterator(commits, headers, params)
  } catch (err) { console.log(err) }
}

export default getCommits
