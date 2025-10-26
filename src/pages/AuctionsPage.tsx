import { useEffect, useState } from 'react';

export default function AuctionsPage() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
console.log('About to fetch /api/auctions'); // MUST appear on refresh
(async () => {
try {
const r = await fetch('/api/auctions');
console.log('Response status', r.status);
const data = await r.json();
console.log('Auctions payload', data);
} catch (e) {
console.error(e);
}
})();
}, []);

  return <div>Auctions loaded from API: {count}</div>;
}
