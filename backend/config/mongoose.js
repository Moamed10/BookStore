const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://sce88:Zahra1200@bookstore2024.6ytze.mongodb.net/?retryWrites=true&w=majority&appName=bookstore2024')
    .then( ()=>{
        console.log('DB is connected')
    })
    .catch( err =>{
        throw err
    })