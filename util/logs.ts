import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Log } from 'util/types'

const dir = path.join(process.cwd(), 'log')

const strEndsWith = (str: string, substr: string): boolean => {
  return str.indexOf(substr) === str.length - substr.length
}

export const getLogs = () => {
  const filenames = fs.readdirSync(dir).filter((i) => strEndsWith(i, '.md'))

  const logs = filenames.map((filename) => {
    const id = filename.replace(/\.md/, '')

    const fullPath = path.join(dir, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const res = matter(fileContents)
    const content = res.content

    return {
      ...res.data,
      id,
      content,
    } as Log
  })

  return logs.sort((a, b) => b.title.localeCompare(a.title))
}

export const getLogIds = () => {
  const filenames = fs.readdirSync(dir).filter((i) => strEndsWith(i, '.md'))

  return filenames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md/, ''),
      },
    }
  })
}

export const getLog = (id: string) => {
  const fullPath = path.join(dir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const res = matter(fileContents)
  const content = res.content

  return {
    ...res.data,
    id,
    content,
  } as Log
}
