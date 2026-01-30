#!/usr/bin/env node
// Node script to test rate limiter and print RateLimit headers
// Usage: node scripts/test_rate_limit.js [URL] [API_KEY] [COUNT] [DELAY_MS]
const [,, url = 'http://localhost:8003/api/v1/wilayah/provinsi', apiKey = '', countArg = '120', delayArg = '100'] = process.argv;
const count = parseInt(countArg, 10) || 120;
const delay = parseInt(delayArg, 10) || 100;

async function wait(ms){ return new Promise(r => setTimeout(r, ms)); }

async function run(){
  if (!global.fetch) {
    try {
      global.fetch = (await import('node-fetch')).default;
    } catch (e) {
      console.error('Please run on Node 18+ or install node-fetch');
      process.exit(1);
    }
  }

  console.log('Testing', url, 'count', count, 'delay(ms)', delay, apiKey? 'using API key': 'no API key');
  for (let i = 1; i <= count; i++){
    const headers = apiKey ? { 'x-palindo-api-key': apiKey } : {};
    try{
      const res = await fetch(url, { headers });
      const rlLimit = res.headers.get('ratelimit-limit') || res.headers.get('RateLimit-Limit');
      const rlRem = res.headers.get('ratelimit-remaining') || res.headers.get('RateLimit-Remaining');
      const rlReset = res.headers.get('ratelimit-reset') || res.headers.get('RateLimit-Reset');
      console.log(`${i} -> ${res.status} Remain:${rlRem || 'n/a'} Limit:${rlLimit || 'n/a'} Reset:${rlReset || 'n/a'}`);
      if (res.status === 429){
        console.log('==> Received 429 Too Many Requests at attempt', i);
        process.exit(0);
      }
    }catch(err){
      console.error(i, 'error', err.message);
    }
    await wait(delay);
  }
  console.log('Done. No 429 observed in', count, 'requests.');
}

run();
