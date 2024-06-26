// modul yg dibutuhkan
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'finalscoring',
    password: '1206',
    port: 5432,
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(port, function() {
    console.log(`Server berjalan pada port: ${port}`);
})
