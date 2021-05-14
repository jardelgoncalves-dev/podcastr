export function convertDurationToTimeString(duration: number): string {
  return [
    Math.floor(duration / 3600),
    Math.floor(duration % 3600 / 60),
    duration % 60
  ].map(time => String(time).padStart(2, '0')).join(':')
}