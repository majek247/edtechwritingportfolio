import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

const SITE_URL =
  import.meta.env.VITE_SITE_URL ??
  (typeof window !== "undefined" ? window.location.origin : "");

export function Seo({
  title,
  description,
  path,
  image = "/images/blackglogo.png",
  type = "article",
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}