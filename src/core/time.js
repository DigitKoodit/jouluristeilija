export const getHours = dateObject => dateObject.getHours() < 10 ? '0' + dateObject.getHours() : dateObject.getHours();
export const getMinutes = dateObject => dateObject.getMinutes() < 10 ? '0' + dateObject.getMinutes() : dateObject.getMinutes();

export const formatTime = epoch => {
  const time = new Date(epoch);
  return `${getHours(time)}:${getMinutes(time)}`;
}
