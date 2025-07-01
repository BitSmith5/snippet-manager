#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Snippet Manager Environment Setup\n');

console.log('To get your Supabase credentials:');
console.log('1. Go to https://supabase.com');
console.log('2. Create a new project or select an existing one');
console.log('3. Go to Settings → API');
console.log('4. Copy the "Project URL" and "anon public" key\n');

rl.question('Enter your Supabase Project URL: ', (url) => {
  rl.question('Enter your Supabase anon public key: ', (key) => {
    const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${url.trim()}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${key.trim()}
`;

    const envPath = path.join(process.cwd(), '.env.local');
    
    try {
      fs.writeFileSync(envPath, envContent);
      console.log('\n✅ Environment variables saved to .env.local');
      console.log('🔄 Please restart your development server:');
      console.log('   npm run dev');
      console.log('   or');
      console.log('   pnpm dev');
    } catch (error) {
      console.error('\n❌ Error saving .env.local file:', error.message);
    }
    
    rl.close();
  });
}); 