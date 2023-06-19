import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server:{
    proxy:{
      '/v1/search/news.json':'https://openapi.naver.com',
      
      '/mnews/article': {
        target: 'https://n.news.naver.com',
        changeOrigin: true,
        secure: false
      },
      '/main/view':'https://www.viva100.com',
      
      '/news/articleView':'https://www.ccdailynews.com',
      '/news':'http://www.dailyimpact.co.kr',
      /*'/read': {
        target: 'https://entertain.naver.com',
        changeOrigin: true,
        rewrite: (path) => {
          const match = path.match(/\/read\?(.*)/)
          if (match) {
            return `/read?${match[1]}`
          }
          return path
        },
        secure:false,
        ws:true
      }*/
     
      '/view':'https://www.ktv.go.kr',
      '/articles':'https://www.wikitree.co.kr',
      "/read": {
        target: "https://entertain.naver.com",
        //changeOrigin: true,
        secure:false,
      },
      
      "/Article/View":"https://ch.yes24.com",
      "/ebsnews":"https://news.ebs.co.kr",
      "/archives":"http://kor.theasian.asia",
      "/newsView":"https://www.kukinews.com",
      "/board":"https://www.fashionn.com",
      "/web":"https://www.yeongnam.com",
      "/free/content":"https://www.thebell.co.kr",
      "/news/article/article_view":"https://www.notepet.co.kr"
      
      

     

      
      
      
        
     
    }
    
  }
})