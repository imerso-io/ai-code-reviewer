import axios from 'axios'
import generateReview from './generate-review'

async function commitIterator(commits: any, headers: any, params: any) {
  let codeToReview = ''

  for (const commit of commits) {
    const url = `https://api.github.com/repos/${params.user}/${params.repo}/commits/${commit.sha}`
    const response = (await axios.get(url, { headers })).data

    codeToReview = response.files.map((file: any) =>
      `Arquivo: ${file.filename}
      Código: """
      ${file.patch}
      """`
    ).join('\n\n')
  }

  generateReview(codeToReview)
}

export default commitIterator
