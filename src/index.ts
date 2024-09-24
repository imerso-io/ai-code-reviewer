import { postCommentOnGithub } from './lib'

postCommentOnGithub()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
