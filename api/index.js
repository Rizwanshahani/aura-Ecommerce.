// Vercel Serverless Function entry point
// This re-exports the Express app so Vercel can run it as a serverless function
import app from '../backend/server.js';

export default app;
