// useAuth.js

import { useEffect } from 'react';

export default function useAuth() {
  useEffect(() => {
    // Check if token exists in session storage or local storage
    const token = sessionStorage.getItem('user'); // or localStorage.getItem('token');
    
    // Redirect to login page if token doesn't exist
    if (!token) {
      window.location.href = '/'; // replace with your login page URL
    }
  }, []);
}
