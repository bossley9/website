import { walk } from "https://deno.land/std@0.212.0/fs/walk.ts";

const errors: string[] = [];

for await (const entry of walk("src")) {
  if (entry.isDirectory) {
    continue;
  }
  const content = await Deno.readTextFile(entry.path);

  const cdn = "cdn.bossley.xyz";
  if (content.indexOf(`http://${cdn}`) >= 0) {
    errors.push(
      `Error: ${entry.path}: convert http://${cdn} URLs to use HTTPS first.`,
    );
  }

  const expr = /https?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
  const matches = content.match(expr);

  if (matches) {
    for (const match of matches) {
      errors.push(
        `Error: ${entry.path}: convert local IP ${match} to a different url first.`,
      );
    }
  }
}

errors.forEach((error) => console.error(`%c${error}`, "color: red"));

if (errors.length > 0) {
  Deno.exit(1);
}
