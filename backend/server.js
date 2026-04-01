const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const analyseRoutes = require('./routes/analyse');
const rewriteRoutes = require('./routes/rewrite');
const exportRoutes = require('./routes/export');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = Number(process.env.PORT || 8080);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

// Keep logs useful but avoid leaking request payloads that may contain PII.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/analyse', analyseRoutes);
app.use('/rewrite', rewriteRoutes);
app.use('/export', exportRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production' || process.env.RUN_LOCAL) {
  app.listen(port, () => {
    console.log(`Resume analyser backend running on port ${port}`);
  });
}

module.exports = app;
