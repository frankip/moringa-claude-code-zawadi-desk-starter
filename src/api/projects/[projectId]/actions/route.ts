import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { findProject } from "@/lib/projects";
import { addAction, listActions } from "@/src/repositories/actionsRepository";
import { projectNotFound, validationFailed } from "@/src/errors";

type RouteContext = {
  params: Promise<{ projectId: string }>;
};

async function getProjectId(context: RouteContext) {
  const { projectId } = await context.params;
  return projectId;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const projectId = await getProjectId(context);
  if (!findProject(projectId)) {
    const error = projectNotFound(projectId);
    return NextResponse.json({ code: error.code, message: error.message }, { status: error.status });
  }

  return NextResponse.json(listActions(projectId));
}

export async function POST(request: NextRequest, context: RouteContext) {
  const projectId = await getProjectId(context);
  if (!findProject(projectId)) {
    const error = projectNotFound(projectId);
    return NextResponse.json({ code: error.code, message: error.message }, { status: error.status });
  }

  const body = await request.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const owner = typeof body.owner === "string" ? body.owner.trim() : "";
  const dueDate = body.dueDate === null || typeof body.dueDate === "string" ? body.dueDate : null;

  const fields: string[] = [];
  if (!title) fields.push("title");
  if (!owner) fields.push("owner");

  if (fields.length > 0) {
    const error = validationFailed(fields);
    return NextResponse.json({ code: error.code, message: error.message, fields: error.fields }, { status: error.status });
  }

  const action = addAction(projectId, {
    id: nanoid(),
    title,
    owner,
    dueDate,
    status: "open",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json(action, { status: 201 });
}
