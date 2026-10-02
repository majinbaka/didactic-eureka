import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function PwaControls() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [hint, setHint] = useState(false)
  const { needRefresh: [needRefresh], offlineReady: [offlineReady], updateServiceWorker } = useRegisterSW()
  useEffect(() => {
    const available = (event) => { event.preventDefault(); setInstallPrompt(event) }
    const installed = () => setInstallPrompt(null)
    window.addEventListener('beforeinstallprompt', available)
    window.addEventListener('appinstalled', installed)
    return () => { window.removeEventListener('beforeinstallprompt', available); window.removeEventListener('appinstalled', installed) }
  }, [])
  async function install() {
    if (!installPrompt) { setHint(!hint); return }
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }
  return <div className="pwa-controls">
    <button className="quiet" onClick={install}>＋ Cài game</button>
    {hint && <p>Mở menu trình duyệt → Cài ứng dụng / Thêm vào màn hình chính. Trên iOS: Safari → Chia sẻ.</p>}
    {offlineReady && <span className="small">Sẵn sàng chơi offline</span>}
    {needRefresh && <button onClick={() => updateServiceWorker(true)}>Có bản mới · Tải lại</button>}
  </div>
}
