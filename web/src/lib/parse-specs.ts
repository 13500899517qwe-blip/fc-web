/** Parse semicolon-separated specs into display rows. */
export function parseSpecs(specs?: string | null): { label: string; value: string }[] {
  if (!specs?.trim()) return []

  return specs
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const colon = part.indexOf(':')
      if (colon > 0 && colon < part.length - 1) {
        return {
          label: part.slice(0, colon).trim(),
          value: part.slice(colon + 1).trim(),
        }
      }
      return { label: 'Spec', value: part }
    })
}
