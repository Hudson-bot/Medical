const cors = require('cors');

app.use(cors({
  origin: 'c', // Your frontend URL
  credentials: true
}));

// ...existing code...