/** Convert a Medium article URL to an embeddable iframe src. */
export function toMediumEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("medium.com")) return url;
    parsed.searchParams.set("format", "embed");
    return parsed.toString();
  } catch {
    return url.includes("?") ? `${url}&format=embed` : `${url}?format=embed`;
  }
}
