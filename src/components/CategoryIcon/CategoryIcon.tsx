import React, { useEffect } from 'react'
import { useStores } from '../../stores'
import { observer } from 'mobx-react-lite'

type CategoryIconProps = {
  categoryId: number
}
function CategoryIcon({
  categoryId,
  ...imgProps
}: CategoryIconProps & React.ComponentProps<'img'>) {
  const { categoriesStore } = useStores()
  useEffect(() => {
    if (!categoriesStore.finished && !categoriesStore.fetching) {
      categoriesStore.fetch()
    }
  }, [categoriesStore])

  const category = categoriesStore.categories.find(
    (category) => category.id === categoryId
  )

  if (!category) {
    return null
  }

  return (
    <img
      src={category.iconUrl}
      alt={`Category ${category.name} icon`}
      {...imgProps}
    />
  )
}

export default observer(CategoryIcon)
