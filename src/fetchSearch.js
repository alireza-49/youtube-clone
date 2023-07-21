const fetchSearch = async({queryKey}) => {
    const query = queryKey[1]
    const url = `https://youtube-v31.p.rapidapi.com/search?q=${query}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '918b133867msh406627930bef70dp168546jsna2182432c202',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
    };
    if (!query) {
        throw new Error('no query provided')
    }

	const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('try again ,connection lost')
    }
    const json = await response.json()
    return json;
}
export default fetchSearch;
