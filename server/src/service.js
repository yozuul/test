import { Parser } from './parser'

export class Service {
   static async parseOne(url) {
      console.log(url)
      Parser.parsePage()
   }
   static async parseOneTest(url) {
      console.log(url)
      return Parser.parsePage(url)
   }

   static async parseMany(urls) {

   }

   static initBrowser() {
      Parser.launchBrowser()
   }
   static getPresaveUrlsFromDB() {
      return [
         { id: 1, url: 'https://www.google.com/' },
         { id: 2, url: 'https://github.com/' },
         { id: 3, url: 'https://hh.ru/' }
      ]
   }
}