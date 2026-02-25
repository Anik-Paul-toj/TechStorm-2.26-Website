# 🔗 Frontend-Backend Integration Guide

## For the Frontend Developer

After you deploy the backend to Vercel, share this information with your frontend team.

---

## 📍 Backend API Information

**Production Backend URL**: `https://your-backend-name.vercel.app`

Replace this in your frontend configuration file.

---

## 🔧 Frontend Configuration

### Option 1: Create/Update `src/config/api.js`

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-name.vercel.app';

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  GET_USER: `${API_BASE_URL}/api/auth/me`,
  
  // Event endpoints
  GET_EVENTS: `${API_BASE_URL}/api/events`,
  GET_EVENT_BY_ID: (id) => `${API_BASE_URL}/api/events/${id}`,
  CREATE_EVENT: `${API_BASE_URL}/api/events`,
  UPDATE_EVENT: (id) => `${API_BASE_URL}/api/events/${id}`,
  DELETE_EVENT: (id) => `${API_BASE_URL}/api/events/${id}`,
  
  // Registration endpoints
  REGISTER_EVENT: `${API_BASE_URL}/api/event-registration`,
  GET_USER_REGISTRATIONS: (userId) => `${API_BASE_URL}/api/event-registration/user/${userId}`,
  GET_EVENT_REGISTRATIONS: (eventId) => `${API_BASE_URL}/api/event-registration/event/${eventId}`,
  
  // Admin endpoints
  ADMIN_DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_REGISTRATIONS: `${API_BASE_URL}/api/admin/registrations`,
};

export default API_BASE_URL;
```

### Option 2: Environment Variable (Recommended)

Create `.env` file in frontend root:

```env
REACT_APP_API_URL=https://your-backend-name.vercel.app
```

For production deployment, add this in Vercel:
1. Go to Vercel project settings
2. Environment Variables
3. Add: `REACT_APP_API_URL` = `https://your-backend-name.vercel.app`

---

## 📡 Example API Calls

### Register User

```javascript
const registerUser = async (userData) => {
  const response = await fetch('https://your-backend-name.vercel.app/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  return data;
};
```

### Login User

```javascript
const loginUser = async (email, password) => {
  const response = await fetch('https://your-backend-name.vercel.app/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  // Store token
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  
  return data;
};
```

### Get Events

```javascript
const getEvents = async () => {
  const response = await fetch('https://your-backend-name.vercel.app/api/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  return data;
};
```

### Register for Event (with Auth)

```javascript
const registerForEvent = async (eventData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('https://your-backend-name.vercel.app/api/event-registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  
  const data = await response.json();
  return data;
};
```

---

## 🔐 Authentication Flow

1. **User Registration**
   ```
   POST /api/auth/register
   Body: { name, email, password, phone, college }
   Response: { success, message, user }
   ```

2. **User Login**
   ```
   POST /api/auth/login
   Body: { email, password }
   Response: { success, token, user }
   ```

3. **Use Token for Protected Routes**
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

---

## 🌐 CORS Configuration

The backend is configured to accept requests from:
- Your frontend domain (once you provide it)
- `https://techstorm.bppimt.ac.in`

**Important**: After deploying frontend, update backend environment variables:

1. Go to Vercel backend project
2. Settings → Environment Variables
3. Update `CORS_ORIGINS` to include your frontend URL
4. Update `FRONTEND_URL` to your frontend URL
5. Redeploy

---

## 📋 Complete API Reference

### Authentication APIs

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | User login |
| GET | `/api/auth/me` | Yes | Get current user |

### Event APIs

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/events` | No | Get all events |
| GET | `/api/events/:id` | No | Get event by ID |
| POST | `/api/events` | Yes (Admin) | Create event |
| PUT | `/api/events/:id` | Yes (Admin) | Update event |
| DELETE | `/api/events/:id` | Yes (Admin) | Delete event |

### Event Registration APIs

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/event-registration` | Yes | Register for event |
| GET | `/api/event-registration/user/:userId` | Yes | Get user's registrations |
| GET | `/api/event-registration/event/:eventId` | Yes | Get event's registrations |

### Admin APIs

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/admin/dashboard` | Yes (Admin) | Dashboard statistics |
| GET | `/api/admin/users` | Yes (Admin) | Get all users |
| GET | `/api/admin/registrations` | Yes (Admin) | Get all registrations |

---

## 🧪 Testing the Backend

### Health Check

```bash
curl https://your-backend-name.vercel.app/
```

Expected Response:
```json
{
  "message": "TechStorm API is running",
  "version": "1.0.0",
  "status": "healthy"
}
```

### Test Registration

```bash
curl -X POST https://your-backend-name.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890",
    "college": "Test College"
  }'
```

---

## 🚨 Common Issues & Solutions

### Issue: CORS Error
**Solution**: 
- Ensure backend has your frontend URL in `CORS_ORIGINS`
- Check if requests include proper headers
- Verify you're using HTTPS (not HTTP)

### Issue: 401 Unauthorized
**Solution**:
- Check if token is being sent in headers
- Verify token format: `Bearer ${token}`
- Check if token hasn't expired

### Issue: 500 Server Error
**Solution**:
- Check Vercel logs for backend
- Verify MongoDB connection
- Check environment variables

---

## 📞 Contact Backend Team

If you need:
- API changes
- New endpoints
- Help with integration
- Environment variable updates

Contact the backend developer at: [your-email@example.com]

---

## 🔄 Keeping APIs in Sync

After backend updates:
1. Backend team will notify you
2. Update your API calls if needed
3. Test the changes
4. Deploy frontend

---

**✅ You're all set! Start integrating the backend APIs into your frontend.**
