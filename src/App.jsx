import { useState } from 'react'
import CultivationApp from './CultivationApp'
import RunnerDemo from './components/RunnerDemo'
export default function App() {
  const [demo, setDemo] = useState(true)
  return demo ? <RunnerDemo onBack={() => setDemo(false)} /> : <><button className="return-demo" onClick={() => setDemo(true)}>← Bản mẫu đi ngang</button><CultivationApp /></>
}
