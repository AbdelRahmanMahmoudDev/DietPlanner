import HomePage from './Homepage/page'
import { ContextProvider } from './contexts/context'

export default function Home() {
  return (
    <ContextProvider>
        <HomePage />
    </ContextProvider>
  )
}
