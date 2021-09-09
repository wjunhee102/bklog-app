export const regEmail    = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);
export const regPassword = new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/);
export const regPenName  = new RegExp(/^[a-zA-Z0-9].{3,12}$/);
export const regName     = new RegExp(/\s/g);