import { neon } from '@neondatabase/serverless';

// Export a function or a lazy-loaded client to avoid throwing errors during build static analysis
const getSql = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn('DATABASE_URL is missing. Database features will be disabled.');
    // Tagged template literal mock
    const mockSql = ((strings: any, ...values: any[]) => Promise.resolve([])) as any;
    return mockSql;
  }
  return neon(url);
};

export const sql = getSql();
