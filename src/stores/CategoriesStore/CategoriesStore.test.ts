import nock from 'nock'
import categories from './categories'
import CategoriesStore from './CategoriesStore'

describe('CategoriesStore tests', () => {
  it('can be instantiated', () => {
    new CategoriesStore()
  })

  it('fetches categories and stores them in state', async () => {
    nock('http://localhost').get('/categories').reply(200, categories)

    const categoriesStore = new CategoriesStore('http://localhost/categories')
    expect(categoriesStore.categories).toHaveLength(0)
    expect(categoriesStore.fetching).toBe(false)
    expect(categoriesStore.finished).toBe(false)
    expect(categoriesStore.errorMessage).toEqual('')

    const fetchPromise = categoriesStore.fetch()

    expect(categoriesStore.fetching).toBe(true)
    expect(categoriesStore.finished).toBe(false)

    await fetchPromise

    expect(categoriesStore.fetching).toBe(false)
    expect(categoriesStore.finished).toBe(true)
    expect(categoriesStore.categories).toHaveLength(9)
  })

  it('handles http errors and stores the response', async () => {
    const mock = nock('http://localhost')
      .persist()
      .get('/categories')
      .reply(500)

    const categoriesStore = new CategoriesStore('http://localhost/categories')
    expect(categoriesStore.categories).toHaveLength(0)
    expect(categoriesStore.fetching).toBe(false)
    expect(categoriesStore.finished).toBe(false)
    expect(categoriesStore.errorMessage).toEqual('')

    const fetchPromise = categoriesStore.fetch()

    expect(categoriesStore.fetching).toBe(true)
    expect(categoriesStore.finished).toBe(false)

    await fetchPromise

    expect(categoriesStore.fetching).toBe(false)
    expect(categoriesStore.finished).toBe(false)
    expect(categoriesStore.categories).toHaveLength(0)
    expect(categoriesStore.errorMessage).toEqual('Internal Server Error')

    mock.persist(false)
  })
})
