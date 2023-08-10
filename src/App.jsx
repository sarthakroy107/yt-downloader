import Footer from './components/Footer'
import Navbar from './components/Navbar'
import VideoDownloader from './components/VideoDownloaer'

function App() {

  return (
    <main className='w-full min-h-screen'>
      <Navbar/>
      <VideoDownloader/>
      <Footer/>
    </main>
  )
}

export default App
