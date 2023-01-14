const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Client } = require("pg");
const client = new Client();

client.connect(process.env.PG_URL);

app.get("/", async (req, res) => {
  try {
    console.log("ENV", process.env);

    const res = await client.query("SELECT $1::text as message", [
      "Hello world!",
    ]);

    res.end(JSON.stringify(res.rows));
  } catch (e) {
    res.send(e.toString());
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
