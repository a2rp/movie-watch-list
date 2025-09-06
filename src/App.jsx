import About from './components/about'
import MovieWatchlist from './components/movieWatchList'
import ScrollToTopButton from './components/scrollToTopButton'

const App = () => {
    return (
        <>
            <MovieWatchlist />
            <About />
            <ScrollToTopButton />
        </>
    )
}

export default App