import githubClient from '../clients'
import { type File } from '../types'
import generateReview from './generate-review'

/**
 *  POST - Post a comment on a pull request with the code to review
*/
export async function postCommentOnGithub() {
  try {
    const commits = (await githubClient.getCommits()).data

    let codeToReview = ''

    for (const commit of commits) {
      const response = (await githubClient.getFilesChanged(commit.sha)).data
      codeToReview = response.files.map((file: File) =>
        `Arquivo: ${file.filename}
        Código: """
        ${file.patch}
        """`
      ).join('\n\n')
    }

    const response = await generateReview(codeToReview)

    await githubClient.postComment(response)

    return 'Comentário postado com sucesso!'
  } catch (err: any) {
    console.error(err)
  }
}
