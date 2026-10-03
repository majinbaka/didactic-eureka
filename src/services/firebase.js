import { isValidSave, migrateSave } from '../game/state'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}
export const firebaseConfigured = ['apiKey', 'authDomain', 'projectId', 'appId'].every((key) => Boolean(config[key]))
let services
async function getServices() {
  if (!firebaseConfigured) throw new Error('Chưa cấu hình Firebase. Hãy điền .env.local theo .env.example.')
  if (!services) {
    const [{ initializeApp, getApps, getApp }, { getAuth }, { getFirestore }] = await Promise.all([
      import('firebase/app'), import('firebase/auth'), import('firebase/firestore'),
    ])
    const app = getApps().length ? getApp() : initializeApp(config)
    services = { auth: getAuth(app), db: getFirestore(app) }
  }
  return services
}
async function saveDocument() {
  const { auth, db } = await getServices()
  const [{ signInAnonymously }, { doc }] = await Promise.all([import('firebase/auth'), import('firebase/firestore')])
  await auth.authStateReady()
  const user = auth.currentUser ?? (await signInAnonymously(auth)).user
  return doc(db, 'players', user.uid, 'saves', 'main')
}
export async function uploadSave(state) {
  if (!isValidSave(state)) throw new Error('Tiến độ không hợp lệ.')
  const { setDoc, serverTimestamp } = await import('firebase/firestore')
  await setDoc(await saveDocument(), { ...state, updatedAt: serverTimestamp() })
}
export async function downloadSave() {
  const { getDoc } = await import('firebase/firestore')
  const snapshot = await getDoc(await saveDocument())
  if (!snapshot.exists()) return null
  const data = snapshot.data()
  const save = data.version === 1 ? migrateSave(data) : (({ version, realm, qi, stones, herbs, journeys, hp, maxHp, attributePoints, attributes, spiritRoots, elementCultivation }) => ({ version, realm, qi, stones, herbs, journeys, hp, maxHp, attributePoints, attributes, spiritRoots, elementCultivation }))(data)
  if (!isValidSave(save)) throw new Error('Bản lưu trên mây không tương thích.')
  return save
}
