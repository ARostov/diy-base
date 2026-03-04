import { StorageService } from './storage.ts';
import {
  ProjectsFile,
  MaterialsFile,
  SuppliersFile,
  PricesFile,
  KnowledgeFile
} from '../types';

export class GistStorage implements StorageService {
  private gistId: string | null = null;
  private token: string | null = null;

  constructor(gistId?: string, token?: string) {
    this.gistId = gistId || localStorage.getItem('diy_base_gist_id');
    this.token = token || localStorage.getItem('github_token');
  }

  async getProjects(): Promise<ProjectsFile | null> {
    // Заглушка для MVP - вернем тестовые данные
    return {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      projects: [
        {
          id: 'proj_1',
          name: 'Забор на даче',
          status: 'construction',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-25',
          children: [
            {
              id: 'proj_1_sections',
              name: 'Секции забора',
              type: 'regular',
              specification: [
                {
                  materialId: 'mat_1',
                  quantity: 120,
                  unit: 'м'
                }
              ],
              steps: [
                {
                  id: 'step_1',
                  order: 1,
                  title: 'Разметка участка',
                  description: 'Натянуть шнур между угловыми колышками, проверить диагонали',
                  knowledgeRefs: []
                }
              ]
            },
            {
              id: 'proj_1_gates',
              name: 'Ворота',
              type: 'variant-group',
              activeVariantId: 'proj_1_gates_sliding',
              variants: [
                {
                  id: 'proj_1_gates_sliding',
                  name: 'Откатные ворота',
                  type: 'variant',
                  specification: [
                    {
                      materialId: 'mat_3',
                      quantity: 1,
                      unit: 'компл',
                      notes: 'Комплект фурнитуры для откатных ворот до 4м'
                    }
                  ]
                },
                {
                  id: 'proj_1_gates_hinged',
                  name: 'Распашные ворота',
                  type: 'variant',
                  specification: [
                    {
                      materialId: 'mat_4',
                      quantity: 4,
                      unit: 'шт',
                      notes: 'Петли гаражные усиленные'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'proj_2',
          name: 'Дорога к участку',
          status: 'idea',
          createdAt: '2024-01-20',
          updatedAt: '2024-01-20'
        }
      ]
    };
  }

  async saveProjects(data: ProjectsFile): Promise<boolean> {
    console.log('Save projects:', data);
    return true;
  }

  async getMaterials(): Promise<MaterialsFile | null> {
    return {
      version: '1.0',
      categories: [
        {
          name: 'Трубы профильные',
          materials: [
            {
              id: 'mat_1',
              name: 'Профтруба 60х60х3',
              unit: 'м',
              description: 'Для столбов'
            },
            {
              id: 'mat_2',
              name: 'Профтруба 40х20х2',
              unit: 'м',
              description: 'Для лаг'
            }
          ]
        },
        {
          name: 'Фурнитура для ворот',
          materials: [
            {
              id: 'mat_3',
              name: 'Комплект откатных ворот',
              unit: 'компл',
              description: 'Ролики, направляющая, уловители'
            },
            {
              id: 'mat_4',
              name: 'Петли гаражные',
              unit: 'шт',
              description: 'Усиленные, с подшипником'
            }
          ]
        }
      ]
    };
  }

  async saveMaterials(data: MaterialsFile): Promise<boolean> {
    console.log('Save materials:', data);
    return true;
  }

  async getSuppliers(): Promise<SuppliersFile | null> {
    return {
      version: '1.0',
      suppliers: [
        {
          id: 'sup_1',
          name: 'Металлобаза на Южной',
          contacts: '+7 (999) 123-45-67',
          note: 'Есть доставка, работают в субботу'
        }
      ]
    };
  }

  async saveSuppliers(data: SuppliersFile): Promise<boolean> {
    console.log('Save suppliers:', data);
    return true;
  }

  async getPrices(): Promise<PricesFile | null> {
    return {
      version: '1.0',
      prices: [
        {
          materialId: 'mat_1',
          supplierId: 'sup_1',
          price: 850,
          date: '2024-01-15',
          note: 'за метр'
        }
      ]
    };
  }

  async savePrices(data: PricesFile): Promise<boolean> {
    console.log('Save prices:', data);
    return true;
  }

  async getKnowledge(): Promise<KnowledgeFile | null> {
    return {
      version: '1.0',
      categories: [
        {
          name: 'Фундамент',
          subcategories: [
            {
              name: 'Столбчатый фундамент',
              articles: [
                {
                  id: 'kb_1',
                  title: 'Как бурить ямы под столбы',
                  content: 'Для бурения ям под столбы лучше всего использовать садовый бур диаметром 200мм...'
                }
              ]
            }
          ]
        }
      ]
    };
  }

  async saveKnowledge(data: KnowledgeFile): Promise<boolean> {
    console.log('Save knowledge:', data);
    return true;
  }
}
