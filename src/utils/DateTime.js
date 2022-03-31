/**
 * Format date time to local browser time
 * @param fromString String in a parseable format for new Date()
 * @returns Formatted date time in local time 'yyyy-MM-dd HH:mm ZZZ'
 */
export function formatToLocalTime(fromString) {
  const date = new Date(fromString);
  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const timeOptions = {
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  };

  return date.toLocaleDateString('en-CA', dateOptions) + ' ' + date.toLocaleTimeString('en-CA', timeOptions);
}