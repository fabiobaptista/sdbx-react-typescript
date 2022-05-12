export default interface UseFetchProps<T> {
  initialvalue?: T[]
  url: string
  callbackFetch: (data: T[]) => void
}