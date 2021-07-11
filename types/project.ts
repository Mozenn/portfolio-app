export interface Project {
  id: string
  content?: string,
  title: string,
  priority: number,
  imageName: string,
  iconName: string,
  stack: string,
  githubUrl?: string,
  accessUrl?: string
}