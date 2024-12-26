const year          = (date) => date.getFullYear();
const month         = (date) => String(date.getMonth() + 1).padStart(2, '0');
const day           = (date) => String(date.getDate()).padStart(2, '0');
const hours         = (date) => String(date.getHours()).padStart(2, '0');
const minutes       = (date) => String(date.getMinutes()).padStart(2, '0');
const seconds       = (date) => String(date.getSeconds()).padStart(2, '0');
const milliseconds  = (date) => String(date.getMilliseconds())


export function getNowFull() {
  
  const now = new Date()
  
  return `${year(now)}-${month(now)}-${day(now)} ${hours(now)}:${minutes(now)}:${seconds(now)}:${milliseconds(now)}`
}

export function getNowYYYYMM() {
  
  const now = new Date()

  return `${year(now)}-${month(now)}`
}

export function getNowYYYYMMDD() {
  
  const now = new Date()

  return `${year(now)}-${month(now)}-${day(now)}`
}