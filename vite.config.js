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
      '/read': 'https://entertain.naver.com',
      '/view':'https://www.ktv.go.kr',
      '/articles':'https://www.wikitree.co.kr'
      
      
        
     
    }
    
  }
})

