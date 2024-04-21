import 'dotenv/config'
import axios from 'axios'

const headers = ({
  'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
  "Content-Type": "application/json"
})

const params = {
  user: process.env.GITHUB_USER,
  repo: process.env.GITHUB_REPO,
  issuesNumber: process.env.GITHUB_PULL_NUMBER
}
const url = `https://api.github.com/repos/${params.user}/${params.repo}/issues/${params.issuesNumber}/comments`

async function postComments(comment: string | null): Promise<string | void> {
  try {
    await axios.post(url, { body: comment }, { headers })

    return 'Comentário postado com sucesso!'
  } catch (err) { console.log(err) }
}

export default postComments
