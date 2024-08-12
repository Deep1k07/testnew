import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const apiAuthPrefix = '/api/auth'
export const PublicRoutes = ['/login' , '/register'];
export const PrivateRoutes = ['/']