export type ProjectStatus = "active" | "paused" | "complete";

export type Project = {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  updatedAt: string;
  description: string;
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
    description: "We give gifts to developers around the world"
  },
  {
    id: "project-onboarding",
    name: "New hire onboarding",
    owner: "People",
    status: "paused",
    updatedAt: "2026-09-08T11:30:00.000Z",
    description: "We are open to collaborate with just anyone who is non vibe coder"
  },
];

export function listProjects(): ProjectList {
  return { items: projects, total: projects.length };
}

export function findProject(projectId: string): Project | undefined {
  return projects.find((project) => project.id === projectId);
}

export function findProjectOrThrow(projectName: string): Project {
  const project = projects.find(project => project.name.toLowerCase().includes(projectName.toLowerCase()))
  if (project) return project;
  throw new Error("No project with that name")
}
