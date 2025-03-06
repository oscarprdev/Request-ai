import { Pool } from 'pg';
import { config } from '@/config/environment';

const pool = new Pool({
  connectionString: config.databaseUrl,
});

const createTables = async () => {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS rules (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        priority INTEGER NOT NULL,
        "urlFilter" VARCHAR(255) NOT NULL,
        "resourceTypes" TEXT[] NOT NULL,
        "requestMethods" TEXT[] NOT NULL,
        "actionType" VARCHAR(50) NOT NULL,
        "redirectUrl" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_rules (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" UUID REFERENCES users(id) ON DELETE CASCADE,
        "ruleId" UUID REFERENCES rules(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        UNIQUE("userId", "ruleId")
      )
    `);

    console.log('Tables created successfully');
    return true;
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

export default createTables;

// If this script is run directly
if (require.main === module) {
  createTables()
    .then(() => {
      console.log('Database initialization completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}
