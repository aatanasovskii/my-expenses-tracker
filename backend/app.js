const express = require('express');
const cors = require('cors');
const {db} = require('./db/db')
const {readdirSync} = require('fs')
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

/* To print 'Hello World' in the GET method from localhost:4000
app.get('/', (req, res) => {
    res.send("Hello World")
})
*/

// middlewares
app.use(express.json()) // we want our data to be in json
app.use(cors()) // you put domain and other things here, where you want your server to be accessed by

// Routes
// readdirSync - read line by line, it reads the information from a specified directory
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route))) // we would listen to http://localhost:4000/api/v1/

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to PORT: ', PORT)
    })
}


server();
