const express = require('express');
const path = require('path');
const router = require('./router');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

router(app);

// Production environment configuration
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, function() {
    console.log('Listening on port: ', port);
})