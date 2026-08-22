# GO AUDIT - ISO Audit Management System

A complete audit management system for ISO 45001, 9001, 14001, and FSSC 22000 standards.

## Features

- **Multi-Standard Audits**: ISO 45001:2018, ISO 9001:2015, ISO 14001:2015, FSSC 22000 V6.0
- **Questionnaire Builder**: Create and manage audit questionnaires
- **Evidence Collection**: Upload photos, documents, audio, and video evidence
- **CAPA Management**: Corrective and Preventive Action tracking
- **PDF Reports**: Generate detailed audit reports
- **Admin Dashboard**: User management and audit oversight
- **Mobile-First Design**: Works on all devices

## Tech Stack

- **Frontend**: React Native (Expo) - Web, iOS, Android
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Authentication**: JWT tokens

## Project Structure

```
SRD-main/
├── backend/           # FastAPI backend server
│   ├── server.py      # Main API server
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/          # Expo React Native app
│   ├── app/           # App screens and navigation
│   ├── context/       # Auth and state management
│   └── package.json
├── render.yaml        # Render deployment config
└── .github/workflows/ # CI/CD for GitHub Pages
```

## Deployment

### Frontend (GitHub Pages)
The frontend automatically deploys to GitHub Pages on push to `main`.

### Backend (Render)
1. Create a free MongoDB Atlas cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free Render account at [render.com](https://render.com)
3. Connect your GitHub repo to Render
4. Set environment variables:
   - `MONGO_URL`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string

## Default Login

- **Username**: SRD
- **Password**: 7550

## Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

### Frontend
```bash
cd frontend
yarn install
yarn web
```

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
JWT_SECRET=your-secret-key
```

### Frontend
```
EXPO_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
```
