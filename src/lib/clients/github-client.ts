import axios, { AxiosInstance } from 'axios'
import { CommitsResult, FilesChangedResult } from '../types/commits'

class Github {
  private axiosInstance: AxiosInstance
  private apiKey: string | undefined
  private organization: string | undefined
  private repository: string | undefined
  private pullNumber: number | undefined

  constructor() {
    this.apiKey = process.env.GITHUB_AUTH_TOKEN
    this.organization = process.env.GITHUB_ORGANIZATION
    this.repository = process.env.GITHUB_REPOSITORY
    this.pullNumber = Number(process.env.GITHUB_PULL_NUMBER)
    this.axiosInstance = axios.create({
      baseURL: 'https://api.github.com/repos/'
    })
  }

  async getCommits(): Promise<CommitsResult> {
    const response = await this.axiosInstance.get(`${this.organization}/${this.repository}/pulls/${this.pullNumber}/commits`, {
      headers: {
        'Authorization': `token ${this.apiKey}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    return response.data
  }

  async getFilesChanged(commitHash: string): Promise<FilesChangedResult> {
    const response = await this.axiosInstance.get(`${this.organization}/${this.repository}/commits/${commitHash}`, {
      headers: {
        'Authorization': `token ${this.apiKey}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    return response.data
  }

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
