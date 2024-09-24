export type Commits = {
  sha: string
}

export type CommitsResult = {
  data: Commits[]
}

export type File = {
  filename: string
  patch: string
}

export type FilesChanged = {
  files: File[]
}

export type FilesChangedResult = {
  data: FilesChanged
}
