import { useEffect, useRef } from 'react';

interface AdContainerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export default function AdContainer({ slotId = 'default_slot', format = 'auto', className = '' }: AdContainerProps) {
  const adRef = useRef<HTMLInsElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
        // @ts-ignore
        if (window.adsbygoogle) {
          // @ts-ignore
          window.adsbygoogle.push({});
        }
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`ad-container flex justify-center items-center bg-slate-50 border border-slate-200 min-h-[250px] my-5 ${className}`} data-ad-status="unfilled">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-PUB-YOUR_CLIENT_ID"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
