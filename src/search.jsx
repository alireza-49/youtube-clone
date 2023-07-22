import { useQuery } from "@tanstack/react-query"
import fetchSearch from "./fetchSearch"
import { useParams } from "react-router-dom"
import LineMdLoadingAltLoop from "./LineMdLoadingAltLoop";
import Video from "./video";
import { useState } from "react";
const Search = () => {
  const query = useParams()
  console.log(query)
  const result = useQuery(['search', query.query] , fetchSearch)
  const [render,setRender] = useState({})
  if (result.isLoading){
    return( 
      <div className="loading-homepage">
        <LineMdLoadingAltLoop/>
      </div> 
    )
  }
  else if (result.isError){
    return(
      <div className="error-homepage">
          <h3>error while loading the page</h3>
        <button onClick={() => setRender({})}>try again</button>
      </div>
    )
  }
  return (
    <div className="homepage-video-container">
      {result.data.items.map((video) => {
          return(<Video key={video.id.videoId} id={video.id.videoId}  data={video.snippet}/>)
      })}
    </div>
  )
}
export default Search