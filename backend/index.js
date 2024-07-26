const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const db=require('./config/db')
const asyncHandler=require('express-async-handler')
const cors=require('cors')



app.use(express.json())

app.use(cors())


const Data=require('./model/data')

app.get('/api/insights', async (req, res) => {
  try {
    const filters = {};

    if (req.query.end_year) filters.end_year = req.query.end_year;
    if (req.query.topic) filters.topic = req.query.topic;
    if (req.query.sector) filters.sector = req.query.sector;
    if (req.query.region) filters.region = req.query.region;
    if(req.query.source) filters.source=req.query.source

    const insights = await Data.find(filters);
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/filters', async (req, res) => {
  try {
    const end_years = await Data.distinct('end_year');
    const topics = await Data.distinct('topic');
    const sectors = await Data.distinct('sector');
    const regions = await Data.distinct('region');
    const source=await Data.distinct('source')


    res.json({ end_years, topics, sectors, regions ,source});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const port=process.env.PORT||7000
app.listen(port,function(err){
    if(err){console.log(`Error in running server at PORT:${port}`)}
    console.log(`Server is running at PORT : ${port}`)
})