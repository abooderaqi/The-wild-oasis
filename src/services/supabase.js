/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js"

export const supabaseUrl = "https://uvrumrnvvzwjbgduvhuy.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2cnVtcm52dnp3amJnZHV2aHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MjI4NDIsImV4cCI6MjAxODQ5ODg0Mn0.kyHPFOp9P8yvfMyeLkLyXRvNsQogcYw0ulERUHgJORg"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
