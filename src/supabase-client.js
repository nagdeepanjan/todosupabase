import { createClient } from "@supabase/supabase-js";

//const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
//const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient('https://mrpbiaaogdeohpqycfnf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycGJpYWFvZ2Rlb2hwcXljZm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDUyNDAsImV4cCI6MjA2ODg4MTI0MH0.YAf6xTi0Ktz6zAmHEkiutp33ic2QlvDSAwNtPkqlCCk');


export default supabase;
