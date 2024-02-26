const express = require('express');
const fs = require('fs')

const app = express();

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

const port = 5000;
app.listen(port, () => {
  console.log(`app is runing on port ${port}...`);
});
