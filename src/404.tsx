import { Layouts } from "@/_utils/constants.ts";

export const layout = Layouts.BaseLayout;
export const title = "Page not found";

export default function () {
  return (
    <section>
      <h1>Error 404: Page not found</h1>
      <p>
        Sorry! I couldn't find this page. If it existed before, I probably
        renamed it or moved it somewhere else.
      </p>
      <p>I rarely delete things from my website :)</p>
      <p>
        <a href="/">Go home</a>
      </p>
    </section>
  );
}
