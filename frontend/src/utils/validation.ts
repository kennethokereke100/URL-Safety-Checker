// frontend/src/utils/validation.ts
export function isValidDomain(input: string): boolean {
  // Allow:
  // - example.com
  // - www.example.com
  // - http://www.example.com
  // - https://example.com
  const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/?#].*)?$/;
  return pattern.test(input.trim());
} 