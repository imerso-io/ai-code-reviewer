import generateReview from './services/generate-review'
import fs from 'fs'

const filePath = './src/paste_your_code.ts'
const codeToReview = fs.readFileSync(filePath, 'utf-8')

generateReview(codeToReview)
  .then(data => console.log(data))
  .catch(err => console.error(err))
