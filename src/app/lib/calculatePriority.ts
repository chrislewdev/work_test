// app/lib/calculatePriority.ts

/**
 * Calculate priority based on deadline proximity
 * - Within 1 week: High priority
 * - Within 2 weeks: Medium priority
 * - Beyond 2 weeks: Low priority
 */
export function calculatePriority(deadline: string): "high" | "medium" | "low" {
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();

  // Calculate the difference in days
  const diffInTime = deadlineDate.getTime() - currentDate.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

  // Determine priority based on difference
  if (diffInDays <= 7) {
    return "high";
  } else if (diffInDays <= 14) {
    return "medium";
  } else {
    return "low";
  }
}
