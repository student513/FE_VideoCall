
function videoList(roomName) {
    var requestURL = ''; // 주소
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);

    //request.responseType = 'json';
    request.send();

    var data = request.responseText;

    var sql = 'UPDATE videoList WHERE id=' +roomName;
    //쿼리 보내기
}

function youtubeData(){
    var requestURL = ''; // 주소
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);

   
    request.send();

    var data = request.responseText;

    //쿼리 보내기
}


function get_videoList(roomName) {
    var sql = 'SELECT * FROM videoList roomName';
    sql = sql + roomName;
    conn.query(sql, function(err, rows, fields){
        if(err){
            console.log(err);
        } else{
            for(var i=0; i<rows.length)
                console.log(rows[i].name);
        }
    });

}