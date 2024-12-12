const express=require('express')
// require("./config/mongoose")
const route=require("./config/routes")

const app=express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.set('view engine','ejs')


app.use(route)

let port=3100;
app.listen(port,()=>{console.log(`app is on ${port}`)})
