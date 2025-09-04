const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));

// ...existing code...