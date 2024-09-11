const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cors = require('cors')

const app = express()
app.use(cors())

//Define Path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath =path.join(__dirname,'../template/partials')

//Send handlebars engine and views location
app.set('view engine','hbs') //configurer express pou utiliser le hbs hbs est utilisé pour créer des modeles dynamiques.Le dossier views contient nos modèles de guidons
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('',(req,resp) => {
//     resp.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name : 'Andrew',
//         age: 27
//     })
// })


// app.get('/about',(req,res)=>{
//     res.send('<h1>Welcome to the about</h1>')
// })

app.get('',(req,res)=>{
    res.render('index',{
        title :'Weather',
        name:'Robert Carry'
    })
})

app.get('/about',(req,res)=>{//ici
    res.render('about',{
       title : 'About me',
       name : 'Andrew mead'
    })  
})

app.get('/help',(req,res)=>{
    res.render('help',{
        contact:'233333',
        helpText:'This is some helpful text',
        title:'Help',
        name:'Andrew Mead'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
        error :'You must provide an address'
    })
}

    geocode (req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error: error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        })
    // res.send({
    //     forecast: 'It is snowing',
    //     location:'Philadelphia',
    //     address:req.query.address
    //})
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Andrew Mead',
        errorMessage:'Help article not found.'

    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name :'Andrew Mead',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})