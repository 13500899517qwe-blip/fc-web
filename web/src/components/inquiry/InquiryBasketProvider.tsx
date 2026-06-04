'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type InquiryItem = {
  sku: string
  title: string
  quantity: number
}

type InquiryBasketContextValue = {
  items: InquiryItem[]
  addItem: (item: Omit<InquiryItem, 'quantity'>, quantity?: number) => void
  removeItem: (sku: string) => void
  clear: () => void
}

const STORAGE_KEY = 'lumadrive-inquiry-basket'

const InquiryBasketContext = createContext<InquiryBasketContextValue | null>(null)

export function InquiryBasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw) as InquiryItem[])
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: Omit<InquiryItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.sku === item.sku)
      if (existing) {
        return prev.map((p) =>
          p.sku === item.sku ? { ...p, quantity: p.quantity + quantity } : p,
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }, [])

  const removeItem = useCallback((sku: string) => {
    setItems((prev) => prev.filter((p) => p.sku !== sku))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({ items, addItem, removeItem, clear }),
    [items, addItem, removeItem, clear],
  )

  return (
    <InquiryBasketContext.Provider value={value}>{children}</InquiryBasketContext.Provider>
  )
}

export function useInquiryBasket() {
  const ctx = useContext(InquiryBasketContext)
  if (!ctx) throw new Error('useInquiryBasket must be used within InquiryBasketProvider')
  return ctx
}
