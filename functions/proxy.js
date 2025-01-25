const fetch = require('node-fetch');
const defaultDomain = '123av.com';
const domainMap = {
  '_123av.mrst.one': '123av.com',
  '_www-netflav.mrst.one': 'www.netflav.com',
  'proxy-123av.netlify.app': '123av.com',
}

exports.handler = async function (event, context) {
  console.log(event);

  const proxyUrl = new URL(event.rawUrl);
  const proxyDomain = proxyUrl.hostname;
  const proxyPath = proxyUrl.pathname;
  const proxySearch = proxyUrl.search;

  const originDomain = domainMap[proxyDomain] ? domainMap[proxyDomain] : defaultDomain;
  const originUrl = new URL('https://' + originDomain + proxyPath + proxySearch)

  // originResponse
  const originHeaders = new Headers();
  Object.entries(event.headers).forEach(([headerName, headerContent]) => {
    if (headerName.includes('CF-') || headerName == 'X-Forward-For') return;
    originHeaders.append(headerName, headerContent);
  });

  originHeaders.set("host", originDomain);
  originHeaders.set("referer", 'https://' + originDomain);
  originHeaders.set("origin", 'https://' + originDomain);

  const fetchOptions = {
    method: event.httpMethod,
    headers: originHeaders,
    redirect: "manual",
  }

  if (['GET', 'HEAD'].includes(event.httpMethod) === false) {
    fetchOptions.body = event.body;
  }

  const response = await fetch(originUrl, fetchOptions)

  return {
    statusCode: response.status,
    headers: response.headers,
    body: await response.text(),
  }
}