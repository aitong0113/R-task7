//管理token
// 設定後台 token
export const setAdminToken = (token, expired) => {
  const expireDate = new Date(expired * 1000);

  document.cookie =
    `hexToken=${token}; expires=${expireDate.toUTCString()}; path=/`;
};

// 取得 token
export const getAdminToken = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};

// 清除 token
export const removeAdminToken = () => {
  document.cookie = 'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};