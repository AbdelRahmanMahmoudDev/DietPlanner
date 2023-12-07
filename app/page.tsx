import HomePage from './pages/Homepage/homePage'
import { ContextProvider } from './contexts/context'
export default function Home() {
  return (
    <ContextProvider>
        <HomePage />
    </ContextProvider>
  )
}
