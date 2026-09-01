function formatLocalDate(date) {
  const year = date.getFullYear()

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0')

  const day = String(
    date.getDate()
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getDefaultStayDates() {
  const today = new Date()

  const checkIn = new Date(today)
  checkIn.setDate(
    checkIn.getDate() + 1
  )

  const checkOut = new Date(today)
  checkOut.setDate(
    checkOut.getDate() + 4
  )

  return {
    checkIn:
      formatLocalDate(checkIn),
    checkOut:
      formatLocalDate(checkOut),
  }
}