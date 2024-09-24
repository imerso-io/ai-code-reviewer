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
