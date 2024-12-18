import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth0 JWT validation middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'RS256',
});

// Public route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Node.js TypeScript API!');
});

// Protected route
app.get('/api/protected', checkJwt, (req: Request, res: Response) => {
  res.json({
    message: 'You have successfully accessed a protected route!',
    user: req.auth, // Authenticated user details
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
