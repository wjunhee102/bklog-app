function getCookieList() {
  return document.cookie;
}

function getCookie(name: string): string | null {
  const cookieList:any = document.cookie;
    
  if(cookieList) {
    const cookieValue = cookieList? 
      cookieList
      .split("; ")
      .find((row: any) => row.startsWith(name))
      .split("=")[1] : null;

    return cookieValue;
  } else {
    return null;
  }
}

const CookieUtils = {
  getCookie,
  getCookieList
}

export default CookieUtils;