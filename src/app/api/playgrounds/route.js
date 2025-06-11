import { getAllPlaygrounds, createPlayground } from '../../../lib/db';
export async function GET() {
  const data = getAllPlaygrounds();
  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const result = createPlayground(body.title);
  return Response.json(result, { status: 201 });
}