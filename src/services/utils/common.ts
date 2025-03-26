export const clientDateFormat = (date?: Date) => date?.toLocaleDateString() ?? ''

export const hasErrorField = (err: unknown) => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof (err as any).data === 'object' &&
    (err as any).data !== null &&
    'error' in (err as any).data &&
    typeof (err as any).data.error === 'string'
  )
}
