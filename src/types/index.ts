export type ProjectStatus = 'idea' | 'design' | 'construction' | 'completed';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  description?: string;
  children?: ProjectNode[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectNode = RegularProject | VariantGroup | VariantProject;

export interface RegularProject {
  id: string;
  name: string;
  type: 'regular';
  specification?: SpecificationItem[];
  steps?: Step[];
  children?: ProjectNode[];
}

export interface VariantGroup {
  id: string;
  name: string;
  type: 'variant-group';
  activeVariantId: string | null;
  variants: VariantProject[];
}

export interface VariantProject {
  id: string;
  name: string;
  type: 'variant';
  specification?: SpecificationItem[];
  steps?: Step[];
}

export interface SpecificationItem {
  materialId: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface Step {
  id: string;
  order: number;
  title: string;
  description: string;
  details?: string[];         // добавить
  tip?: string;              // добавить
  knowledgeRefs?: string[];
  materialRefs?: string[];
  materials?: string[];       // добавить (для совместимости)
}

// Материалы
export interface Material {
  id: string;
  name: string;
  unit: string;
  description?: string;
  category?: string;
}

export interface MaterialCategory {
  name: string;
  materials: Material[];
}

// Поставщики
export interface Supplier {
  id: string;
  name: string;
  contacts: string;
  note?: string;
}

// Цены
export interface Price {
  materialId: string;
  supplierId: string;
  price: number;
  date: string;
  note?: string;
}

// База знаний
export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
}

export interface KnowledgeSubcategory {
  name: string;
  articles: KnowledgeArticle[];
}

export interface KnowledgeCategory {
  name: string;
  subcategories: KnowledgeSubcategory[];
}

// Корневые типы для Gist файлов
export interface ProjectsFile {
  version: string;
  lastUpdated: string;
  projects: Project[];
}

export interface MaterialsFile {
  version: string;
  categories: MaterialCategory[];
}

export interface SuppliersFile {
  version: string;
  suppliers: Supplier[];
}

export interface PricesFile {
  version: string;
  prices: Price[];
}

export interface KnowledgeFile {
  version: string;
  categories: KnowledgeCategory[];
}
