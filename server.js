const express = require('express');
const app = express();

const eventNames = ['Angular Connect', 'ng-conf 2025'];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/check-coupon', (req, res) => {
  const eventName = req.query.eventName;

  if (eventName && eventNames.includes(eventName)) {
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
  }
});

const PORT = 3000;

app.listen(PORT, 'localhost', () => console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`));
