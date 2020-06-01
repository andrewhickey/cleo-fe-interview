import React, { useEffect } from 'react'
import { useStores } from '../../stores'
import { observer } from 'mobx-react-lite'

type CategoryLabelProps = {
  categoryId: number
}
function CategoryLabel({
  categoryId,
  ...spanProps
}: CategoryLabelProps & React.ComponentProps<'span'>) {
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

  return <span {...spanProps}>{category.name}</span>
}

export default observer(CategoryLabel)
