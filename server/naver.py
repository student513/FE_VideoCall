import json
import urllib
import pymysql



def videoList():
    url = '주소를 쓰거라'
    jsonData = urllib.urlopen(url)
    data = json.loads(jsonData)
    videoId = data["videoId"]
    videoTitle = data["title"]
    videoId = data["id"]

def messages():
    url = ''
    jsonData = urllib.urlopen(url)
    data = json.loads(jsonData)


def youtube():
    url = ''
    jsonData = urllib.urlopen(url)
    data = json.loads(jsonData)
    videoStop = data["videoStop"]
    videoEnd = data["videoEnd"]
    videoSec = data["Number"]

sql = "SELECT * FROM 'naver-db'"
cursor.execute(sql)
result = cursor.fetchall()
