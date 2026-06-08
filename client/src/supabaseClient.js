import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kohwnseuoviegptypxyt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvaHduc2V1b3ZpZWdwdHlweHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTU4MTMsImV4cCI6MjA5NjQ3MTgxM30.ESGNeoKE30VviYqMV_2_wD9S6t3ZspdG-H3p340iqzo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
