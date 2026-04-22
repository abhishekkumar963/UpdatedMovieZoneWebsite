# Simple Deployment Guide

## Environment Variables (Required for BOTH platforms)
Add this in your deployment platform's environment settings:
```
REACT_APP_TMDB_API_KEY = your_tmdb_api_key_here
```

## Vercel Deployment
1. Go to vercel.com
2. Import your GitHub repository
3. Go to Project Settings > Environment Variables
4. Add: REACT_APP_TMDB_API_KEY
5. Deploy

## Netlify Deployment
1. Go to netlify.com
2. Import your GitHub repository
3. Go to Site settings > Environment variables
4. Add: REACT_APP_TMDB_API_KEY
5. Deploy

## Get TMDB API Key
1. Go to https://www.themoviedb.org/settings/api
2. Request API key (free)
3. Copy the key and use it above

## Important Notes
- NO configuration files needed - clean setup
- Environment variable MUST be set in platform dashboard
- Build command: npm run build (automatic)
- Publish directory: build (automatic)
