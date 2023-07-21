
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Channel from './channel'
import Search from './search.jsx'
import Navbar  from './navbar'
import Homepage from './hompage'
import VideoPlayer from './videoPlayer'


function App() {
  const queryClient = new QueryClient({
    queries:{
      staleTime:Infinity,
      cacheTime:Infinity,
    }
  })
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />        
        <Route path='/videoPlayer/:id' element={<VideoPlayer/>} />
        <Route path='/channels/:id' element={<Channel/>} />
        <Route path='/search/:query' element={<Search/>} />

      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
