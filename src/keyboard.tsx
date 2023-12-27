import { Layouts } from "@/_utils/constants.ts";

export const layout = Layouts.BaseLayout;
export const title = "Keyboard";

export default function () {
  return (
    <section class="keyboard">
      <h1>Keyboard</h1>
      <p>
        My current daily driver is a&nbsp;
        <code>
          <a href="https://www.zsa.io/moonlander/">
            moonlander (detached wings)
          </a>
        </code>
        &nbsp;using&nbsp;
        <code>
          <a href="https://www.cherrymx.de/en/cherry-mx/mx-original/mx-silent-red.html">
            cherry red silents
          </a>
        </code>
        &nbsp;and&nbsp;
        <code>
          <a href="https://esckeyboard.com/products/pom-sugarcube-keycaps-1">
            jelly pom keycaps
          </a>
        </code>
        . I usually put up the legs <code>10 degrees</code>{" "}
        shy of straight vertical. Take a look at my keyboard layout below.
      </p>
      <iframe
        title="moonlander keyboard layout"
        referrerpolicy="no-referrer"
        src="https://configure.zsa.io/embed/moonlander/layouts/GLLvg/latest/0"
      />
    </section>
  );
}
