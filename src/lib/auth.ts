'use client';
// JWT Authentication utilities
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'roadmapai-demo-secret';
const JWT_EXPIRES_IN = '7d';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface AuthToken {
  token: string;
  user: User;
}

// Mock user database (in real app, this would be a database)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'demo@roadmapai.com',
    name: 'Demo User',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    createdAt: new Date('2024-01-02'),
  }
];

// Log mock users on module load
console.log('Initial mock users:', mockUsers);

// Generate JWT token
export function generateToken(user: User): string {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email,
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// JWT payload type
type JwtPayload = {
  userId: string;
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
};

// Verify JWT token
export function verifyToken(token: string): { userId: string; email: string; name: string } | null {
  console.log('Verifying token:', { token, type: typeof token });
  
  if (!token || typeof token !== 'string') {
    console.error('Invalid token format - token is not a string');
    return null;
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // Type guard to check if the decoded object has the required properties
    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded) || !('email' in decoded)) {
      console.error('Invalid token payload structure:', decoded);
      return null;
    }
    
    // Ensure required fields are present and of correct type
    if (typeof decoded.userId !== 'string' || typeof decoded.email !== 'string') {
      console.error('Invalid token field types:', decoded);
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name || 'User'
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Token verification failed:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    } else {
      console.error('Unknown error during token verification:', error);
    }
    return null;
  }
}

// Mock authentication functions
export async function loginUser(email: string, password: string): Promise<AuthToken | null> {
  try {
    console.log('=== LOGIN ATTEMPT STARTED ===');
    console.log('Email:', email);
    
    // 1. Check if email and password are provided
    if (!email || !password) {
      console.log('Email or password missing');
      return null;
    }
    
    // 2. Hardcoded check for demo accounts
    let user: User | undefined;
    
    if (email.toLowerCase() === 'test@example.com') {
      user = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        createdAt: new Date('2024-01-01'),
      };
    } else if (email.toLowerCase() === 'demo@roadmapai.com') {
      user = {
        id: '2',
        email: 'demo@roadmapai.com',
        name: 'Demo User',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        createdAt: new Date('2024-01-02'),
      };
    }
    
    console.log('User found?:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('No user found with email:', email);
      return null;
    }
    
    // 3. Generate token
    console.log('Generating token for user:', user.id);
    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    if (!token) {
      console.error('Failed to generate token');
      return null;
    }
    
    console.log('Token generated successfully');
    console.log('=== LOGIN SUCCESSFUL ===');
    
    return { token, user };
    
  } catch (error) {
    console.error('!!! LOGIN ERROR !!!');
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
}

export async function signupUser(email: string, password: string, name: string): Promise<AuthToken | null> {
  console.log('signupUser called with:', { 
    email, 
    name, 
    password: password ? '***' : 'empty' 
  });
  
  // Validate inputs
  if (!email || !name || !password) {
    console.error('Missing required fields');
    throw new Error('All fields are required');
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Checking for existing user with email:', email);
  const existingUser = mockUsers.find(u => u.email === email);
  
  if (existingUser) {
    console.log('User already exists:', existingUser.id);
    throw new Error('User already exists');
  }
  
  try {
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      createdAt: new Date(),
    };
    
    console.log('Created new user:', newUser);
    
    // Add the new user to the mock users array
    mockUsers.push(newUser);
    console.log('Added user to mock database. Total users:', mockUsers.length);
    
    console.log('Generating token for new user...');
    const token = generateToken(newUser);
    console.log('Generated token:', token ? `${token.substring(0, 10)}...` : 'null');
    
    if (!token) {
      throw new Error('Failed to generate token');
    }
    
    return { token, user: newUser };
  } catch (error) {
    console.error('Error in signupUser:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : '',
      error: error
    });
    throw error; // Re-throw to be handled by the caller
  }
}

export async function getUserFromToken(token: string): Promise<User | null> {
  console.log('getUserFromToken called with token:', token ? `${token.substring(0, 10)}...` : 'null');
  
  if (!token) {
    console.log('No token provided');
    return null;
  }
  
  try {
    console.log('Calling verifyToken...');
    const decoded = verifyToken(token);
    console.log('verifyToken result:', decoded);
    
    if (!decoded || !decoded.userId) {
      console.error('Invalid or missing userId in decoded token');
      return null;
    }
    
    console.log('Looking for user with ID:', decoded.userId);
    const user = mockUsers.find(u => u.id === decoded.userId);
    console.log('Found user:', user);
    
    if (!user) {
      console.error('User not found in mock database');
    }
    
    return user || null;
  } catch (error) {
    console.error('Error in getUserFromToken:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      error: error
    });
    return null;
  }
}

// Token storage helpers
export function storeToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

export function getStoredToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

export function removeStoredToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}