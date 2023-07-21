import { Link } from "react-router-dom"

const Video = ({id,data}) => {
  return (
    <div>
      <Link to={'/video/'+ id}>
        <img src={data.thumbnails.medium.url} alt="" loading="lazy"/>
        <h3>{data.title}</h3>
      </Link>
      date:{data.publishTime}
      <Link to={'/channels/' + data.channelId} >{data.channelTitle}</Link>
    </div>
  )
}

export default Video