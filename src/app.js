const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const server = app.listen(4000, ()=>{
  console.log('node.js port'+server.address().port);
});

app.disable('x-powersd-by')
app.use(bodyParser.json());

const sampleDate =[
  {
    id:0,
    tiitle:'sample title',
    description:'sample description',
  },
  {
    id:1,
    tiitle:'sample title 2',
    description:'sample description 2',
  },
  {
    id:2,
    tiitle:'sample title 3',
    description:'sample description 3',
  }
];

app.get('/',(req, res, next)=>{
  res.json({sampleDate});
});

app.get('/:id',(req, res, next)=>{
  const id= parseInt(req.params.id);
  const singleData=sampleDate.find((singleData)=>singleData.id===id)
  res.json(singleData);
});

app.post('/',(req, res, next)=>{
  const editData = req.body;
  console.log(editData);
  res.json(editData);
});