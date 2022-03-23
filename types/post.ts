export interface Post {
  id: string
  content?: string,
  title: string,
  bannerPath: string,
  priority: number,
  tags: Array<string>,
  author: string,
  date: string,
  timeEstimate: number
}