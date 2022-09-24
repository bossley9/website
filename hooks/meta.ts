import { useEffect } from 'react'
import { APP_NAME } from 'constants/strings'

export const useDocumentTitle = (subtitle?: string) => {
  const heading = subtitle && subtitle.length ? subtitle + ' - ' : ''
  useEffect(() => {
    document.title = `${heading}${APP_NAME}`
  }, [subtitle])
}
