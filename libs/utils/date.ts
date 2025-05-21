export const formatDate = (date?: string | number | Date | null) => {
  return new Date(date || new Date()).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
}

export const formatDateTime = (date?: string | number | Date | null) => {
  return new Date(date || new Date()).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}