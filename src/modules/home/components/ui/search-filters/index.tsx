"use client";

import { Categories } from "@/modules/home/components/ui/search-filters/categories"
import SearchInput from "@/modules/home/components/ui/search-filters/search-input"
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import { useParams } from "next/navigation"
import { BreadcrumbNavigation } from "./breadcrumb-navigation";

export const SearchFilters = ({ data }: { data: any }) => {

  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.filter(category => category.slug === activeCategory)?.[0];
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName = activeCategoryData?.subcategories?.find(sub => sub.slug === activeSubcategory)?.name || null;

  return (
    <div className="px-4 lg:px-12 py-8 border flex flex-col gap-4 w-full" style={{backgroundColor: activeCategoryColor}}>
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
        <BreadcrumbNavigation activeCategoryName={activeCategoryName} activeCategory={activeCategory} activeSubcategoryName={activeSubcategoryName} />
    </div>
  )
}