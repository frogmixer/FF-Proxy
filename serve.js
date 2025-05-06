const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const api = require("./utils/api");
dotenv.config();
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
let fakeRedis = {}

app.get("/", (req, res) =>  res.send({
    "code":200,
    "data":"pong"
})
);

app.get("/rates/fixed.xml", async (req, res) => {
    return res.send(fakeRedis)
});

app.post("/api/v2/create", async (req, res) => {
    try{
        return res.send(
            await api.anyRequestsRaw(
                {
                    'method': 'POST',
                    'url': "https://ff.io/api/v2/create",
                    'headers': {
                      'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                      'Content-Type': 'application/json',
                      'X-API-KEY':req.headers['x-api-key'],
                      'X-API-SIGN':req.headers['x-api-sign']
                    },
                    'body':JSON.stringify(req.body)
                }
            ) 
        )
    }catch(e)
    {
        return res.send({
            "code":500,
            "data":"proxy failed"
        })
    }
});

app.post("/api/v2/order", async (req, res) => {
    try{
        return res.send(
            await api.anyRequestsRaw(
                {
                    'method': 'POST',
                    'url': "https://ff.io/api/v2/order",
                    'headers': {
                      'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                      'Content-Type': 'application/json',
                      'X-API-KEY':req.headers['x-api-key'],
                      'X-API-SIGN':req.headers['x-api-sign']
                    },
                    'body':JSON.stringify(req.body)
                }
            ) 
        )
    }catch(e)
    {
        return res.send({
            "code":500,
            "data":"proxy failed"
        })
    }

});

app.listen(50005, () => console.log("Server ready on port 50005."));

const sleep = async(ms)=>
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
const init = async()=>
{
    while(true)
    {
        fakeRedis = await api.anyRequestsRaw(
            {
                'method': 'GET',
                'url': "https://ff.io/rates/fixed.xml",
                'headers': {
                  'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                  'Content-Type': 'application/json'
                },
            }
        )
        await sleep(60000)
    }
}

init();
module.exports = app;