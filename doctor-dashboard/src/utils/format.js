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

// Rough age from a YYYY-MM-DD date of birth string
export const calcAge = (dob) => {
  if (!dob || dob === 'Not Selected') return '-'
  const birth = new Date(dob)
  if (Number.isNaN(birth.getTime())) return '-'
  const diff = Date.now() - birth.getTime()
  return Math.abs(new Date(diff).getUTCFullYear() - 1970)
}
