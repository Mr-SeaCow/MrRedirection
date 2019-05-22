let currentSong = function(callback) {
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        let obj = JSON.parse(body)
        if (obj.progress_ms) {
            return {
                songProgress: obj.progess_ms,
                songLength: obj.item.duration_ms,
                songTitle: obj.item.name,
                songAuthor: obj.item.artists
            }
        }
        /*
        console.log(obj.progress_ms);
        console.log(obj.item.duration_ms);
        console.log(obj.item.name);
        console.log(obj)
        */
    });
}
