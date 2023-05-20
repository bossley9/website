type Referral = {
  name: string
  url: string
}

const referralList: Referral[] = [
  {
    name: 'Discover (digital banking)',
    url: 'https://refer.discover.com/s/xgjm62',
  },
  {
    name: 'Mint Mobile (wireless service provider)',
    url: 'http://fbuy.me/uw-lF',
  },
  {
    name: 'Root (car insurance)',
    url: 'https://rootbonus.com/SamBossley?',
  },
  {
    name: 'Vultr (cloud hosting)',
    url: 'https://www.vultr.com/?ref=8919448',
  },
]

export function Referrals() {
  return (
    <section className="referrals">
      <h1>Referrals</h1>
      <p>
        Here is a list of referral codes for products I use if you&#39;d like to
        support me and get discounted products.
      </p>
      <ul>
        {referralList.map(({ name, url }) => (
          <li key={url}>
            <a href={url}>{name}</a>
          </li>
        ))}
      </ul>
      <p className="footer">
        I am not an affiliate or paid sponsor of any of these products.
      </p>
    </section>
  )
}
