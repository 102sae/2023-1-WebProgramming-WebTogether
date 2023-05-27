import React, { useState, useEffect } from 'react';
import axios from "axios";
import iconv from 'iconv-lite';
import * as cheerio from "cheerio";
import { useLocation } from 'react-router-dom';

let array = new Array();
const SearchNews = () => {

    
    const location = useLocation();
    const searchTerm = location.state.result;
    
    const [response, setResponse] = useState([]);
    const [content, setContent] = useState([]);
   
    useEffect(() => {
        console.log(searchTerm);
        async function getData() {
            const id = '94fGFH09Kp151eWNW9h8';
            const secret_id = 'YvsfmSVRlf';

            const res = await axios.get(
                "/v1/search/news.json", // 불러올 api 주소
                {
                    params: { query: searchTerm, display: 100, sort: "date" }, // query는 필수값
                    // dispplay : 몇 개 기사를 나열할건지
                    headers: {
                        "X-Naver-Client-Id": id,
                        "X-Naver-Client-Secret": secret_id,
                    },
                }
            );
            setResponse(res.data.items);
        }
        getData();
    }, []);

   

  
    useEffect(() => {


        response.forEach((dataa) => {
           
            if ((dataa.link.includes('https://n.news.naver.com')  || dataa.link.includes('http://www.dailyimpact.co.kr') )) {
                
                const extracted = dataa.link.split('/').slice(3).join('/');
                const geturl = '/' + extracted;
                
                axios.get(geturl).then((response) => {
                    const html = response.data;
                    const $ = cheerio.load(html);

                    
                    const pTag = $('p').text();
                    const dic_area=$('div#dic_area').text();
                    const articeBody=$('div#articeBody').text();
                    const articles=[pTag,dic_area,articeBody]
                    articles.forEach((article)=>{
                        if (article){
                            array.push(article);
                            
                        }
                    })
                    

                    
                }).catch((error)=>console.log(error));
            }
           
            
        setContent(array);
        });
    }, [response]);

    useEffect(()=>{
        console.log('내용물',content.length);
        
    },[content])
    return (
        <div>
            {content.map((item, index) => (
                <p key={item} style={{ border: '1px solid black' }}>{item}</p>
            ))}
        </div>
    );
};

export default SearchNews;
