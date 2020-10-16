const ENDPOINT ='http://localhost:8084/client/login';

export default function login ({ email, password }){
  return fetch(`${ENDPOINT}`, {
    crossDomain:true,
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  }).then(res => {
    if (!res.ok) throw new Error('Response is NOT ok')
    return res.json()
  }).then(res => {
    const jwt  = res.token
    return jwt
  })
}
