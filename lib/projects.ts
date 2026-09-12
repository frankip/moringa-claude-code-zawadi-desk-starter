export type ProjectStatus = "active" | "paused" | "complete";

export type Project = {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  updatedAt: string;
};

export type ProjectList = {
  items: Project[];
  total: number;
};

const projects: Project[] = [
  {
    id: "project-zawadi",
    name: "Zawadi Desk",
    owner: "Operations",
    status: "active",
    updatedAt: "2026-09-10T08:00:00.000Z",
  },
  {
    id: "project-onboarding",
    name: "New hire onboarding",
    owner: "People",
    status: "paused",
    updatedAt: "2026-09-08T11:30:00.000Z",
  },
];

export function listProjects(): ProjectList {
  return { items: projects, total: projects.length };
}

export function findProject(projectId: string): Project | undefined {
  return projects.find((project) => project.id === projectId);
}

export function findProjectOrThrow(projectId: string): Project {
  const project = findProject(projectId);
  if (!project) {
    throw new Error(`Project ${projectId} was not found.`);
  }
  return project;
}
