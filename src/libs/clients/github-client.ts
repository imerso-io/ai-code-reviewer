import axios, { AxiosInstance } from 'axios'
import { type CommitsResult, type FilesChangedResult } from '../types'

class Github {
  private axiosInstance: AxiosInstance
  private apiKey: string
  private organization: string
  private repository: string
  private pullNumber: number

  constructor() {
    this.apiKey = process.env.GITHUB_AUTH_TOKEN ?? ''
    this.organization = process.env.GITHUB_ORGANIZATION ?? ''
    this.repository = process.env.GITHUB_REPOSITORY ?? ''
    this.pullNumber = Number(process.env.GITHUB_PULL_NUMBER)
    this.axiosInstance = axios.create({
      baseURL: 'https://api.github.com/repos/'
    })
  }

   /**
   *  GET - Get the commits for a pull request
   *  @returns {Promise<CommitsResult>} - The response from the API
  */
  async getCommits(): Promise<CommitsResult> {
    const response = await this.axiosInstance.get(`${this.organization}/${this.repository}/pulls/${this.pullNumber}/commits`, {
      headers: {
        'Authorization': `token ${this.apiKey}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    return response
  }

  /**
   *  GET - Get the files changed in a commit
   *  @param {string} commitHash - The hash of the commit
   *  @returns {Promise<FilesChangedResult>} - The response from the API
  */
  async getFilesChanged(commitHash: string): Promise<FilesChangedResult> {
    const response = await this.axiosInstance.get(`${this.organization}/${this.repository}/commits/${commitHash}`, {
      headers: {
        'Authorization': `token ${this.apiKey}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    return response
  }

  /**
   *  POST - Post a comment (review) on a pull request
   *  @param {string | null} comment - The comment to post
  */
  async postComment(comment: string | null) {
    const response = await this.axiosInstance.post(
      `${this.organization}/${this.repository}/issues/${this.pullNumber}/comments`, {
      body: comment
    }, {
      headers: {
        'Authorization': `token ${this.apiKey}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    })

    return response.data
  }
}

const githubClient = new Github()

export default githubClient
