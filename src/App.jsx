
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import  Feed from './Feed'
import Video from './video.jsx'
import Channel from './channel'
import Search from './search.jsx'
import Navbar  from './navbar'


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
        <Route path='/' element={<Feed/>} />        
        <Route path='/video/:id' element={<Video/>} />
        <Route path='/channel/:id' element={<Channel/>} />
        <Route path='/search/:query' element={<Search/>} />

      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
