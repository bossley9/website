type Props = {
  index: number
  total: number
  baseUrl: string
}

export function PaginationNav({ index, total, baseUrl }: Props) {
  const NUM_SLOTS = 5
  let start = Math.max(1, index - Math.floor(NUM_SLOTS / 2))
  const end = Math.min(total, start + NUM_SLOTS - 1)

  if (end - start + 1 < NUM_SLOTS) {
    start = Math.max(1, end - NUM_SLOTS + 1)
  }

  const navIndices: number[] = []
  for (let i = start; i <= end; i++) {
    navIndices.push(i)
  }

  return (
    <ul className="pagination">
      {index > 1 && (
        <>
          <li>
            <a href={baseUrl} aria-label="first page">
              <svg
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={
                index - 1 === 1 ? baseUrl : baseUrl + '/page/' + (index - 1)
              }
              aria-label="previous page"
            >
              <svg
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </a>
          </li>
        </>
      )}
      {navIndices.map((calcIndex) => (
        <li
          key={calcIndex}
          {...(calcIndex === index && { className: 'active' })}
        >
          <a
            href={calcIndex === 1 ? baseUrl : baseUrl + '/page/' + calcIndex}
            aria-label={`page ${calcIndex}`}
          >
            {calcIndex}
          </a>
        </li>
      ))}
      {index < total && (
        <>
          <li>
            <a href={baseUrl + '/page/' + (index + 1)} aria-label="next page">
              <svg
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </svg>
            </a>
          </li>
          <li>
            <a href={baseUrl + '/page/' + total} aria-label="last page">
              <svg
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
              </svg>
            </a>
          </li>
        </>
      )}
    </ul>
  )
}
