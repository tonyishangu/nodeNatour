const express = require('express');
const fs = require('fs')

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello from the server', app: 'natours' });
// });

// app.post('/', (req, res) => {
//     res.send('you can post using this endpoints')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body)
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign(req.body, {id: newId})
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status:'created',
            data:{
                tour: newTour
            }
        })
    })
})

const port = 5000;
app.listen(port, () => {
  console.log(`app is runing on port ${port}...`);
});
