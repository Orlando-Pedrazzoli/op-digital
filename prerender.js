/**
 * prerender.js — Script de pre-rendering pos-build
 *
 * Corre apos o `vite build` e gera HTML estatico para cada rota.
 * Usa Puppeteer para abrir cada pagina no browser e capturar o HTML final.
 *
 * Uso: node prerender.js
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  statSync,
} from 'fs';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, 'dist');
const PORT = 4173;

// Todas as rotas do site
const ROUTES = [
  '/',
  '/portfolio',
  '/planos',
  '/servicos',
  '/sobre',
  '/faq',
  '/privacidade',
  '/termos',
];

// Servidor estatico que serve ficheiros reais do dist/
// So faz fallback para index.html quando o ficheiro NAO existe
function startServer() {
  return new Promise(resolvePromise => {
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.woff2': 'font/woff2',
      '.woff': 'font/woff',
      '.txt': 'text/plain',
      '.xml': 'application/xml',
      '.webmanifest': 'application/manifest+json',
    };

    const server = createServer((req, res) => {
      const urlPath = req.url.split('?')[0];
      let filePath = resolve(DIST, urlPath.slice(1));

      // Se o path aponta para um ficheiro real que existe, serve-o diretamente
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const ext = extname(filePath);
        const content = readFileSync(filePath);
        res.writeHead(200, {
          'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        });
        res.end(content);
        return;
      }

      // Se e um directorio, tenta index.html dentro dele
      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        const indexFile = resolve(filePath, 'index.html');
        if (existsSync(indexFile)) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(readFileSync(indexFile));
          return;
        }
      }

      // Fallback: serve o index.html principal (SPA behavior)
      const indexHtml = resolve(DIST, 'index.html');
      if (existsSync(indexHtml)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(indexHtml));
        return;
      }

      res.writeHead(404);
      res.end('Not found');
    });

    server.listen(PORT, () => {
      console.log(`  Servidor local: http://localhost:${PORT}`);
      resolvePromise(server);
    });
  });
}

async function prerender() {
  console.log('\n  Pre-rendering iniciado...\n');

  // Import dinamico do puppeteer
  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.error('  ERRO: Puppeteer nao encontrado. Instala com:');
    console.error('  npm install -D puppeteer\n');
    process.exit(1);
  }

  const server = await startServer();
  const browser = await puppeteer.default.launch({ headless: 'new' });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;

    console.log(`  Renderizando: ${route}`);

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Aguarda o React renderizar conteudo no #root
    await page
      .waitForFunction(
        () => {
          return document.querySelector('#root')?.innerHTML?.length > 100;
        },
        { timeout: 10000 },
      )
      .catch(() => {
        console.warn(`    Aviso: conteudo pode estar incompleto em ${route}`);
      });

    // Captura o HTML completo
    let html = await page.content();

    // Limpa atributos desnecessarios
    html = html.replace(/ data-reactroot=""/g, '');

    // Define o output path
    const outputDir = route === '/' ? DIST : resolve(DIST, route.slice(1));

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const outputFile = resolve(outputDir, 'index.html');
    writeFileSync(outputFile, html, 'utf-8');
    console.log(`  Gravado: ${outputFile.replace(resolve(__dirname), '.')}`);

    await page.close();
  }

  await browser.close();
  server.close();

  console.log(
    `\n  Pre-rendering concluido! ${ROUTES.length} paginas geradas.\n`,
  );
}

prerender().catch(err => {
  console.error('  Erro no pre-rendering:', err);
  process.exit(1);
});
