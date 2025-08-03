import { Categories } from "@/components/search-filters/categories"
import SearchInput from "@/components/search-filters/search-input"

export const SearchFilters = ({ data }: { data: any }) => {
  return (
    <div className="px-4 lg:px-12 py-8 border flex flex-col gap-4 w-full">
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  )
}