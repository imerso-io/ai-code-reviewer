import getCommits from './services/get-commit-github'

getCommits()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
