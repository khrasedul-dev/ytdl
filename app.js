const express = require('express')
const ytdl = require('ytdl-core')
const contentDisposition = require('content-disposition')


const app = express()


app.use(express.static('assets'))


app.get('/download',(req,res)=>{
    const {url,itag,title} = req.query
    res.setHeader('Content-Disposition', contentDisposition(`${title}.mp4`))
    ytdl(url,{
        filter: format=>format.itag == itag
    }).pipe(res)

})

app.get('/video',async (req,res)=>{

    const url = req.query.url
    const info = await ytdl.getInfo(url)
    res.json(info)

})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/view/index.html')
})


const port = process.env.PORT || 5000
app.listen(port,(err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log("Server listen on port "+port)
    }
})