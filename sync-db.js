// sync-db.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read env variables
const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase config not found in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Load new mockDb data
const mockDb = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/lib/mockDb.json'), 'utf8'));

async function syncTable(tableName, items) {
  console.log(`Syncing table: ${tableName} (${items.length} items)...`);
  
  // 1. Delete all existing items (we match all items by checking if id is not null or greater than 0)
  const { error: deleteError } = await supabase
    .from(tableName)
    .delete()
    .neq('id', 0); // Delete all where id is not 0

  if (deleteError) {
    console.error(`Error deleting from ${tableName}:`, deleteError.message);
    return;
  }
  
  // 2. Insert new items
  // Strip ids to let database auto-generate or use the specific ids
  // Usually, keeping specific ids is good for order. Supabase allows inserting explicit ids.
  const { error: insertError } = await supabase
    .from(tableName)
    .insert(items);

  if (insertError) {
    console.error(`Error inserting into ${tableName}:`, insertError.message);
  } else {
    console.log(`Successfully synced ${tableName}!`);
  }
}

async function run() {
  await syncTable('projects', mockDb.projects);
  await syncTable('experiences', mockDb.experiences);
  await syncTable('skills', mockDb.skills);
  console.log("All tables synced successfully!");
}

run().catch(console.error);
