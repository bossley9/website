import { Layouts } from "@/_utils/constants.ts";

export const layout = Layouts.BaseLayout;
export const title = "Referrals";

type Referral = {
  name: string;
  url: string;
};

const referralList: Referral[] = [
  {
    name: "Capital One (digital banking)",
    url: "https://capital.one/3OGvA5V",
  },
  {
    name: "Discover (digital banking)",
    url: "https://refer.discover.com/s/xgjm62",
  },
  {
    name: "Libro.fm (audiobook provider)",
    url: "https://libro.fm/referral?rf_code=lfm336069",
  },
  {
    name: "Mint Mobile (wireless service provider)",
    url: "http://fbuy.me/uw-lF",
  },
  {
    name: "Proton (Mail service)",
    url: "https://pr.tn/ref/F7MN4WDZQEY0",
  },
  {
    name: "Root (car insurance)",
    url: "https://rootbonus.com/SamBossley?",
  },
  {
    name: "Vultr (cloud hosting)",
    url: "https://www.vultr.com/?ref=8919448",
  },
];

export default function () {
  return (
    <section class="referrals">
      <h1>Referrals</h1>
      <p>
        Here is a list of referral codes for products I use if you&#39;d like to
        support me and get discounted products.
      </p>
      <ul>
        {referralList.map(({ name, url }) => (
          <li>
            <a href={url}>{name}</a>
          </li>
        ))}
      </ul>
      <small>
        I am not an affiliate or paid sponsor of any of these products.
      </small>
    </section>
  );
}
