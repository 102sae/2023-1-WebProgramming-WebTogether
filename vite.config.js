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

      
      
      
        
     
    }
    
  }
})

