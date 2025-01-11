const apiUrl = process.env.API_URL || 'http://localhost:4000';


export async function getCounter() {
  const response = await fetch(`${apiUrl}/counter`);
  return response.text();
}