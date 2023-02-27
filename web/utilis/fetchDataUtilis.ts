export async function fetchServerData(apiPath: string) {
  // GET
  let res = await fetch(import.meta.env.VITE_SERVER_API + apiPath);

  let data = await res.json();
  return data;
}

// "/api/todo/postItem"
export async function fetchServerDataNonGet( // fetch without file
  apiPath: string,
  method: "PUT" | "POST" | "PATCH" | "DELETE",
  data: any
) {
  const res = await fetch(import.meta.env.VITE_SERVER_API + apiPath, {
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let resData = await res.json();

  return resData;
}

export async function fetchServerDataForm( // fetch with file
  apiPath: string,
  method: "PUT" | "POST" | "PATCH" | "DELETE",
  data: FormData
) {
  const res = await fetch(import.meta.env.VITE_SERVER_API + apiPath, {
    method: method,
    body: data,
  });

  let resData = await res.json();
  return resData;
}
