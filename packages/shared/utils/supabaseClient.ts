import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://khfbbenxfpmneregtaud.supabase.com",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZmJiZW54ZnBtbmVyZWd0YXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODExNTIsImV4cCI6MjA2MTI1NzE1Mn0.hrzTfXWjZqW1HYjyT5TjSiVgNEfIyK8QJs35K9ZiWBI",
);