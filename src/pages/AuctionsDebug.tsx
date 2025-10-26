import { useEffect, useState } from 'react';

type PageResponse<T> = {
  content: T[];
  totalElements: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  empty: boolean;
};

type AuctionResponse = {
  id: number;
  title: string;
  // add fields you return from backend as needed
};

export default function AuctionsDebug() {
  const [listCount, setListCount] = useState<number>(0);
  const [featuredCount, setFeaturedCount] = useState<number>(0);
  const [trendingCount, setTrendingCount] = useState<number>(0);
  const [one, setOne] = useState<AuctionResponse | null>(null);
  const [log, setLog] = useState<string>('');

  const appendLog = (msg: string) =>
    setLog(prev => prev + (prev ? '\n' : '') + msg);

  useEffect(() => {
    (async () => {
      try {
        // 1) list
        let r = await fetch('/api/auctions');
        appendLog(`GET /api/auctions -> ${r.status}`);
        let data: PageResponse<AuctionResponse> = await r.json();
        setListCount(data.totalElements ?? data.content?.length ?? 0);

        // 2) featured
        r = await fetch('/api/auctions/featured');
        appendLog(`GET /api/auctions/featured -> ${r.status}`);
        let featured: PageResponse<AuctionResponse> = await r.json();
        setFeaturedCount(featured.totalElements ?? featured.content?.length ?? 0);

        // 3) trending
        r = await fetch('/api/auctions/trending');
        appendLog(`GET /api/auctions/trending -> ${r.status}`);
        let trending: PageResponse<AuctionResponse> = await r.json();
        setTrendingCount(trending.totalElements ?? trending.content?.length ?? 0);

        // 4) detail (only if there is at least one item)
        const firstId = data.content?.[0]?.id;
        if (firstId) {
          r = await fetch(`/api/auctions/${firstId}`);
          appendLog(`GET /api/auctions/${firstId} -> ${r.status}`);
          setOne(await r.json());
        } else {
          appendLog('No items to fetch by id.');
        }
      } catch (e: any) {
        appendLog(`Error: ${e?.message ?? String(e)}`);
        console.error(e);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 16, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      <div>List count: {listCount}</div>
      <div>Featured count: {featuredCount}</div>
      <div>Trending count: {trendingCount}</div>
      <div>One item: {one ? JSON.stringify(one) : 'null'}</div>
      <hr />
      <div>{log}</div>
    </div>
  );
}
