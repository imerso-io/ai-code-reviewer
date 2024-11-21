import { logger, postCommentOnGithub } from './libs'

try {
  const response = await postCommentOnGithub()
  logger.info(response)
} catch (e) {
  logger.error(e)
}
