import { promises as fs } from "fs"
import path from "path"
import type { Order } from "@/lib/types/order"

/**
 * In-memory fallback store for environments with read-only filesystem
 * (e.g., Vercel serverless functions where only /tmp is writable).
 */
const memStore = new Map<string, Order>()

const DATA_DIR = path.join(process.cwd(), "data", "orders")

let _isReadonly: boolean | null = null

async function isReadonlyFs(): Promise<boolean> {
  // Cache the check after first call
  if (_isReadonly !== null) return _isReadonly

  try {
    await fs.access(process.cwd(), fs.constants.W_OK)
    _isReadonly = false
    return false
  } catch {
    _isReadonly = true
    return true
  }
}

async function ensureDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {
    // directory exists or FS is read-only — handled by caller
  }
}

function filePath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`)
}

export async function saveOrder(order: Order): Promise<void> {
  if (await isReadonlyFs()) {
    memStore.set(order.id, order)
    return
  }
  await ensureDir()
  await fs.writeFile(filePath(order.id), JSON.stringify(order, null, 2), "utf-8")
}

export async function getOrder(id: string): Promise<Order | null> {
  if (await isReadonlyFs()) {
    return memStore.get(id) ?? null
  }
  try {
    const data = await fs.readFile(filePath(id), "utf-8")
    return JSON.parse(data) as Order
  } catch {
    return null
  }
}

export async function updateOrder(
  id: string,
  updates: Partial<Order>,
): Promise<Order | null> {
  const order = await getOrder(id)
  if (!order) return null
  const updated = { ...order, ...updates, updatedAt: new Date().toISOString() }
  await saveOrder(updated)
  return updated
}

export async function listOrders(): Promise<Order[]> {
  if (await isReadonlyFs()) {
    const orders = Array.from(memStore.values())
    orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    return orders
  }
  await ensureDir()
  const files = await fs.readdir(DATA_DIR)
  const orders: Order[] = []
  for (const file of files) {
    if (!file.endsWith(".json")) continue
    try {
      const data = await fs.readFile(path.join(DATA_DIR, file), "utf-8")
      orders.push(JSON.parse(data))
    } catch {
      // skip malformed files
    }
  }
  orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  return orders
}
