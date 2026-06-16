const AD_STYLES = {
  top: 'h-16 w-full',
  sidebar: 'h-64 w-full',
  'between-results': 'h-20 w-full',
}

export default function AdSlot({ position = 'top' }) {
  const isDev = import.meta.env.DEV
  const client = import.meta.env.VITE_ADSENSE_CLIENT
  const slot = position === 'top'
    ? import.meta.env.VITE_ADSENSE_SLOT_LEADERBOARD
    : import.meta.env.VITE_ADSENSE_SLOT_RECTANGLE

  if (isDev || !client || client === 'ca-pub-XXXXXXXX') {
    return (
      <div className={`my-3 flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 ${AD_STYLES[position] || 'h-16 w-full'}`}>
        [Ad Slot — {position}]
      </div>
    )
  }

  return (
    <div className="my-3" data-ad-slot={slot}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
