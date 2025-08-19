import { axiosInstance as API } from './api'

const QUEUE_KEY = 'syncQueue_v1'
const MAX_ATTEMPTS = 6

function _loadQueue() {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('[syncQueue] fallo al leer queue', e)
    return []
  }
}

function _saveQueue(q) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q))
  } catch (e) {
    console.error('[syncQueue] fallo al guardar queue', e)
  }
}

async function _processItem(item) {
  if (!item || item.type !== 'delete') return { success: false }
  const { listId, productId } = item
  try {
    // Intentamos el DELETE que debería existir en backend
    const resp = await API.delete(`/users/lista/${listId}/producto/${productId}`)
    return { success: true, response: resp.data }
  } catch (err) {
    const status = err && err.response && err.response.status
    const data = err && err.response && err.response.data
    return { success: false, error: err, status, data }
  }
}

async function processQueue({ onSuccess, onFailure } = {}) {
  const q = _loadQueue()
  if (!Array.isArray(q) || q.length === 0) return { processed: 0 }
  let processed = 0
  for (let i = 0; i < q.length; i++) {
    const item = q[i]
    // Skip too many attempts
    if ((item.attempts || 0) >= MAX_ATTEMPTS) continue
    const result = await _processItem(item)
    item.attempts = (item.attempts || 0) + 1
    item.lastTriedAt = Date.now()
    if (result.success) {
      // remove item from queue
      q.splice(i, 1)
      i--
      processed++
      if (typeof onSuccess === 'function') {
        try { onSuccess(item, result) } catch (e) { console.error('[syncQueue] onSuccess callback failed', e) }
      }
    } else {
      item.lastError = { status: result.status, data: result.data }
      if (typeof onFailure === 'function') {
        try { onFailure(item, result) } catch (e) { console.error('[syncQueue] onFailure callback failed', e) }
      }
    }
  }
  _saveQueue(q)
  return { processed }
}

function enqueueRemoval(listId, productId) {
  try {
    const q = _loadQueue()
    q.push({ id: `${Date.now()}_${Math.random().toString(36).slice(2,8)}`, type: 'delete', listId: String(listId), productId: String(productId), attempts: 0, createdAt: Date.now() })
    _saveQueue(q)
    return { queued: true }
  } catch (e) {
    console.error('[syncQueue] fallo al encolar', e)
    return { queued: false, error: e }
  }
}

let _interval = null

function startSyncQueue(options = {}) {
  const { intervalMs = 30000, onSuccess, onFailure } = options
  // run immediately once
  processQueue({ onSuccess, onFailure }).catch(e => console.error('[syncQueue] processQueue initial failed', e))
  if (_interval) clearInterval(_interval)
  _interval = setInterval(() => {
    processQueue({ onSuccess, onFailure }).catch(e => console.error('[syncQueue] processQueue failed', e))
  }, intervalMs)
}

function stopSyncQueue() {
  if (_interval) clearInterval(_interval)
  _interval = null
}

export { enqueueRemoval, processQueue, startSyncQueue, stopSyncQueue }
export default { enqueueRemoval, processQueue, startSyncQueue, stopSyncQueue }
