import { useEffect, useState } from "react"
import Header from "../components/Header"
import { Footer } from "../components/Footer"
import { getPromotions } from "../apis/PromotionApi"
import PromotionCard from "../components/PromotionCard"
import usePagination from "../components/usePagination.ts";

interface Promotion {
  id: number
  img: string
  date: string
  title: string
}

export default function Promotion() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 4
  const { page, next, prev } = usePagination(itemsPerPage)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getPromotions()
        setPromotions(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const startIndex = (page - 1) * itemsPerPage
  const currentItems = promotions.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(promotions.length / itemsPerPage)

  return (
    <div className="pt-[90px] md:pt-[110px] bg-black text-white min-h-screen">

      <Header />
      <div className="text-2xl md:text-3xl font-bold py-6 md:py-8 text-center">
        KHUYẾN MÃI
      </div>
      {loading ? (
        <div className="text-center py-20 text-lg">Đang tải khuyến mãi...</div>
      ) : promotions.length === 0 ? (
        <div className="text-center py-20 text-lg">Hiện tại chưa có chương trình khuyến mãi nào</div>
      ) : (
        <>
          <div
            className="
            container mx-auto px-3 md:px-4
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5 md:gap-8
          "
          >
            {currentItems.map(item => (
              <PromotionCard
                key={item.id}
                id={item.id}
                img={item.img}
                date={item.date}
                title={item.title}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="w-full container mx-auto px-4 py-10 flex justify-center md:justify-end">
              <div className="flex items-center gap-3 bg-gray-800/40 px-4 py-2 rounded-full text-sm md:text-base">

                <button
                  onClick={prev}
                  disabled={page === 1}
                  className="
                    px-3 py-1 rounded-full
                    bg-gray-700 hover:bg-red-600
                    disabled:bg-gray-900 disabled:text-gray-500
                    transition text-sm md:text-base
                  "
                >
                  Previous
                </button>

                <span className="text-gray-300 text-sm md:text-base">
                  {page} / {totalPages}
                </span>

                <button
                  onClick={next}
                  disabled={page === totalPages}
                  className="
                    px-3 py-1 rounded-full
                    bg-gray-700 hover:bg-red-600
                    disabled:bg-gray-900 disabled:text-gray-500
                    transition text-sm md:text-base
                  "
                >
                  Next
                </button>

              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  )
}
