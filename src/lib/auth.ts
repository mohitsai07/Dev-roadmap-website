'use client';
// JWT Authentication utilities
import jwt from 'jsonwebtoken';

// Use environment variable with fallback for development
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'roadmapai-demo-secret';
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
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  
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

interface DecodedToken {
  userId: string;
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(token: string): { userId: string; email: string; name: string } | null {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    return null;
  }

  if (!token || typeof token !== 'string') {
    console.error('Invalid token format');
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    
    if (!decoded?.userId || !decoded?.email) {
      console.error('Invalid token payload');
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name || 'User'
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Storage helpers with SSR check
const isBrowser = typeof window !== 'undefined';

export function storeToken(token: string): void {
  if (isBrowser) {
    try {
      localStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }
}

export function getStoredToken(): string | null {
  if (!isBrowser) return null;
  
  try {
    return localStorage.getItem('auth_token');
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
}

export function removeStoredToken(): void {
  if (isBrowser) {
    try {
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }
}

export async function loginUser(email: string, password: string): Promise<AuthToken | null> {
  try {
    if (!email || !password) {
      console.log('Email or password missing');
      return null;
    }
    
    // Find user in mock database
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      console.log('No user found with email:', email);
      return null;
    }
    
    // In a real app, verify password here
    const token = generateToken(user);
    
    if (!token) {
      console.error('Failed to generate token');
      return null;
    }
    
    return { token, user };
    
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function signupUser(email: string, password: string, name: string): Promise<AuthToken> {
  if (!email || !name || !password) {
    throw new Error('All fields are required');
  }
  
  // Check if user already exists
  if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('User already exists');
  }
  
  try {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      createdAt: new Date(),
    };
    
    mockUsers.push(newUser);
    const token = generateToken(newUser);
    
    if (!token) {
      throw new Error('Failed to generate token');
    }
    
    return { token, user: newUser };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export async function getUserFromToken(token: string): Promise<User | null> {
  if (!token) {
    return null;
  }
  
  try {
    const decoded = verifyToken(token);
    if (!decoded) return null;
    
    return mockUsers.find(u => u.id === decoded.userId) || null;
  } catch (error) {
    console.error('Error getting user from token:', error);
    return null;
  }
}
