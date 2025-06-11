import { renamePlayground, deletePlayground } from '../../../../lib/db';
export async function PUT(request, { params }) {
  const { id } = params;
  const { title } = await request.json();

  const updated = renamePlayground(id, title);
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  const { id } = params;

  deletePlayground(id);
  return new Response(null, { status: 204 });
}