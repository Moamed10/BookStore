const mongoose=require('mongoose')

mongoose.connect(process.env.DB_LINK)
    .then( ()=>{
        console.log('DB is connected')
    })
    .catch( err =>{
        throw err
    })