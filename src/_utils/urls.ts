export function slugify(str: string) {
  // 1. trim whitespace
  // 2. remove capitals
  // 3. remove symbols (excluding dashes)
  // 4. replace spaces with dashes
  return str
    .trim()
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z0-9\- ]/g, "")
    .replace(/\s+/g, "-");
}

export function dateSlugify(date: Date, title: string) {
  const year = date.toLocaleDateString("en", { year: "2-digit" });
  const month = date.toLocaleDateString("en", { month: "2-digit" });
  const id = slugify(title);
  return year + "/" + month + "/" + id;
}
