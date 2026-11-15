import { readJson, writeJson } from '../../core/lib/storage';
import { defaultFeatures, templateById, TEMPLATES } from './templates';

// Apparna man byggt, i den här webbläsaren. html är null så länge appen
// byggs från mallen; när AI:n ändrat den står koden där, och history har de
// tidigare versionerna (för Ångra). data är appens egen lagring.
export const PROJECTS_KEY = 'kodskolan-bygg-projekt';

const isProjectList = value =>
  Array.isArray(value) &&
  value.every(
    item =>
      item &&
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      (item.template === 'eget' || templateById(item.template)),
  );

export const readProjects = () => readJson(PROJECTS_KEY, [], isProjectList);
export const writeProjects = projects => writeJson(PROJECTS_KEY, projects);

export function newProject(templateId = TEMPLATES[0].id) {
  const template = templateById(templateId);
  return {
    id: `app-${Date.now().toString(36)}`,
    name: template?.defaultName ?? 'Min app',
    template: templateId,
    features: template ? defaultFeatures(template) : {},
    theme: 'ljus',
    accent: 'lila',
    html: null,
    history: [],
    changes: [],
    data: {},
    updatedAt: new Date().toISOString(),
  };
}

// Appens kod och förklaringar just nu.
export function buildProject(project) {
  if (project.html) return { html: project.html, parts: [] };
  const template = templateById(project.template);
  if (!template) return { html: '', parts: [] };
  return template.build({
    name: project.name.trim() || template.defaultName,
    theme: project.theme,
    accent: project.accent,
    features: project.features,
  });
}

// Filnamnet när appen laddas ner: "Mitt schema" → "mitt-schema.html".
export const fileName = name =>
  `${
    name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'min-app'
  }.html`;
