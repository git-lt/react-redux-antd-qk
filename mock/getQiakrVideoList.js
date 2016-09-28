import Mock from 'mockjs'

export default ()=> Mock.mock({
    "result": {
        "count|80-120": 80,
        "list|20": [{
            "id|+1": 1,
            "videoPic": "http://static.qiakr.com/FpZb9tYcygsWn7VOAYpzIao1mIUR",
            "videoUrl": "http://static.qiakr.com/movie/00600.mp4",
            "title": "@csentence",
            "summary": "@cparagraph(1, 3)",
            "courseTag": "",
            "teacher": "@cname",
            "duringTime|8-30": 8,
            "supplierLevel": '@pick(["新入驻商家", "基础商家", "VIP商家"])',
            "courseFee": null,
            "gmtCreate": 1455614704000,
            "gmtUpdate": 1462593500000,
            "courseDescription": "@cparagraph(3, 10)",
            "type|1-3": 2,
            "status": 2,
            "sort": 0
        }]
    },
    "status": "0",
    "errmsg": "success",
    "type": 1
})
