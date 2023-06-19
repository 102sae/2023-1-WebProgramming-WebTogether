import { useState, useEffect } from "react";
import axios from "axios";
import * as cheerio from "cheerio";
import { useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import SearchingBar from "./Components/SearchingBar";
import SearchingMain from "./Components/SearchingMain";
import Footer from "../landing/Components/Footer";
import { decode } from "html-entities";



function ProjectMain() {
  const location = useLocation();
  const searchTerm = location.state.result; // 검색어 받아옴
  const searchTerm2 = location.state.wordResult;

  const [content, setContent] = useState({});
  const [response, setResponse] = useState([]);

  const validLinks = [
    "http://www.dailyimpact.co.kr",
    "https://www.ktv.go.kr",
    "https://www.wikitree.co.kr",
    "https://www.ccdailynews.com",
    "https://www.viva100.com",
    "http://kor.theasian.asia",
    "https://ch.yes24.com",
    "https://news.ebs.co.kr",
    "https://www.kukinews.com",
    "www.fashionn.com",
    "www.thebell.co.kr",
    "https://www.notepet.co.kr"
    
    
  ];

  useEffect(() => {
    console.log(searchTerm); // 검색어는 잘 가져옴
    async function getData(query) {
      const id = import.meta.env.VITE_APP_API_KEY;
      const secret_id = import.meta.env.VITE_APP_SECRET_ID;

      const res = await axios.get("/v1/search/news.json", {
        params: { query, display: 100, sort: "date" },
        headers: {
          "X-Naver-Client-Id": id,
          "X-Naver-Client-Secret": secret_id,
        },
      });

      return res.data.items;
    }

    async function fetchData() {
      const response = await getData(searchTerm);
      setResponse(response);
    }

    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    console.log(searchTerm2); // 검색어는 잘 가져옴
    async function getData(query) {
      const id = import.meta.env.VITE_APP_API_KEY;
      const secret_id = import.meta.env.VITE_APP_SECRET_ID;

      const res = await axios.get("/v1/search/news.json", {
        params: { query, display: 100, sort: "date" },
        headers: {
          "X-Naver-Client-Id": id,
          "X-Naver-Client-Secret": secret_id,
        },
      });

      return res.data.items;
    }

    async function fetchData() {
      const response = await getData(searchTerm2);
      setResponse(response);
    }

    fetchData();
  }, [searchTerm2]);

  useEffect(()=>{
    response.forEach((item,index)=>console.log(index,item.link));

  },[response]);

  useEffect(() => {
    const crawling = async () => {
      const contentDict = {};

      for (const item of response) {
        const isvalidLink=validLinks.some((link)=>item.link.includes(link));
        if (isvalidLink) {
          console.log('유효',item.link);
          const extracted = item.link.split("/").slice(3).join("/"); // baseURL 떼고
          const getUrl = "/" + extracted;

          const res = await axios.get(getUrl);
          const html = res.data;

          const $ = cheerio.load(html);
          let articleText = "";

          if (item.link.includes("https://www.wikitree.co.kr")) {
            $("div#wikicon")
              .children("p")
              .each(function () {
                articleText += $(this).text();
              });
          } else if (
            item.link.includes("http://www.dailyimpact.co.kr") ||
            item.link.includes("https://www.ccdailynews.com") ||
            item.link.includes("https://ch.yes24.com") ||
            item.link.includes("https://news.ebs.co.kr") ||
            item.link.includes("http://kor.theasian.asia") || //o
            item.link.includes("https://www.yeongnam.com")||// x
            item.link.includes("https://www.notepet.co.kr") 
          ) {
            articleText = $("p").text();
          } else if (item.link.includes("https://www.ktv.go.kr")) {
            articleText = $("div.article.zoominout").text();
          } else if (item.link.includes("https://www.viva100.com")) {
            if ($("div.left_text_box").find("p").length > 0) {
              $("div.left_text_box")
                .children("p")
                .each(function () {
                  articleText += $(this).text();
                });
            }
            if ($("div.left_text_box").find("table")) {
              articleText = $("div.left_text_box").text();
            }
          } else if (item.link.includes("https://www.fashionn.com")) {
            const spanElements = $('div').find('span');
            spanElements.each(function () {
              articleText = $(this).text();
            });
          }
          else if(item.link.includes("https://www.kukinews.com")){
            articleText=$("div.newsview_content").text();
          }else if(item.link.includes("https://www.thebell.co.kr")){
            articleText=$('div.viewSection').text();
          }
          
          

          const titleWithoutTags = decode(item.title).replace(/<[^>]+>/g, "");

          if (articleText) {
            contentDict[titleWithoutTags] = {
              link: item.link,
              date: convertDate(item.pubDate),
              text: articleText,
            };
          }
        }
      }

      setContent(contentDict);
    };

    crawling();
  }, [response]);

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Navbar />
      <SearchingBar searchTerm={searchTerm} />
      <SearchingMain content={content} />
      <Footer />
    </>
  );
}

export default ProjectMain;
