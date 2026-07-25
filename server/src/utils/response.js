export const extractJson = (text) => {
  if (!text) throw new Error("Empty response from model.");

  let cleaned = text.trim();

  // strip markdown code fences if the model wraps its output
  cleaned = cleaned
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");

  if (start === -1 || end === -1 || end < start) {
    throw new Error("No JSON array found in model response.");
  }

  const jsonSlice = cleaned.slice(start, end + 1);

  return JSON.parse(jsonSlice);
};
