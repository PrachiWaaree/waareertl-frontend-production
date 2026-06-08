import Script from "next/script";

const isJsonLd = (content) => {
  if (!content) return false;
  const trimmed = content.trim();
  return trimmed.startsWith("{") || trimmed.startsWith("[");
};

export const extractScripts = (html) => {
  if (!html || typeof html !== "string") return [];

  const scripts = [];
  const regex = /<(script|noscript)\b([^>]*)>([\s\S]*?)<\/\1>/gi;

  let match;
  while ((match = regex.exec(html)) !== null) {
    const tagName = match[1].toLowerCase();
    const attrs = match[2] || "";
    const content = match[3] || "";

    const srcMatch =
      /src\s*=\s*"([^"]+)"/i.exec(attrs) || /src\s*=\s*'([^']+)'/i.exec(attrs);

    const typeMatch = /type\s*=\s*["']([^"']+)["']/i.exec(attrs);

    scripts.push({
      tagName,
      src: srcMatch ? srcMatch[1] : null,
      content: srcMatch ? null : content.trim(),
      type: typeMatch ? typeMatch[1] : null,
    });
  }

  return scripts;
};

export const HTMLScriptInjector = ({
  html,
  strategy = "afterInteractive",
  idPrefix = "script",
}) => {
  const scripts = extractScripts(html);


  if (scripts.length === 0) return null;

  return (
    <>
      {scripts.map((s, i) => {
        if (s.tagName === "noscript") {
          return (
            <noscript
              key={`${idPrefix}-noscript-${i}`}
              dangerouslySetInnerHTML={{ __html: s.content }}
            />
          );
        }

        return s.src ? (
          <Script
            key={`${idPrefix}-${i}`}
            id={`${idPrefix}-${i}`}
            src={s.src}
            strategy={strategy}
          />
        ) : (
          <Script
            key={`${idPrefix}-inline-${i}`}
            id={`${idPrefix}-inline-${i}`}
            strategy={strategy}
            type={
              s.type ||
              (isJsonLd(s.content) ? "application/ld+json" : "text/javascript")
            }
            dangerouslySetInnerHTML={{ __html: s.content }}
          />
        );
      })}
    </>
  );
};
