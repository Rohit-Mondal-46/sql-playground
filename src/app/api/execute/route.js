import { runQuery } from '../../../lib/execute';
import { addHistory } from '../../../lib/db';

export async function POST(request) {
  const body = await request.json();
  const { query, playgroundId } = body;

  const result = await runQuery(query, playgroundId); // pass ID here

  if (result.success) {
    addHistory(playgroundId, query);
  }

  return Response.json(result);
}
