export const CHANGE_DARK_MODE = "base/CHANGE_DARK_MODE" as const;
export const SERVER_DISCONNECTED = "base/SERVER_DISCONNECTED" as const;
export const INIT = "base/INIT" as const;

export const changeDarkMode = () => {
  return {
    type: CHANGE_DARK_MODE
  }
}

const disconnectedSever = (error: any) => {
  return {
    type: SERVER_DISCONNECTED,
    payload: {
      error
    }
  }
}

export function init() {
  return {
    type: INIT
  }
}

export type BaseActions = ReturnType<typeof changeDarkMode> 
  | ReturnType<typeof disconnectedSever>
  | ReturnType<typeof init>
;

export const CHROME   = "Chrome" as const;
export const OPERA    = "Opera" as const;
export const SAFARI   = "Safari" as const;
export const FIREFOX  = "Firefox" as const;
export const EDGE     = "Edge" as const;
export const EXPLORER = "Explorer" as const;
export const UNKNOWN  = "Unknown" as const;

type BrowserType = typeof CHROME 
  | typeof SAFARI
  | typeof FIREFOX
  | typeof EDGE
  | typeof EXPLORER
  | typeof OPERA
  | typeof UNKNOWN
;

export interface BaseState {
  dark: boolean;
  error: any;
  browser: BrowserType;
}

export type BaseStateProps = {
  [P in keyof BaseState]?: BaseState[P];
}

export function isBrowserCheck(): BrowserType { 
	const agt = navigator.userAgent.toLowerCase(); 
	if(agt.indexOf("chrome") !== -1) return CHROME; 
	if(agt.indexOf("opera") !== -1) return OPERA; 
	if(agt.indexOf("firefox") !== -1) return FIREFOX; 
	if(agt.indexOf("safari") !== -1) return SAFARI; 
  if(agt.indexOf("edge") !== -1)  return EDGE;
	if(agt.indexOf("msie") !== -1) { 
    	let rv = -1; 
		if (navigator.appName == 'Microsoft Internet Explorer') { 
			let ua = navigator.userAgent; var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); 
		if (re.exec(ua) != null) 
			rv = parseFloat(RegExp.$1); 
		} 
		return EXPLORER; 
	} 

  return UNKNOWN;
}
