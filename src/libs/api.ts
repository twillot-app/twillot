export async function mem({ datalist, key }) {
  const res = await fetch('https://api.mem.ai/v0/mems/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiAccessToken ${key}`,
    },
    body: JSON.stringify(datalist),
  })
  const items = await res.json()
  return items
}
