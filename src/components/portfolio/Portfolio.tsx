import React, { useEffect, useState } from "react";
import BlockEditor from "../block";
import useConnectEditor from "./hooks/useConnectEditor";
import junheeImg from "../../assets/junhee.jpg";
import './portfolio.scss';


const INFO_DATA: InfoComponentProps[] = [
  {
    title: "🙋🏻About Me",
    articleContentsList: [
      {
        subTitle: "Introduction",
        contents: [
          "안녕하세요. 신입 프론트엔드 개발자 황준희입니다.",
          ""
        ]
      }
    ]
  },
  {
    title: "💾 Record",
    articleContentsList: [
      {
        subTitle: "신한대학교",
        linkList: [
          "2011.03 ~ 2019.08"
        ],
        contents: [
          "글로벌 통상 경영학과",
          "교내 창업경진대회 장려상",
          "계명대학교 주최 제 5회 전국대학생토론대회 입선"
        ]

      },
      {
        subTitle: "대우직업능력개발원",
        linkList: [
          "2019.07 ~ 2020.04"
        ],
        contents: [
          "스마트콘텐츠제작 구직자 양성 과정 수료"
        ]
      },
      {
        subTitle: "소프트웨어 인 라이프",
        linkList: [
          "2020.05 ~ 2020.10"
        ],
        contents: [
          ""
        ]
      }
    ]
  },
  {
    title: "🧑🏻‍💻Skills",
    articleContentsList: [
      {
        subTitle: "Frontend",
        contents: [
          "HTML5, CSS3(SCSS)",
          "Typescript",
          "React(React-redux, Redux-saga)",
          "Vue.js(Nuxt.js)"
        ]
      },
      {
        subTitle: "Backend",
        contents: [
          "Node.js",
          "Nest.js"
        ]
      }
    ]
  },
  {
    title: "🧑🏻‍🏫Personal Projects",
    articleContentsList: [
      {
        subTitle: "React",
        contents: [
          ""
        ]
      },
      {
        subTitle: "Notion의 컨셉을 가져와 개발한 Bklog(진행중)",
        linkList: [
          ["https://github.com/wjunhee102/bklog-app", "Client code"],
          ["https://github.com/wjunhee102/bklog-api", "Server code"],
          ["https://bklog-app-deploy.vercel.app/bklog", "App Demo"]
        ],
        contents: [
          "notion의 block 형태의 문서 컴포넌트 개발",
          "실시간으로 업데이트되는 서비스 개발"
        ]
      },
      {
        subTitle: "기존 포트폴리오",
        linkList: [
          [""]
        ],
        contents: [

        ]
      }
    ]
  }
]

type LinkListType = string[] | string;

interface ArticleContentsProps {
  subTitle: string;
  linkList?: LinkListType[];
  contents: string[];
}

interface InfoComponentProps {
  title: string;
  articleContentsList: ArticleContentsProps[];
}

const ArticleContents: React.FC<ArticleContentsProps> = ({
  subTitle,
  linkList,
  contents
}) => {
  return (
    <article>
      <div className="left-box">
        <h3>{ subTitle }</h3>
        {
          linkList? 
            linkList.map((link, idx) => typeof link === "string"?
            <span key={idx}> {link} </span>  
            : <a key={idx} href={link[0]}>{link[1]}</a>
            ) 
            : null
        }
      </div> 

      <div className="right-box">
        
        <ul className="contents">
          { contents.map((content, idx) => <li key={idx}> { content } </li>) }
        </ul>

      </div>

    </article>
  )
}

const InfoComponent: React.FC<InfoComponentProps> = ({
  title,
  articleContentsList
}) => {
  return (
    <section className="info-area">
      <div className="container">
        <h2 className="title"> {title} </h2>
      </div>

      { articleContentsList.map((contents, idx) => <ArticleContents key={idx} {...contents} />) }

    </section>
  )
}

const test = {
  a: 1,
  b: 2
}

const Portfolio: React.FC = () => {
  const [ count, setCount ] = useState<number>(0);

  // useEffect(() => {
  //   if(count < 12) {
  //     const timer = setTimeout(() => {
  //       setCount(count + 1);
  //       console.log(count);
  //     }, 1000);
    
  //   return () => clearTimeout(timer);
  //   }
  // }, [count]);

  return (
    <main className="portfolio h-screen">
      
      {/* <header className="cover-area">
        <div className="container">
          <div className="profile-photo">
            <img src={junheeImg} alt="junhee"/>
          </div>

          <h1>몰입하는 개발자, 황준희입니다.</h1>
        </div>
      </header>
      
      {
        INFO_DATA.map((data, idx) => <InfoComponent key={idx} {...data} />)
      } */}
      <BlockEditor connectStoreHook={useConnectEditor} />

    </main>
  )
} 

export default Portfolio;