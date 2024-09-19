import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

export const supabase = createClient(Constants.expoConfig.extra.EXPO_PUBLIC_SUPABASE_URL, Constants.expoConfig.extra.EXPO_PUBLIC_SUPABASE_API_KEY)