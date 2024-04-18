import 'dotenv/config'
import axios from 'axios'

const headers = ({
  'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json'
})

const user = ''
const repo = ''
const pullNumber = 1
const url = `https://api.github.com/repos/${user}/${repo}/pulls/${pullNumber}/commits`

async function getCommits() {
  try {
    const response = await axios.get(url, { headers })

    const commits = await response.data

    for (const commit of commits) {
      const url = `https://api.github.com/repos/${user}/${repo}/commits/${commit.sha}`
      const response = await axios.get(url, { headers })

      const commitDetails = await response.data

      console.log(commitDetails)
    }
  } catch (err) { console.log(err); }
}

getCommits()
