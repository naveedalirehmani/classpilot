import { create } from 'zustand'
import instance from '@/services/api'
import { API_ROUTES } from '@/constants/api'

interface User {
  id: string
  email: string
  name: string
  organization?: string
  profession?: string
  schoolName?: string
  yearsOfExperience?: number
  subjectsTaught?: string
  gradeLevel?: string
  educationalQualification?: string
  teacherLicenseNumber?: string
  role: string
  subscription?: {
    type: 'FREE' | 'BASIC' | 'PREMIUM'
    isActive: boolean
    endDate: string
    dailyLimit: number
  }
}

interface UserStore {
  user: User | null
  isLoading: boolean
  error: string | null
  fetchUser: () => Promise<void>
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await instance.get(API_ROUTES.USER.GET_CURRENT_USER, {
      })
      set({ user: response.data, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch user data',
        isLoading: false 
      })
    }
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
})) 