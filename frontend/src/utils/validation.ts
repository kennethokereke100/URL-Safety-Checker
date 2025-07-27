// frontend/src/utils/validation.ts
export function isValidDomain(input: string): boolean {
  const trimmed = input.trim().toLowerCase();

  // Always allow Google's Safe Browsing test URLs
  if (trimmed.startsWith("http://testsafebrowsing.appspot.com/")) {
    return true;
  }

  // General domain pattern
  const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/?#].*)?$/;
  return pattern.test(trimmed);
} 