import HomePage from './pages/Homepage/homePage'
import { ThemeContextProvider } from './contexts/themeContext'
export default function Home() {
  return (
    <ThemeContextProvider>
        <HomePage />
    </ThemeContextProvider>
  )
}
