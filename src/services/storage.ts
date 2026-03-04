import {
  ProjectsFile,
  MaterialsFile,
  SuppliersFile,
  PricesFile,
  KnowledgeFile
} from '../types';

export interface StorageService {
  // Проекты
  getProjects(): Promise<ProjectsFile | null>;
  saveProjects(data: ProjectsFile): Promise<boolean>;

  // Материалы
  getMaterials(): Promise<MaterialsFile | null>;
  saveMaterials(data: MaterialsFile): Promise<boolean>;

  // Поставщики
  getSuppliers(): Promise<SuppliersFile | null>;
  saveSuppliers(data: SuppliersFile): Promise<boolean>;

  // Цены
  getPrices(): Promise<PricesFile | null>;
  savePrices(data: PricesFile): Promise<boolean>;

  // База знаний
  getKnowledge(): Promise<KnowledgeFile | null>;
  saveKnowledge(data: KnowledgeFile): Promise<boolean>;
}
