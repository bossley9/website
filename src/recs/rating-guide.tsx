export const title = "Rating Guide";

export default function () {
  return (
    <section class="rguide">
      <h1>Rating Guide</h1>
      <p>
        I rate the content I review on a scale of 0 to 10. Here is a general
        idea of what you can expect. I will color notable works based on the
        {" "}
        <a href="https://tiermaker.com/">tiermaker</a> color scale.
      </p>
      <table>
        <thead>
          <th>Rating</th>
          <th>Description</th>
        </thead>
        <tbody>
          <tr class="stier">
            <td>9.0 - 10</td>
            <td>
              S Tier: This is a virtually flawless masterpiece. There probably
              won&#39;t be another one like this for a decade.
            </td>
          </tr>
          <tr class="atier">
            <td>8.0 - 8.9</td>
            <td>
              A Tier: This is exceptional among other works. Everyone should
              experience this.
            </td>
          </tr>
          <tr class="btier">
            <td>7.0 - 7.9</td>
            <td>
              B Tier: This is pretty good and is likely worth recommending to
              friends.
            </td>
          </tr>
          <tr class="ctier">
            <td>6.0 - 6.9</td>
            <td>
              C Tier: This is mediocre content and does not quite meet my
              expectations.
            </td>
          </tr>
          <tr class="dtier">
            <td style="white-space:nowrap">0.0 - 5.9</td>
            <td>
              D Tier: This is actively painful to consume. I will avoid this in
              the future and would not subject anyone to this.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
