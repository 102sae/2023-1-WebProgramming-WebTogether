import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/v1/search/news.json':'https://openapi.naver.com',
      
      '/mnews/article': 'https://n.news.naver.com',
      
      
      '/news':'http://www.dailyimpact.co.kr',
      '/read': {
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
      }
      
      
        
     
    }
    
  }
})
