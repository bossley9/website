export type Feed = {
  desc: string
  href: string
  image?: string
  items?: {
    content?: string
    date?: string
    desc?: string
    href: string
    id?: string
    tags?: string[]
    title: string
  }[]
  title: string
}

export type Thought = {
  content: string
  date: string
  desc: string
  id: string
  image?: string
  lastUpdated: string
  tags: string[]
  title: string
}

export type Log = {
  content: string
  date: string
  desc: string
  id: string
  image?: string
  lastUpdated: string
  title: string
}
