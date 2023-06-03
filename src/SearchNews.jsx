import { useState, useEffect } from "react";
import axios from "axios";

import * as cheerio from "cheerio";
import { useLocation } from "react-router-dom";

let array = new Array();

const onSubmit = (inputValue) => {
  var input = inputValue;
  let questionSummary =
    "[text from: " +
    input +
    "] 이 내용에서 진짜 뉴스 기사만 찾아서 영어 말고 한국어로 요약해줘.";
  chat(questionSummary).then((answer) => console.log(`본문: ${answer}`));
  let questionKeyword =
    input +
    "이 뉴스의 카테고리를 정했을 때 정치, 경제, 사회, 생활/문화, 세계, 기술/IT, 연예, 스포츠 중에서 가장 유사한거 하나 선택 후 키워드를 추출해줘. 요약 하지 말고 예시처럼 키워드만 무조건 간단하게 3개 이내로 괄호에 넣어서 추출해줘. 예시) (연예),(스캔들)";
  chat(questionKeyword).then((answer) => console.log(`키워드: ${answer}`));
};

async function chat(question) {
  return await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer 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`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    }),
  })
    .then((res) => res.json())
    .then((data) => data.choices[0].message.content);
}

const SearchNews = () => {
  const location = useLocation();
  const searchTerm = location.state.result;

  const [response, setResponse] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    console.log(searchTerm);
    async function getData() {
      const id = "94fGFH09Kp151eWNW9h8";
      const secret_id = "YvsfmSVRlf";

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
      //console.log(dataa.link);
      if (
        dataa.link.includes("https://n.news.naver.com") ||
        dataa.link.includes("http://www.dailyimpact.co.kr") ||
        dataa.link.includes("https://www.ktv.go.kr") ||
        dataa.link.includes("https://www.wikitree.co.kr")
      ) {
        const extracted = dataa.link.split("/").slice(3).join("/");
        const geturl = "/" + extracted;

        axios
          .get(geturl)
          .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            const pTag = $("p").text();
            const dic_area = $("div#dic_area").text();
            const articeBody = $("div#articeBody").text();
            const zoominout = $("div.article zoominout").text();
            const articles = [pTag, dic_area, articeBody, zoominout];
            articles.forEach((article) => {
              if (article) {
                array.push(article);
              }
            });

            setContent(array);
          })
          .catch((error) => console.log(error));
      }
    });
  }, [response]);

  useEffect(() => {
    console.log("내용물", content.length);
  }, [content]);
  return (
    <div>
      {content.map((item, index) => (
        <p key={index} style={{ border: "1px solid black", color: "white" }}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default SearchNews;
