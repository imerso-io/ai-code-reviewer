import 'dotenv/config'
import axios from 'axios'

const headers = ({
  'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
  "Content-Type": "application/json"
})

const user = ''
const repo = ''
const issuesNumber = 1
const url = `https://api.github.com/repos/${user}/${repo}/issues/${issuesNumber}/comments`

async function postComments(comment: string) {
  try {
    const response = await axios.post(url, { body: comment }, { headers })

    console.log(response.data)
  } catch (err) { console.log(err) }
}

postComments('Testando comentário de commit no GitHub')
