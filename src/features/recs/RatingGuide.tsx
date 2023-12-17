export function RatingGuide() {
  return (
    <section>
      <h1>Rating Guide</h1>
      <p>
        I rate the content I review on a scale of 0 to 10. Here is a general
        idea of what you can expect:
      </p>
      <table>
        <thead>
          <th>Rating</th>
          <th>Description</th>
        </thead>
        <tbody>
          <tr>
            <td>0.0 - 5.9</td>
            <td>
              This is actively painful to consume. I will avoid this in the
              future and would not subject anyone to this.
            </td>
          </tr>
          <tr>
            <td>6.0 - 6.9</td>
            <td>
              This is mediocre content and does not quite meet my expectations.
            </td>
          </tr>
          <tr>
            <td>7.0 - 7.9</td>
            <td>
              This is pretty good and is worth recommending to my friends.
            </td>
          </tr>
          <tr>
            <td>8.0 - 8.9</td>
            <td>
              This is exceptional among other works. Everyone should experience
              this.
            </td>
          </tr>
          <tr>
            <td>9.0 - 10</td>
            <td>
              This is a virtually flawless masterpiece. There probably won&#39;t
              be another one like this for a decade.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
