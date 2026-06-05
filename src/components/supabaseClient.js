
// apikey bliver hentet fra .env fil så den aldrig bliver hard coded
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

// Fetcher alle rækker fra events tabellen.
export async function fetchEvents() {
  const url = import.meta.env.VITE_SUPABASE_EVENTS_URL;

  // Hvis env variable mangler, så kommer der et tomt array i stedet for at den bare crasher
  if (!url) {
    return [];
  }

  return fetchFromSupabase(url);
}

// Opretter en ny event-række. `Prefer: return=representation` får Supabase
// til at returnere den oprettede række (med sit genererede id) i stedet for et tomt svar.
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

// Henter alle rækker fra opslag-tabellen.
export async function fetchPosts() {
  const url = import.meta.env.VITE_SUPABASE_OPSLAG_URL;

  if (!url) {
    return [];
  }

  return fetchFromSupabase(url);
}

// Uploader en billedfil til Supabase Storage og returnerer den offentlige URL.
// Filnavnet får et tidsstempel som præfiks for at undgå navnekollisioner.
export async function uploadImage(file) {
  const storageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL;
  const fileName = `${Date.now()}-${file.name}`;

  const response = await fetch(`${storageUrl}/images/${fileName}`, {
    method: "POST",
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_APIKEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_APIKEY}`,
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  // Returnerer den offentlige URL så den kan gemmes sammen med opslaget.
  return `${storageUrl}/public/images/${fileName}`;
}

// Opretter en ny opslag-række og returnerer den oprettede række fra Supabase.
export async function createPost(post) {
  const url = import.meta.env.VITE_SUPABASE_OPSLAG_URL;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_APIKEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_APIKEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  return response.json();
}

// Sletter et enkelt opslag ud fra id via PostgREST-filteret `?id=eq.<id>`.
export async function deletePost(postId) {
  const url = import.meta.env.VITE_SUPABASE_OPSLAG_URL;

  const response = await fetch(`${url}?id=eq.${postId}`, {
    method: "DELETE",
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_APIKEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_APIKEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Delete failed: ${response.status}`);
  }
}

// Henter et enkelt opslag ud fra id. Returnerer null hvis ikke fundet eller env-variabel mangler.
// Supabase returnerer altid et array selv ved enkelt-række-filtre, så vi destructurer det.
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
