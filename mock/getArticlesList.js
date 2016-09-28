import Mock from 'mockjs'

export default ()=> Mock.mock({
    "status": "0",
    "tag":"",
    "result": {
        "count|80-120": 80,
        "list|20": [{
            "id|+1": 1,
            "title": "@csentence",
            "thumb": "@image('180x100')",
            "summary": "@cparagraph(1, 3)",
            "gmtCreate": 1449139208000,
            "gmtUpdate": 1449139208000,
            "operator": 3,
            "text": "@cparagraph(3, 10)",
            "pv|0-88": 6,
            "status": 0,
            "tag|1": ['', 0, 1, 2]
        }]
    }
})
