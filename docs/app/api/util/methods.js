import { urlEncode } from './urlEncode';

async function processResponse(response) {
   if (response.status == 201) return null;
   try {
      return response.json();
   } catch (e) {
      console.warn('Could not parse response.', e);
      return null;
   }
}

async function checkOk(r) {
   if (r.ok) return r;
   let data;
   try {
      data = await r.json();
   } catch {}
   if (data?.error) {
      let err = new Error(data.error);
      err.statusText = r.statusText;
      throw err;
   }
   throw Error(r.statusText);
}

let apiBaseUrl = '/api/';

export function resolveAPIUrl(path, query) {
   let qs = '';
   if (typeof query == 'object' && query) qs = '?' + urlEncode(query);
   return apiBaseUrl + path + qs;
}

const defaultOptions = {
   authorize: true,
   method: 'GET',
};

export function resolveFetchOptions(options) {
   let fetchOptions = {
      headers: options.headers || {},
      method: options.method || 'GET',
      body: options.body,
   };

   // if (options.authorize)
   //     fetchOptions.headers["authorization"] = `Bearer ${access_token}`;
   return fetchOptions;
}

export async function doFetch(path, options = defaultOptions) {
   let url = resolveAPIUrl(path, options.query);
   let fetchOptions = resolveFetchOptions(options);
   let response = await fetch(url, fetchOptions);
   response = await checkOk(response);
   return response;
}

export function GET(url, options = defaultOptions) {
   return doFetch(url, {
      ...options,
      headers: {
         Accept: 'application/json',
      },
   }).then((x) => x.json());
}

export async function PATCH(url, data, options = defaultOptions) {
   let response = await doFetch(url, {
      ...options,
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, null, 2),
   });
   return await processResponse(response);
}

export async function POST(url, data, options = defaultOptions) {
   let response = await doFetch(url, {
      options,
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      body: JSON.stringify(data, null, 2),
   });
   return await processResponse(response);
}

export async function PUT(url, data) {
   let response = await doFetch(url, {
      ...defaultOptions,
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      body: JSON.stringify(data, null, 2),
   });
   return await processResponse(response);
}

export async function DELETE(url, options = defaultOptions) {
   await doFetch(url, {
      ...options,
      method: 'DELETE',
   });
}
