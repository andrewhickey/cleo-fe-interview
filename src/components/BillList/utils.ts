const shouldFlip = (id: string) => (prev: string, current: string) =>
  id === prev || id === current

export { shouldFlip }
