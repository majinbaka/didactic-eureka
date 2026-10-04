import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function PwaControls() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [hint, setHint] = useState(false)
  const [registration, setRegistration] = useState(null)
  const [checking, setChecking] = useState(false)
  const [updateStatus, setUpdateStatus] = useState('')
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW: (_url, currentRegistration) => setRegistration(currentRegistration ?? null),
    onRegisterError: () => setUpdateStatus('Không thể bật kiểm tra cập nhật.'),
  })
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
  async function checkForUpdate() {
    if (needRefresh) {
      await updateServiceWorker(true)
      return
    }
    if (!registration) {
      setUpdateStatus('Chưa thể kiểm tra cập nhật trên trình duyệt này.')
      return
    }
    setChecking(true)
    setUpdateStatus('Đang kiểm tra cập nhật…')
    try {
      await registration.update()
      if (registration.waiting) {
        setNeedRefresh(true)
        setUpdateStatus('Đã tìm thấy bản mới.')
      } else {
        setUpdateStatus('Bạn đang dùng bản mới nhất.')
      }
    } catch {
      setUpdateStatus(navigator.onLine ? 'Không thể kiểm tra cập nhật. Hãy thử lại.' : 'Cần kết nối mạng để kiểm tra cập nhật.')
    } finally {
      setChecking(false)
    }
  }
  return <div className="pwa-controls">
    <button className="quiet" onClick={install}>＋ Cài game</button>
    <button disabled={checking} onClick={checkForUpdate}>{checking ? 'Đang kiểm tra…' : needRefresh ? 'Có bản mới · Cập nhật' : 'Kiểm tra cập nhật'}</button>
    {hint && <p>Mở menu trình duyệt → Cài ứng dụng / Thêm vào màn hình chính. Trên iOS: Safari → Chia sẻ.</p>}
    {offlineReady && <span className="small">Sẵn sàng chơi offline</span>}
    {updateStatus && <span className="small" role="status">{updateStatus}</span>}
  </div>
}
