test("regTest", () => {
  const regTest = /(-?[a-z]-?)*[a-z]*:|[\w]*;/g;

  const str = "{background-color: asdd; color: -a: asdsad1: 100}";

  console.log(str.match(regTest));

  const regTest2 = /(<span[\s](.*)>(.*)<\/span>)|(<a href="(.*)">(.*)<\/a>)/g;

  const html = `
    <span style="dada">span1</span>,
    <span>span2</span>태그에 감싸져있지 않음.
    <div>div1</div>그냥 값
    <span>망가져있는 값</>
    <a href="http://ss">asdasd</a>
  `;

  console.log(html.split(regTest2));
});