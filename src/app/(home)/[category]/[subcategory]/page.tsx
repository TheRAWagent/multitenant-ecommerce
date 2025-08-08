import React from 'react'

async function SubcategoryPage({ params }: { params: Promise<{ category: string, subcategory: string }> }) {
  const { category, subcategory } = await params;
  return (
    <div>
      Category: {category}
      Subcategory: {subcategory}
    </div>
  )
}

export default SubcategoryPage