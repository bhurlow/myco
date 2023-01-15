const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Client } = require("pg");

const config = {
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false,
    cert: process.env.PG_CERT,
  },
};

const client = new Client(config);

client.connect((e) => {
  console.log("connection callback");
});

app.use(express.static('public'))

app.get("/data", async (req, res) => {
  try {
    console.log("got request");

    const result = await client.query("SELECT * from stats LIMIT 5;");

    console.log("rows", result.rows);

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.send("error");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
