import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Navbar = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const handleForm = (query) => {
    if (!query) {
      setMessage('you can not search for nothing!!')
      setTimeout(() => setMessage('') , 1500)
    }
    else{
      navigate(`/search/${query}`)
    }
  } 
  const topics = ['all','javascript','react','minecraft', 'history' , 'math' , 'data science' , 'biology']
  const [activeTopic,setActiveTopic] = useState('all') 
  return (
    <>
    <div>
      <Link to='/'><YouTubeIcon/></Link>

      <form onSubmit={(e) => {e.preventDefault();handleForm(e.target.q.value)}}>
        <input name='q' type="text" placeholder='search'/>
        <button type='submit'><SearchIcon/></button>
      </form>
      <h3>{message}</h3>
    </div>
    <div>
      {topics.map((topic,index) => <Link className={topic === activeTopic? 'header-topic header-active-topic' : 'header-topic'} key={index} to={'/search/' + topic}>{topic}</Link>)}
    </div>
    </>
  )
}

export default Navbar