import { CustomersList } from "../../components/dashboard/Customers"
import useSWR from 'swr'
import { useSearchParams } from "react-router-dom"
import { fetcher } from "../../utils"


export const Customers = () => {
  const [params] = useSearchParams()

  const { isLoading, data } = useSWR(`https://base.api/user?page=${params.get('page') || 1}&q=${params.get('q') || ''}`, fetcher)

  return (
    <CustomersList
      loading={isLoading}
      customers={data}
    />
  )
}
