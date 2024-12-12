// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var cors = require('cors');

// enable CORS so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 }));

// static files
app.use(express.static('public'));

// home route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  if (!isNaN(dateParam)) {
    dateParam = parseInt(dateParam, 10);
  }

  const date = new Date(dateParam);

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// start server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
