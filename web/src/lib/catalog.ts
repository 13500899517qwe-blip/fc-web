/** Vehicle brands aligned with Alibaba store navigation */
export const vehicleBrands = [
  'Toyota',
  'Jeep',
  'Hyundai',
  'Nissan',
  'Isuzu',
  'Mercedes-Benz',
  'Honda',
  'BMW',
  'Ford',
  'Mitsubishi',
] as const

export type VehicleBrand = (typeof vehicleBrands)[number]

export type CategoryNode = {
  id: number
  title: string
  slug: string
  level: '1' | '2' | '3'
  children: CategoryNode[]
}

export function buildCategoryTree(
  flat: {
    id: number
    title: string
    slug: string
    level: '1' | '2' | '3'
    parent?: number | { id: number } | null
  }[],
): CategoryNode[] {
  const byId = new Map<number, CategoryNode>()
  for (const c of flat) {
    byId.set(c.id, {
      id: c.id,
      title: c.title,
      slug: c.slug,
      level: c.level,
      children: [],
    })
  }
  const roots: CategoryNode[] = []
  for (const c of flat) {
    const node = byId.get(c.id)!
    const parentId =
      c.parent == null
        ? null
        : typeof c.parent === 'object'
          ? c.parent.id
          : c.parent
    if (parentId != null && byId.has(parentId)) {
      byId.get(parentId)!.children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}
