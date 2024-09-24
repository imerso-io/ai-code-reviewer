import githubClient from '../clients'
import { Commits, File, FilesChanged } from '../types'
import generateReview from './generate-review'

export async function postCommentOnGithub() {
  try {
    const commits: Commits[] = (await githubClient.getCommits()).data

    let codeToReview = ''

    for (const commit of commits) {
      const response: FilesChanged = (await githubClient.getFilesChanged(commit.sha)).data
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
