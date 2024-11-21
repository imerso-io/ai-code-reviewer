import { postCommentOnGithub } from './libs'

try {
  const response = await postCommentOnGithub()
  console.log(response)
} catch (e) {
  console.error(e)
}
