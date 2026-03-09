import { jwtDecode } from "jwt-decode";

export function getAuthToken(): string | null {
  return (
    sessionStorage.getItem("authToken") ?? localStorage.getItem("authToken")
  );
}

export function clearAuthToken(): void {
  sessionStorage.removeItem("authToken");
  localStorage.removeItem("authToken");
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token || token.trim().length === 0) {
    return false;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded?.exp) {
      clearAuthToken();
      return false;
    }

    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (decoded.exp <= nowInSeconds) {
      clearAuthToken();
      return false;
    }

    return true;
  } catch {
    clearAuthToken();
    return false;
  }
}

interface DecodedToken {
  id: number | string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export function getUser(): DecodedToken | null {
  const token = getAuthToken();
  if (!token) {
    return null;
  }
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch {
    return null;
  }
}

export function sanitizeCredentialInput(value: string, maxLength: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}
