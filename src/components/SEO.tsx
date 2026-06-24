import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  keywords?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
  schema?: Record<string, any>;
}

export default function SEO({ 
  title, 
  description, 
  url, 
  keywords,
  type = "website",
  image = "https://quality.ruralutilitycost.com/og-image.jpg",
  noindex = false,
  schema
}: SEOProps) {
  const siteName = "Quality | Rural Utility Cost";
  const fullTitle = `${title} | ${siteName}`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": fullTitle,
    "description": description,
    "url": url,
    "applicationCategory": "BusinessApplication"
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}
