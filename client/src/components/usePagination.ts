import { useState } from 'react'

export default function usePagination(limit: number) {
    const [page,setPage] = useState(1)
    const next = () => setPage((p)=> p+1)
    const prev = ()=> setPage((p)=> Math.max(1,p-1))
    const goTo = (p:number) => setPage(p)
 return { page, next, prev, goTo, limit };
}
