export const formatDate = (date: string) => {
  const fd = new Date(date).toDateString()
  return fd
}
