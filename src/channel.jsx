import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import fetchSearch from "./fetchSearch"
import LineMdLoadingAltLoop from "./LineMdLoadingAltLoop"
import Video from "./video"
const Channel = () => {
  const channelId = useParams()
  const id = channelId.id
  const fetchChannelDetails = useQuery(['channelInfo',id],fetchSearch)
  const fetchChannelvideoes = useQuery(['channelvideoes',id],fetchSearch)
  if (fetchChannelDetails.isLoading || fetchChannelvideoes.isLoading){
    return (
      <div>
        <div>
          <LineMdLoadingAltLoop/> 
        </div>
        <div>
          <LineMdLoadingAltLoop />
        </div>
      </div>
    )
  }
  const channelData = fetchChannelDetails.data.items[0]
  const channelVideoes = fetchChannelvideoes.data.items
  return (
    <div>
        <div>
          <div><img src={channelData.snippet.thumbnails.default.url} alt="" /> <h3>{channelData.snippet.title}</h3><h4>{channelData.statistics.subscriberCount}</h4>
          <div><h3>{channelData.snippet.description}</h3><h4>video count:{channelData.statistics.videoCount}</h4></div> </div>
        </div>
        <div>
        {channelVideoes.map((video) => {
          return(<Video key={video.id.videoId} id={video.id.videoId}  data={video.snippet}/>)
      })}
        </div>
    </div>
  )
}
export default Channel