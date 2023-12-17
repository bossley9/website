type Props = {
  current: number;
  years: number[];
  baseUrl: string;
};

export function YearPaginationNav({ current, years, baseUrl }: Props) {
  return (
    <ul className="year-pagination">
      {years.map((year, i) => {
        const href = i === 0 ? baseUrl : baseUrl + "/page/" + year;
        return (
          <li key={year} className={current === year ? "active" : ""}>
            <a href={href} aria-label={`page for year ${year}`}>
              {year}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
