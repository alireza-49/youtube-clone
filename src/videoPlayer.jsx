import { useEffect, useRef, useState } from "react"
import Modal from "./modal"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import fetchSearch from './fetchSearch'
import LineMdLoadingAltLoop from "./LineMdLoadingAltLoop"
import { Slider } from "@mui/material"
import './videoplayer.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion ,AccordionSummary,AccordionDetails} from "@mui/material"
const VideoPlayer = () => {
    const [miniPlayer,setMiniplayer] = useState(false)
    const {id} = useParams()
    const {data, isLoading, isError} = useQuery(['video', id],fetchSearch)
    const comments = useQuery(['comments', id],fetchSearch)
    const related_videoes = useQuery(['suggested_videoes' , id],fetchSearch)
    const [_,setRerender] = useState([])

    if(isError || comments.isError || related_videoes.isError) {
        return(
            <div>
                error occured please <button onClick={() => setRerender({})}>Try again</button>
            </div>
        )
    }
if (isLoading){
    return( 
        <div>
        <div className="loading-channel-data">
          <LineMdLoadingAltLoop/>
      </div>
        <div className="loading-homepage">
          <LineMdLoadingAltLoop/>
      </div>
      </div>
    )}
    const info = [data.items[0].statistics,data.items[0].snippet]
    const calculateTimedifference = (time) => {
        const timeDifference =  new Date(time) - new Date()    
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24) % 365);
        const hoursAgo = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const yearsAgo = Math.floor((timeDifference / (1000 * 60 * 60 * 24 * 365)));
        return `${yearsAgo * -1} ${yearsAgo?'years,':null} ${daysAgo * -1} ${daysAgo ?'days and ': null} ${hoursAgo * -1}hours ago`

    }
    return (
        <div>
                <div className="player-container">
                    <iframe  src="https://www.youtube.com/embed/9Sq4nvhrHmM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div className="player-data">    
                    <div className="player-title">
                        <h3>{info[1].title}</h3>
                        <h4>{info[0].likeCount} <ThumbUpAltIcon/> </h4> <h4>{info[0].viewCount} <RemoveRedEyeIcon/></h4>
                    </div>
                    <div className="channel-name-player"> 
                        <Link to={'/channels/' + info[1].channelId}> {info[1].channelTitle}</Link>
                    </div>
                    <div className="accordin-container">
                            <Accordion id="accordin">
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>despription</AccordionSummary>
                                <AccordionDetails> {info[1].description}</AccordionDetails>
                            </Accordion>
                    </div>
                    </div>
            <div className="comments-suggested">
                <div className="comments-container">
                    {comments.isLoading?<div className=""><LineMdLoadingAltLoop/></div>:(
                        (comments.data.items?<h3>no comments yet</h3> :null),
                        comments.data.items.map((comment) => {
                            const detail = comment.snippet.topLevelComment.snippet
                            return(
                                <div className="comment-container" key={comment.id}>
                                    <div className="comment-header">
                                        <img src={detail.authorProfileImageUrl} alt="avatar" />
                                        <h3>{detail.authorDisplayName}</h3>
                                        <h4>{calculateTimedifference(detail.publishedAt)}</h4>
                                    </div>
                                    <div className="comment-text">{detail.textDisplay}</div>
                                </div>
                            )
                        }))               
                    }
                </div>
                <div className="suggested-videoes-container">
                    {related_videoes.isLoading? <LineMdLoadingAltLoop/>: (
                        !related_videoes.data.items?<h3>sorry no suggestions for this video</h3>:
                        (related_videoes.data.items.map((video) => {
                            const data = video.snippet

                            return(
                                <div className='suggested-video' key={video.id.videoId}>
                                    <Link to={'/videoPlayer/'+ video.id.videoId}>
                                        <img className='suggested-video-thumbnail' src={data.thumbnails.medium.url} alt="" loading="lazy"/>
                                        <h3>{data.title}</h3>
                                    </Link>
                                    {calculateTimedifference(data.publishTime)}

                                    <Link className="suggested-video-channel" to={'/channels/' + data.channelId} >{data.channelTitle}</Link>
                                    </div>
                            )
                        }))
                    )}
                </div>
            </div>
        </div>
        
    )   



}
export default VideoPlayer