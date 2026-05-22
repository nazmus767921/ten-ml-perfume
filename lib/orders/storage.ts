import { promises as fs } from "fs"
import path from "path"
import type { Order } from "@/lib/types/order"

const DATA_DIR = path.join(process.cwd(), "data", "orders")

async function ensureDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {
    // directory exists
  }
}

function filePath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`)
}

export async function saveOrder(order: Order): Promise<void> {
  await ensureDir()
  await fs.writeFile(filePath(order.id), JSON.stringify(order, null, 2), "utf-8")
}

export async function getOrder(id: string): Promise<Order | null> {
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
