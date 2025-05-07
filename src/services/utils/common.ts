import { format } from 'date-fns'

export const clientDateFormat = (date?: Date) => (date ? new Date(date).toLocaleDateString() : '')

export const clientDateFormatWithTime = (date?: Date) => (date ? format(date, 'dd.MM.yyyy, HH:mm:ss') : '')

export const hasErrorField = (error: unknown): error is { data: { error: string } } =>
  typeof error === 'object' &&
  error !== null &&
  'data' in error &&
  typeof (error as any).data === 'object' &&
  (error as any).data !== null &&
  'error' in (error as any).data &&
  typeof (error as any).data.error === 'string'
