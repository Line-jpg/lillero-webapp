async function fetchFromSupabase(url) {
  const response = await fetch(`${url}?select=*`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_APIKEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_APIKEY}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchEvents() {
  const url = import.meta.env.VITE_SUPABASE_EVENTS_URL;

  if (!url) {
    return [];
  }

  return fetchFromSupabase(url);
}

export async function createEvent(event) {
  const url = import.meta.env.VITE_SUPABASE_EVENTS_URL;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_APIKEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_APIKEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchPosts() {
  const url = import.meta.env.VITE_SUPABASE_OPSLAG_URL;

  if (!url) {
    return [];
  }

  return fetchFromSupabase(url);
}

export async function fetchPostById(postId) {
  const url = import.meta.env.VITE_SUPABASE_OPSLAG_URL;

  if (!url || !postId) {
    return null;
  }

  const response = await fetch(`${url}?id=eq.${postId}&select=*`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_APIKEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_APIKEY}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  const [post] = await response.json();
  return post ?? null;
}
