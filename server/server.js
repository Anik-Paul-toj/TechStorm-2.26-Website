const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const eventRegistrationRoutes = require('./routes/eventRegistration');
const adminRoutes = require('./routes/admin');
const adminAuthRoutes = require('./routes/adminAuth');
const adminProtectedRoutes = require('./routes/adminRoutes');
const adminDashboardRoutes = require('./routes/adminDashboard');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable compression EARLY (before other middleware)
app.use(compression({
  level: 6, // Compression level 0-9
  threshold: 1024, // Only compress if response > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

const normalizeOrigin = (value = '') => value.trim().replace(/\/+$/, '');
const allowedOrigins = (
  process.env.CORS_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:3000'
)
  .split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

console.log('🔧 CORS Configuration:');
console.log('📝 CORS_ORIGINS env:', process.env.CORS_ORIGINS);
console.log('📝 FRONTEND_URL env:', process.env.FRONTEND_URL);
console.log('✅ Allowed origins:', allowedOrigins);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = normalizeOrigin(origin);

    // In production, allow all origins from bppimt.ac.in domain
    if (normalizedOrigin.includes('bppimt.ac.in') || normalizedOrigin.includes('techstorm')) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    // In development, be more permissive
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    console.log(`❌ CORS blocked for origin: ${origin}`);
    console.log(`✅ Allowed origins: ${allowedOrigins.join(', ')}`);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(logger);

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);


// Connect to MongoDB with optimized settings
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  compressors: ['zlib'],
  zlibCompressionLevel: 6,
})
  .then(() => {
    console.log('✅ Connected to MongoDB with optimized pool');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Monitor MongoDB connection
mongoose.connection.on('error', err => {
  console.error('❌ MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// Optimized health check endpoint with caching
const { getCacheStats } = require('./middleware/cache');
let healthCache = {
  status: 'OK',
  lastCheck: Date.now(),
  dbStatus: 'unknown'
};

app.get('/api/health', (req, res) => {
  const now = Date.now();
  
  // Only check DB every 30 seconds
  if (now - healthCache.lastCheck > 30000) {
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : 
                     dbState === 2 ? 'connecting' : 
                     dbState === 0 ? 'disconnected' : 'unknown';
    
    healthCache = {
      status: dbState === 1 ? 'OK' : 'ERROR',
      database: dbStatus,
      uptime: Math.floor(process.uptime()),
      memory: {
        used: Math.floor(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.floor(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      },
      cache: getCacheStats(),
      timestamp: new Date().toISOString(),
      lastCheck: now
    };
  }
  
  res.status(healthCache.status === 'OK' ? 200 : 500).json(healthCache);
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-registration', eventRegistrationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin-auth', adminAuthRoutes);
app.use('/api/admin-panel', adminProtectedRoutes);
app.use('/api/admin-dashboard', adminDashboardRoutes);

console.log('✅ All routes registered successfully');

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Allowed CORS origins: ${allowedOrigins.join(", ")}`);
});

module.exports = app;

