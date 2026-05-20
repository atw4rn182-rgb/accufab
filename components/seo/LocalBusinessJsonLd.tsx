import { getLocalBusinessJsonLd } from "@/lib/local-business-schema";

export function LocalBusinessJsonLd() {
  const schema = getLocalBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
