import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes a given input string by removing unwanted HTML tags and attributes.
 * @param value - The string to be sanitized.
 * @param options - Optional configuration for allowed HTML tags and attributes.
 * @returns The sanitized string with disallowed tags and attributes removed.
 */
export function sanitizeInput(
  value: string,
  options?: sanitizeHtml.IOptions,
): string {
  if (typeof value !== "string") {
    return value;
  }

  const defaultOptions: sanitizeHtml.IOptions = {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard",
  };

  return sanitizeHtml(value, options || defaultOptions).trim();
}

/**
 * Retrieves the value of a specified cookie from the browser's `document.cookie`.
 *
 * @param name - The name of the cookie to retrieve.
 * @returns The value of the cookie if found, otherwise `null`.
 *
 * @remarks
 * Returns `null` if executed in a non-browser environment (e.g., server-side).
 */
export const getCookieValue = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export const getOrCreateChatSessionId = (widgetId: string): string => {
  const key = `chatSessionId-${widgetId}`;
  let sessionId = localStorage.getItem(key);

  if (!sessionId) {
    sessionId = crypto.randomUUID(); // or use nanoid
    localStorage.setItem(key, sessionId);
  }

  return sessionId;
};
