function $(id) {
    return document.getElementById(`${id}`)
}

function limit(val,l){ 
    return val.slice(0,l) + '...'
}


$("search").addEventListener('click',(e)=>{

    e.preventDefault()

    const url = $('videoUrl').value.trim()

    const host = "http://localhost:5000/"

    fetch(host+`video?url=${url}`)
    .then((data)=>data.json())
    .then((data)=>{

        const title = data.videoDetails.title
        $('title').innerText = limit(title,70)
        const t = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length-1].url

        $('t').innerHTML = `<iframe width="100%" src="${data.videoDetails.embed.iframeUrl}">
        </iframe>`

        let text = data.videoDetails.description
        let result = limit(text,160)
        $('desc').innerText = result

        $('b').style.display = "block";

        const id = $('select')
        if (id) {

            $('select').remove()

            var selectList = document.createElement("select")
            selectList.id = "select"
            selectList.className = "s"
            $('qualityOption').appendChild(selectList)
    
            for (var i = 0; i < data.formats.length; i++) {
    
                var option = document.createElement("option")
    
                option.value = data.formats[i].itag
                option.text = data.formats[i].qualityLabel+" "+data.formats[i].container
                selectList.appendChild(option)
            }

        } else {

            var selectList = document.createElement("select")
            selectList.id = "select"
            selectList.className = "s"
            $('qualityOption').appendChild(selectList)
    
            for (var i = 0; i < data.formats.length; i++) {
    
                var option = document.createElement("option")
    
                option.value = data.formats[i].itag
                option.text = data.formats[i].qualityLabel+" "+data.formats[i].container
                
                selectList.appendChild(option)
            }
    
        }


        $('b').addEventListener('click',(e)=>{
            e.preventDefault()
        
            const url = $('videoUrl').value.trim()
            const itag = $('select').value
            const videoTitle = limit(title,20)

            const host = "http://localhost:5000/"
            window.open(host+'download?url='+url+"&itag="+itag+"&title="+videoTitle)
        })



    })



    
    .catch((err)=>console.log(err))


})

