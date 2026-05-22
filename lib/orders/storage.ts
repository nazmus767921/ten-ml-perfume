import { put, get, list } from "@vercel/blob"
import type { Order } from "@/lib/types/order"

const BLOB_PREFIX = "orders/"

function blobKey(id: string): string {
  return `${BLOB_PREFIX}${id}.json`
}

function canUseBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

async function streamToText(
  stream: ReadableStream<Uint8Array>,
): Promise<string> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let result = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    result += decoder.decode(value, { stream: true })
  }
  result += decoder.decode()
  return result
}

/** In-memory fallback for local dev when BLOB_READ_WRITE_TOKEN is not set. */
const memStore = new Map<string, Order>()

export async function saveOrder(order: Order): Promise<void> {
  if (canUseBlob()) {
    await put(blobKey(order.id), JSON.stringify(order), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    })
    return
  }
  memStore.set(order.id, order)
}

export async function getOrder(id: string): Promise<Order | null> {
  if (canUseBlob()) {
    try {
      const result = await get(blobKey(id), { access: "private" })
      if (!result || !result.stream) return null
      const text = await streamToText(result.stream)
      return JSON.parse(text) as Order
    } catch {
      return null
    }
  }
  return memStore.get(id) ?? null
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
  if (canUseBlob()) {
    try {
      const { blobs } = await list({ prefix: BLOB_PREFIX })
      const orders: Order[] = []
      for (const blobEntry of blobs) {
        try {
          const result = await get(blobEntry.pathname, { access: "private" })
          if (!result || !result.stream) continue
          const text = await streamToText(result.stream)
          orders.push(JSON.parse(text) as Order)
        } catch {
        }
      }
      orders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      return orders
    } catch {
      return []
    }
  }
  const orders = Array.from(memStore.values())
  orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  return orders
}
