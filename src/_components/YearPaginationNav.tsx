type Props = {
  current: number;
  years: number[];
  baseUrl: string;
};

export function YearPaginationNav({ current, years, baseUrl }: Props) {
  return (
    <ul class="yearpagination">
      {years.map((year, i) => {
        const href = i === 0 ? baseUrl : baseUrl + "/page/" + year;
        return (
          <li class={current === year ? "active" : ""}>
            <a href={href} aria-label={`page for year ${year}`}>
              {year}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
