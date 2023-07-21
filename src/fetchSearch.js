const fetchSearch = async({queryKey}) => {
    const mode = queryKey[0]
    const Base_url = 'https://youtube-v31.p.rapidapi.com'
    let url;
    switch (mode){
        case ('homepage'):{    
            url = `${Base_url}/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50`;
            break;
        }
        case ('suggested_videoes'):{  
            const id = queryKey[1]  
            url = `${Base_url}/search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxResults=50`
            break;
        }
        case ('search'):{
            const query = queryKey[1]
            url = `${Base_url}/search?q=${query}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`;
            break;
        }
        case ('channelInfo'):{
            const id = queryKey[1]
            url = `${Base_url}/channels?part=snippet%2Cstatistics&id=${id}`;
            break
        }
        case('video'):{
            const id = queryKey[1]
            url = `${Base_url}/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`;
            break
        }
        case('comments'):{
            const id = queryKey[1]
            url = `${Base_url}/commentThreads?part=snippet&videoId=${id}&maxResults=100`;
            break

        }
        case('channelvideoes'):{
            const id = queryKey[1]
            console.log(id)
            url = `${Base_url}/search?channelId=${id}&part=snippet%2Cid&order=date&maxResults=50`
            break
        }
        case ('palylistInfo'):{
            const channelId = queryKey[1]
            url = `${Base_url}/search?channelId=${channelId}&part=snippet%2Cid&order=date&maxResults=50`;
            break
        }
        case('playlistItems'):{
            const id = queryKey[1]
            url = `${Base_url}/playlistItems?playlistId=${id}&part=snippet&maxResults=50`;
        }
    }
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '173ef1cd25msh2a2399880f0c157p138df8jsn7904a11f5742',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
    };

	const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('try again ,connection lost')
    }
    const json = await response.json()
    return json;
}
export default fetchSearch;
