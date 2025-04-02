// app/lib/formatDate.ts

export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return new Date(dateString).toLocaleDateString("en-US", mergedOptions);
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 0) {
    return "Expired";
  } else if (diffInDays === 0) {
    return "Due today";
  } else if (diffInDays === 1) {
    return "Due tomorrow";
  } else if (diffInDays < 7) {
    return `Due in ${diffInDays} days`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Due in ${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `Due in ${months} ${months === 1 ? "month" : "months"}`;
  }
}
