const express = require('express');
const cors = require('cors');
const app = express();
const dtpoeRoutes = require('./routes/routes');

// Other middleware and configurations...

app.use(cors({ origin: '*' }));
app.use(express.json());
// Use dtpoeRoutes for the '/api' endpoint
app.use('/api', dtpoeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
