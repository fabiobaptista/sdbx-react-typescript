import { useEffect, useState } from 'react'
import UseFetchProps from './UseFetchProps'

const useFetch = function<T>({ url, callbackFetch }: UseFetchProps<T>): void {

  const [data, setData] = useState<T[]>()

  useEffect(() => {
    (async () => {
      const req = await fetch(url)
      const { data: resData } = await req.json()

      setData(resData || [])
    })()
  }, [url])
  
  callbackFetch(data || [])
}

export default useFetch