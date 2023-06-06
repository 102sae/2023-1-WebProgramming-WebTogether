import React from "react";
import Navbar from "./Components/Navbar";
import SearchingBar from "./Components/SearchingBar";
import SearchingMain from "./Components/SearchingMain";
import Footer from "../landing/Components/Footer";
import {decode} from 'html-entities';

import { useState, useEffect } from "react";
import axios from "axios";

import * as cheerio from "cheerio";
import { useLocation } from "react-router-dom";



function ProjectMain() {



  const location = useLocation();
  const searchTerm = location.state.result; // 검색어 받아옴
  const searchTerm2=location.state.wordResult;

  const [response, setResponse] = useState([]);
  // 넘겨줄거

  const [content, setContent] = useState({});

  const validLinks = [


    'http://www.dailyimpact.co.kr',
    'https://www.ktv.go.kr',
    'https://www.wikitree.co.kr',
    'https://www.ccdailynews.com',
    'https://www.viva100.com'
  ];

  // 날짜 변환기
  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // api 불러오기

  useEffect(() => {
    console.log(searchTerm); // 검색어는 잘 가져옴 
    async function getData() {
      const id = import.meta.env.VITE_APP_API_KEY;
      const secret_id = import.meta.env.VITE_APP_SECRET_ID;

      const res = await axios.get(
        "/v1/search/news.json",
        {
          params: { query: searchTerm, display: 100, sort: "date" },
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
    console.log(searchTerm2); // 검색어는 잘 가져옴 
    async function getData() {
      const id = import.meta.env.VITE_APP_API_KEY;
      const secret_id = import.meta.env.VITE_APP_SECRET_ID;

      const res = await axios.get(
        "/v1/search/news.json",
        {
          params: { query: searchTerm2, display: 100, sort: "date" },
          headers: {
            "X-Naver-Client-Id": id,
            "X-Naver-Client-Secret": secret_id,
          },
        }

      );
      setResponse(res.data.items);

    }
    getData();



  }, [searchTerm2]);

  useEffect(() => {
    response.forEach((item, index) => {
      console.log(index, item.title);
    })
  }, [response]);




  useEffect(() => {

    const crawling = async () => {

      const contentDict = {};


      for (const item of response) {

        if (validLinks.some(link => item.link.includes(link))) {






          const extracted = item.link.split("/").slice(3).join("/"); // baseURL 떼고
          const getUrl = "/" + extracted;

          const res = await axios.get(getUrl);
          const html = res.data;

          const $ = cheerio.load(html);

          let articleText = "";
          if (item.link.includes("https://www.wikitree.co.kr")) {
            $("div#wikicon").children("p").each(function () {
              articleText += $(this).text();
            });

          }
          else if (item.link.includes("http://www.dailyimpact.co.kr") || item.link.includes('https://www.ccdailynews.com')) {
            articleText = $('p').text();
          }

          else if (item.link.includes("https://www.ktv.go.kr")) {
            articleText = $("div.article.zoominout").text();
          }
          else if (item.link.includes('https://www.viva100.com')) {
            if ($("div.left_text_box").find("p").length > 0) {
              $("div.left_text_box").children("p").each(function () {
                articleText += $(this).text();
              });
            }
            if ($("div.left_text_box").find("table")) {
              articleText = $("div.left_text_box").text();
            }



          }

        const titleWithoutTags = decode(item.title).replace(/<[^>]+>/g, "");


          if (articleText) {
            contentDict[titleWithoutTags] = {
              link: item.link,
              date: convertDate(item.pubDate),
              text: articleText
            }
          }


        }
      }
      setContent(contentDict);



    }

    crawling();


  }, [response]);











  // Searching Main에 제목, 작성 날짜, 링크, 본문 보내주기 
  return (
    <>
      <Navbar />
      <SearchingBar />
      <SearchingMain content={content} />
      <Footer />
    </>
  );
}

export default ProjectMain;