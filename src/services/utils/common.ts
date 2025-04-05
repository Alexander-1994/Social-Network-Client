export const clientDateFormat = (date?: Date) => date?.toLocaleDateString() ?? ''

export const hasErrorField = (error: unknown): error is { data: { error: string } } =>
  typeof error === 'object' &&
  error !== null &&
  'data' in error &&
  typeof (error as any).data === 'object' &&
  (error as any).data !== null &&
  'error' in (error as any).data &&
  typeof (error as any).data.error === 'string'
