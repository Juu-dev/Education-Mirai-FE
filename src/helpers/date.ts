export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về 0-11, nên cần +1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về 0-11, nên cần +1
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0'); // Lấy giờ
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Lấy phút
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Lấy giây

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


export function splitDateTime(datetime: string): { date: string; time: string } {
  const dateObj = new Date(datetime);

  const date = dateObj.toISOString().split('T')[0]; // Lấy phần ngày (YYYY-MM-DD)
  const time = dateObj.toTimeString().split(' ')[0]; // Lấy phần giờ (HH:mm:ss)

  return { date, time };
}
