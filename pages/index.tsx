import React, { FC, Fragment } from 'react'
import { Head } from 'components/Head'
import { Icon, IconName, IconPrefix } from 'components/Icon'
import { Link } from 'components/Link'
import { Header } from 'components/Header'
import { APP_NAME, ICON_SIZE, SOCIAL } from 'constants/strings'
import 'constants/iconLibrary'

const Main: FC = () => {
  return (
    <Fragment>
      <Head
        meta={{
          title: APP_NAME,
          desc: 'A web developer exploring the world',
          keywords: ['website', 'sam', 'bossley', 'developer', 'thoughts'],
        }}
      />
      <Header hasTitle={false} />
      <section className="container my7 tc">
        <h3 className="mb5">Sam Bossley.</h3>
        <ul className="df fd-c-s pa0 lstn jc-c mb5">
          {SOCIAL.map((s, i: number) => (
            <li key={i} className="mx4 tc my3-s" style={{ height: ICON_SIZE }}>
              <a
                // for mastodon linking
                rel="me"
                href={s.url}
                aria-label={s.name}
                title={s.name}
                className="c-inh hov-c-text-light"
              >
                <Icon
                  className="h-100 w-a"
                  prefix={(s.prefix as IconPrefix) || 'fab'}
                  icon={s.icon as IconName}
                />
              </a>
            </li>
          ))}
        </ul>
        <div>
          <Link href="/thoughts">Arbitrary thoughts</Link>
        </div>
      </section>
    </Fragment>
  )
}

export default Main
