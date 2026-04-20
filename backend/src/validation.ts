const VALID_DIETS = ['vegetarian', 'non-vegetarian'] as const;
type Diet = (typeof VALID_DIETS)[number] | null;

/** Strip HTML tags and trim whitespace from input */
export function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

/** Check if a diet value is valid */
export function isValidDiet(value: unknown): value is Diet {
  return value === null || VALID_DIETS.includes(value as any);
}
