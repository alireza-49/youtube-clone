import { useQuery } from "@tanstack/react-query"
import fetchSearch from "./fetchSearch"
import { useParams } from "react-router-dom"
import LineMdLoadingAltLoop from "./LineMdLoadingAltLoop";
import Video from "./video";
import { useState } from "react";
const Search = () => {
  const query = useParams()
  const result = useQuery(['search', query] , fetchSearch)
  const [render,setRender] = useState({})
  if (result.isLoading){
    return(
      <div className="loading">
          <LineMdLoadingAltLoop/>
      </div>
    )
  }
  else if (result.isError){
    return(
      <div>
        error while loading the page
        <button onClick={() => setRender({})}>try again</button>
      </div>
    )
  }
  return (
    <>
      {result.data.items.map((video) => {
          return(<Video key={video.id.videoId} id={video.id.videoId}  data={video.snippet}/>)
      })}
    </>
  )
}
export default Search