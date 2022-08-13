/**
 * @description 下载文件
 * @param url 下载链接
 */
function downloadFile(url: string) {
  const element = document.createElement('a');
  element.href = url;
  element.download = url;
  element.target = '_blank';
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * @description 获取 cookie
 * @param name cookie 字段名
 */
function getCookie(name: string): string | undefined {
  const cookies = document.cookie;
  if (!cookies) return;
  const needItem = cookies.split('; ').find((item) => item?.split('=')?.[0] === name);
  return needItem?.split('=')[1];
}

export { downloadFile, getCookie };
