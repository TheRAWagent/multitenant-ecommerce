import React from 'react'

async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return (
    <div>
      {category}
    </div>
  )
}

export default CategoryPage