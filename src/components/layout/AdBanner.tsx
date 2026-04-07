export function AdBanner({ slot, className }: { slot: string; className?: string }) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div
      className={`relative w-full overflow-hidden flex items-center justify-center bg-[#161B22] border border-dashed border-[#30363D] rounded-xl my-8 transition-all hover:bg-[#1C2128] ${
        slot === 'top' ? 'min-h-[90px] h-[90px]' : 
        slot === 'sidebar' ? 'min-h-[250px] w-[300px]' : 
        'min-h-[120px]'
      } ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-[#8B949E] px-4 text-center">
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Advertisement</span>
        <span className="text-xs italic opacity-20">Your support helps keep this platform free for students.</span>
        {isDev && (
          <span className="bg-[#CC0000]/10 text-[#CC0000] text-[10px] px-2 py-0.5 rounded font-mono border border-[#CC0000]/30 mt-1">
            Slot: {slot}
          </span>
        )}
      </div>
      
      {/* 
        In production, place your Google AdSense code here 
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}
    </div>
  );
}
