import type { GetStaticPathsResult } from 'astro'

export type CustomPage<T> = {
  data: T[]
  currentPage: number
  lastPage: number
}

export function customPagination<T>(data: T[]): GetStaticPathsResult {
  const pageSize = 15
  const totalNumPages = Math.ceil(data.length / pageSize)
  const staticPaths: GetStaticPathsResult = []

  for (let i = 1; i <= totalNumPages; i++) {
    const pageData: CustomPage<T> = {
      data: data.slice((i - 1) * pageSize, i * pageSize),
      currentPage: i,
      lastPage: totalNumPages,
    }
    const pageSlug = i === 1 ? undefined : 'page/' + i

    staticPaths.push({
      params: { page: pageSlug },
      props: {
        page: pageData,
      },
    })
  }

  return staticPaths
}
