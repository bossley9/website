import { FC, ComponentClass } from 'react'
import 'css/styles.css'

type AppProps = {
  Component: ComponentClass
  props: object
}

const App: FC<AppProps> = ({ Component, props }) => <Component {...props} />

export default App
