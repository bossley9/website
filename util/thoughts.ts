import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Thought } from 'util/types'

const dir = path.join(process.cwd(), 'thoughts')

export const getThoughts = () => {
  const filenames = fs.readdirSync(dir)
  const thoughts = filenames.map((filename) => {
    const id = filename.replace(/\.md/, '')

    const fullPath = path.join(dir, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const res = matter(fileContents)
    const content = res.content

    return {
      ...res.data,
      id,
      content,
    } as Thought
  })

  return thoughts.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
}

export const getThoughtIds = () => {
  const filenames = fs.readdirSync(dir)

  return filenames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md/, ''),
      },
    }
  })
}

export const getThought = (id: string) => {
  const fullPath = path.join(dir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const res = matter(fileContents)
  const content = res.content

  return {
    ...res.data,
    id,
    content,
  } as Thought
}
