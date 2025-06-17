const cds = require('@sap/cds');
const puppeteer = require('puppeteer');

module.exports = cds.service.impl(function () {
  this.on('obtener', async () => {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'shell',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0');
      await page.goto(
        'https://www.sbs.gob.pe/app/pp/sistip_portal/paginas/publicacion/tipocambiopromedio.aspx',
        { waitUntil: 'networkidle2' }
      );

      const resultado = await page.evaluate(() => {
        const filas = document.querySelectorAll('.rgMasterTable tbody tr');
        for (const fila of filas) {
          const columnas = fila.querySelectorAll('td');
          const moneda = columnas[0]?.innerText.trim();
          if (moneda === 'Dólar de N.A.') {
            const compra = columnas[1]?.innerText.trim();
            const venta = columnas[2]?.innerText.trim();
            return { moneda, compra, venta };
          }
        }
        return null;
      });

      await browser.close();
      return resultado ?? { moneda: '', compra: '', venta: '' };
    } catch (error) {
      console.error('Error:', error);
      if (browser) await browser.close();
      return { moneda: '', compra: '', venta: '' };
    }
  });
});
