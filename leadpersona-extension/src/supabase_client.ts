import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ynvyprhkyunjofuieolq.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludnlwcmhreXVuam9mdWllb2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4Njk2NzksImV4cCI6MjAwMDQ0NTY3OX0.YIGnNwvLEUSIOwYASJXMdOEnT2eem4bzLKMvqR4yuCs'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
