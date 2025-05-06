const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const api = require("./utils/api");
dotenv.config();
const app = express();

let fakeRedis = {}

app.get("/", (req, res) =>  res.send({
    "code":200,
    "data":"pong"
})
);

app.get("/rates/fixed.xml", async (req, res) => {
    return res.send(fakeRedis)
});

app.get("/api/v2/create", async (req, res) => {
    try{
        return res.send(
            await api.anyRequestsRaw(
                {
                    'method': 'POST',
                    'url': "https://ff.io/api/v2/create",
                    'headers': {
                      'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                      'Content-Type': 'application/json',
                      'X-API-KEY':req.header['X-API-SIGN'],
                      'X-API-SIGN':req.header['X-API-SIGN']
                    },
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

app.get("/api/v2/order", async (req, res) => {
    try{
        return res.send(
            await api.anyRequestsRaw(
                {
                    'method': 'POST',
                    'url': "https://ff.io/api/v2/order",
                    'headers': {
                      'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                      'Content-Type': 'application/json',
                      'X-API-KEY':req.header['X-API-SIGN'],
                      'X-API-SIGN':req.header['X-API-SIGN']
                    },
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