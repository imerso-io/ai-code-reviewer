import { logger, postCommentOnGithub } from './libs'

postCommentOnGithub()
  .then((response) => { logger.info(response) })
  .catch((error) => { logger.error(error) })
