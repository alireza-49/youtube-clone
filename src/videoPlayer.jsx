import { useEffect, useRef, useState } from "react"
import Modal from "./modal"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import fetchSearch from './fetchSearch'
import LineMdLoadingAltLoop from "./LineMdLoadingAltLoop"
import { Slider } from "@mui/material"
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
            <LineMdLoadingAltLoop/>
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
            <div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/9Sq4nvhrHmM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div>
                <h3>{info[1].title}</h3>
                <h4>{info[0].likeCount}</h4>
            </div>
            <div> 
                <Link to={'/channels/' + info[1].channelId}> {info[1].channelTitle}</Link>
            </div>
            <div>
                <h5> {calculateTimedifference(info[1].publishedAt)}</h5>
                <h4>{info[1].description}</h4>
                <h3>{info[0].viewCount}</h3>
            </div>
            <div>
                {comments.isLoading?<div><LineMdLoadingAltLoop/></div>:(
                    (comments.data.items?<h3>no comments yet</h3> :null),
                    comments.data.items.map((comment) => {
                        const detail = comment.snippet.topLevelComment.snippet
                        return(
                            <div key={comment.id}>
                                <div>
                                    <img src={detail.authorProfileImageUrl} alt="avatar" />
                                    <h3>{detail.authorDisplayName}</h3>
                                    <h4>{calculateTimedifference(detail.publishedAt)}</h4>
                                </div>
                                <div>{detail.textDisplay}</div>
                            </div>
                        )
                    }))               
                }
            </div>
            <div>
                {related_videoes.isLoading? <LineMdLoadingAltLoop/>: (
                    !related_videoes.data.items?<h3>sorry no suggestions for this video</h3>:
                    (related_videoes.data.items.map((video) => {
                        const data = video.snippet

                        return(
                            <div key={video.id.videoId}>
                                <Link to={'/videoPlayer/'+ video.id.videoId}>
                                    <img src={data.thumbnails.medium.url} alt="" loading="lazy"/>
                                    <h3>{data.title}</h3>
                                </Link>
                                date:{data.publishTime}

                                <Link to={'/channels/' + data.channelId} >{data.channelTitle}</Link>
                                </div>
                        )
                    }))
                )}
            </div>
        </div>
        
    )   



}
export default VideoPlayer