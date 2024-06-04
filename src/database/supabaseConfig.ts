import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://oztyjbgppmezqtyxtzso.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dHlqYmdwcG1lenF0eXh0enNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMzM2MjAsImV4cCI6MjAzMTkwOTYyMH0.92GmMb0pGiODh34zpSoXkRz2q90ss4xl2HvkuZVRvD8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})