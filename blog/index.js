import axios from "axios"

export const getAllData = async()=>{
    const urls = []
    const response = await axios.get("https://www.googleapis.com/blogger/v3/blogs/6035337752081805288/posts?key=AIzaSyCUbCHfwnO1P8oRvK1iHASDBaByyvPuEmE")  
    response.data.items.forEach((i)=> urls.push({url: i.url, title: i.title}))
    return urls
}