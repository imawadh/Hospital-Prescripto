const months = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// slotDate format from the backend is DD_M_YYYY
export const formatSlotDate = (slotDate) => {
  if (!slotDate) return ''
  const [day, month, year] = slotDate.split('_')
  return `${day} ${months[Number(month)] || month} ${year}`
}
