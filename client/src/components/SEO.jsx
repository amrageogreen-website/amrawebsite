import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  url = "https://www.amrageogreenworks.com", 
  image = "/logo.png",
  type = "website"
}) => {
  const siteName = "AMRA Geogreen Works Pvt Ltd";
  const defaultDescription = "AMRA Geogreen Works Pvt Ltd provides advanced geotechnical, foundation, and green engineering solutions.";
  const defaultKeywords = "geotechnical engineering, soil nailing, gabion works, retaining walls, shotcrete, slope stabilization, foundation works";
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
