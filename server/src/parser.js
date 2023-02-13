import puppeteer from 'puppeteer'

export class Parser {
   constructor(browser, page) {
      this.browser = browser
      this.page = page
   }

   static async parsePage(url) {
      // this.launchBrowser()
      // console.log(url)
      // return true
      // return Parser.parse([url])
   }

   static async parseOne(urls) {
      let result = {}
      const browser = await this.browser
      for (let url of urls) {
         const page = await browser.newPage()
         try {
            await page.goto(url, {
               waitUntil: 'networkidle2', timeout: 12000000
            })
            const links = await page.evaluate((url) => {
               const scriptUrl = []
               const stylesUrl = []
               const scriptsElement = document.querySelectorAll('script')
               if(scriptsElement) {
                  for (let script of scriptsElement) {
                     let link = script.getAttribute('src')
                     if(link) {
                        link = (link.includes('http') ? link : url + link)
                        scriptUrl.push(link)
                     }
                  }
               }
               const linksElement = document.querySelectorAll('link')
               if(linksElement) {
                  for (let link of linksElement) {
                     if(link.getAttribute('rel') === 'stylesheet') {
                        let style = link.getAttribute('href')
                        if(style) {
                           style = (style.includes('http') ? style : url + link)
                           stylesUrl.push(style)
                        }
                     }
                  }
               }
               return {
                  scripts: scriptUrl, styles: stylesUrl
               }
            }, url)
            result[url] = links
            await page.close()
         } catch (error) {
            console.log(error)
            console.log('неправильный url, или сайт недоступен')
            result[url] = {
               status: 'error', text: 'Сайт недоступен'
            }
            await page.close()
         }
      }
      return result
   }

   static launchBrowser() {
      this.browser = puppeteer.launch({
         headless: false,
         defaultViewport: null,
         devtools: true,
         args: [
            '--disable-notifications',
            '--window-size=1920,1020',
            '--no-sandbox',
         ]
      })
   }
}