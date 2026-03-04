import { useEffect } from 'react';
import { siteConfig } from '@/utils/config';

/**
 * Componente SEO — atualiza meta tags e JSON-LD via DOM nativo (React 19 compatível)
 * @param {Object} props
 * @param {string} props.title - Título da página
 * @param {string} props.description - Descrição meta
 * @param {string} props.path - Path da URL (ex: "/contato")
 * @param {string} props.type - Tipo OG (default: "website")
 * @param {Object|null} props.jsonLd - Structured data adicional (JSON-LD)
 */
export default function SEO({
  title,
  description = siteConfig.description,
  path = '',
  type = 'website',
  jsonLd = null,
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.seo.defaultTitle;

  const url = `${siteConfig.url}${path}`;
  const ogImage = `${siteConfig.url}${siteConfig.seo.ogImage}`;

  useEffect(() => {
    // — Título
    document.title = fullTitle;

    // — Helper: criar ou atualizar meta tag
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // — Meta tags SEO
    setMeta('name', 'description', description);
    setMeta(
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );

    // — Open Graph
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:site_name', siteConfig.name);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:image:secure_url', ogImage);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', fullTitle);
    setMeta('property', 'og:locale', siteConfig.seo.locale);

    // — Twitter / X
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', siteConfig.social.instagram);
    setMeta('name', 'twitter:creator', siteConfig.social.instagram);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'twitter:image:alt', fullTitle);

    // — Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // — JSON-LD dinâmico (para páginas futuras)
    if (jsonLd) {
      const id = 'dynamic-jsonld';
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);

      return () => {
        const el = document.getElementById(id);
        if (el) el.remove();
      };
    }
  }, [fullTitle, description, url, ogImage, type, jsonLd]);

  return null;
}
