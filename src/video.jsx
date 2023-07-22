import { Link } from "react-router-dom"
import './video.css'
const Video = ({id,data}) => {
  const calculateTimedifference = (time) => {
    const timeDifference =  new Date(time) - new Date()    
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24) % 365);
    const hoursAgo = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const yearsAgo = Math.floor((timeDifference / (1000 * 60 * 60 * 24 * 365)));
    return `${yearsAgo * -1} ${yearsAgo?'years,':null} ${daysAgo * -1} ${daysAgo ?'days and ': null} ${hoursAgo * -1}hours ago`
  }
  return (
    <div className="video-container">
      <Link className="video-link" to={'/videoPlayer/'+ id}>
        <div className="video-thumbnail-container">
          <img src={data.thumbnails.medium.url} alt="" loading="lazy" className="video-thumbnail"/>
          <h3>{data.title}</h3>
        </div>
      </Link>
      <div>
          <h4>{calculateTimedifference(data.publishTime)}</h4>
          <Link className="video-link "  to={'/channels/' + data.channelId} >{data.channelTitle}</Link>
      </div>
    </div>
  )
}

export default Video;