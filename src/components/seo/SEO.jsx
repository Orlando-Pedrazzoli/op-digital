import { useEffect } from 'react';
import { siteConfig } from '@/utils/config';

/**
 * SEO Component — Atualiza meta tags via DOM
 *
 * Funciona em dois modos:
 * 1. Client-side: atualiza meta tags dinamicamente por rota
 * 2. Pre-render: durante o build, o HTML capturado ja tera as meta tags corretas
 *
 * @param {string} title - Titulo da pagina
 * @param {string} description - Descricao meta
 * @param {string} path - Path da URL (ex: "/servicos")
 * @param {string} type - Tipo OG (default: "website")
 * @param {Object|null} jsonLd - Structured data adicional (JSON-LD)
 * @param {string|null} image - Imagem OG custom (default: og-image.jpg)
 */
export default function SEO({
  title,
  description = siteConfig.description,
  path = '',
  type = 'website',
  jsonLd = null,
  image = null,
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.seo.defaultTitle;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}${siteConfig.seo.ogImage}`;

  useEffect(() => {
    // -- Titulo
    document.title = fullTitle;

    // -- Helper: criar ou atualizar meta tag
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // -- Helper: criar ou atualizar link tag
    const setLink = (rel, href, attrs = {}) => {
      const selector = Object.entries(attrs)
        .map(([k, v]) => `[${k}="${v}"]`)
        .join('');
      let el = document.querySelector(`link[rel="${rel}"]${selector}`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // -- Meta tags SEO
    setMeta('name', 'description', description);
    setMeta(
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );

    // -- Open Graph
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

    // -- Twitter / X
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', siteConfig.social.instagram);
    setMeta('name', 'twitter:creator', siteConfig.social.instagram);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'twitter:image:alt', fullTitle);

    // -- Canonical
    setLink('canonical', url);

    // -- Hreflang (pt-BR principal + x-default)
    setLink('alternate', url, { hreflang: 'pt-BR' });
    setLink('alternate', url, { hreflang: 'x-default' });

    // -- JSON-LD dinamico (para paginas que precisam de structured data custom)
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
