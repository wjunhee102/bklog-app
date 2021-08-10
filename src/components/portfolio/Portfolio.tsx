import React from "react";
import BlockEditor from "../newBlock";
import useConnectEditor from "./hooks/useConnectEditor";
import junheeImg from "../../assets/junhee.jpg";


const INFO_DATA: InfoComponentProps[] = [
  {
    title: "🙋🏻About Me",
    articleContentsList: [
      {
        subTitle: "Introduction",
        contents: [
          "안녕하세요."
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
          ["https://bklog-app-deploy.vercel.app/home", "App Demo Link"]
        ],
        contents: [
          "notion의 block 형태의 문서 컴포넌트 개발",
          "실시간으로 업데이트되는 서비스 개발"
        ]
      }
    ]
  }
]

interface ArticleContentsProps {
  subTitle: string;
  linkList?: string[][];
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
            linkList.map((link) => <a href={link[0]}>{link[1]}</a>) 
            : null
        }
      </div> 

      <div className="right-box">
        
        <ul className="contents">
          { contents.map((content) => <li> { content } </li>) }
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

      { articleContentsList.map((contents) => <ArticleContents {...contents} />) }

    </section>
  )
}

const Portfolio: React.FC = () => {
  return (
    <main className="portfolio">
      
      <header className="cover-area">
        <div className="container">
          <div className="cover"></div>
          <div className="profile-photo">
            <img src={junheeImg} alt="junhee"/>
          </div>

          <h1>몰입하는 개발자, 황준희입니다.</h1>
        </div>
      </header>
      
      {
        INFO_DATA.map((data) => <InfoComponent {...data} />)
      }

      <BlockEditor connectStoreHook={useConnectEditor} />

    </main>
  )
} 

export default Portfolio;