import fs from 'node:fs'
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { createInitialState } from '../../src/game/state.js'
const env = await initializeTestEnvironment({projectId:'demo-xianxia',firestore:{host:'127.0.0.1',port:Number(process.env.FIRESTORE_EMULATOR_HOST?.split(':')[1] || 8080),rules:fs.readFileSync(new URL('../../firestore.rules', import.meta.url),'utf8')}})
try {
 const ref = ctx => doc(ctx.firestore(),'players/alice/saves/main')
 const save = {...createInitialState(()=>0),updatedAt:serverTimestamp()}
 await assertSucceeds(setDoc(ref(env.authenticatedContext('alice')),save))
 await assertSucceeds(getDoc(ref(env.authenticatedContext('alice'))))
 await assertFails(getDoc(ref(env.unauthenticatedContext())))
 await assertFails(setDoc(ref(env.unauthenticatedContext()),save))
 await assertFails(getDoc(ref(env.authenticatedContext('bob'))))
 await assertFails(setDoc(ref(env.authenticatedContext('bob')),save))
 await assertFails(setDoc(ref(env.authenticatedContext('alice')),{...save,updatedAt:new Date(0)}))
 await assertFails(setDoc(ref(env.authenticatedContext('alice')),{...save,cultivation:{...save.cultivation,toxicity:101}}))
 await assertFails(setDoc(ref(env.authenticatedContext('alice')),{...save,cultivation:{...save.cultivation,wave:3,total:0}}))
 await assertFails(setDoc(ref(env.authenticatedContext('alice')),{...save,version:2}))
 console.log('PASS Firebase: owner/read/write, anonymous/other UID denied, timestamp and malformed schema denied')
} finally { await env.cleanup() }
