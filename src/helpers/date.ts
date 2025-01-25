export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về 0-11, nên cần +1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function splitDateTime(datetime: string): { date: string; time: string } {
  const dateObj = new Date(datetime);

  const date = dateObj.toISOString().split('T')[0]; // Lấy phần ngày (YYYY-MM-DD)
  const time = dateObj.toTimeString().split(' ')[0]; // Lấy phần giờ (HH:mm:ss)

  return { date, time };
}
