import { StorageService } from './storage';
import {
  ProjectsFile,
  MaterialsFile,
  SuppliersFile,
  PricesFile,
  KnowledgeFile
} from '../types';

export class GistStorage implements StorageService {
  private _gistId: string | null = null;
  private _token: string | null = null;

  constructor(gistId?: string, token?: string) {
    this._gistId = gistId || localStorage.getItem('diy_base_gist_id');
    this._token = token || localStorage.getItem('github_token');
  }

  // Проекты
  async getProjects(): Promise<ProjectsFile | null> {
    return {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      projects: [
        {
          id: 'proj_fence_1',
          name: 'Забор 30 м + распашные ворота 4 м + калитка',
          status: 'construction',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-25',
          description: 'Участок — твердая супесь • штакетник двусторонний • М‑образный профиль • ворота на 3 столбах 100х100 • лаги с двух сторон',
          children: [
            {
              id: 'fence_main',
              name: 'Секции забора',
              type: 'regular',
              specification: [
                { materialId: 'mat_profile_60', quantity: 10, unit: 'шт', notes: 'Труба 60×60×3, 3м для рядовых столбов' },
                { materialId: 'mat_screw_108', quantity: 4, unit: 'шт', notes: 'Винтовые сваи 108×2500 для ворот' },
                { materialId: 'mat_profile_100', quantity: 2, unit: 'шт', notes: 'Труба 100×100×4, 3.5м для воротных столбов' },
                { materialId: 'mat_profile_40x20', quantity: 120, unit: 'м', notes: 'Профтруба 40×20×2 для лаг (с двух сторон)' },
                { materialId: 'mat_profile_20x20', quantity: 60, unit: 'м', notes: 'Профтруба 20×20×1.5 для штакетника (каркас)' },
                { materialId: 'mat_plank', quantity: 300, unit: 'шт', notes: 'Штакетник двусторонний, 100×20 мм, L=1.8м' },
                { materialId: 'mat_gravel', quantity: 0.5, unit: 'м³', notes: 'Щебень 20-40 мм для подсыпки' },
                { materialId: 'mat_bitumen', quantity: 3, unit: 'кг', notes: 'Битумная мастика для обработки низа труб' },
                { materialId: 'mat_concrete', quantity: 0.2, unit: 'м³', notes: 'Бетон М300 для заливки свай' },
                { materialId: 'mat_hinges', quantity: 6, unit: 'шт', notes: 'Петли гаражные усиленные для ворот и калитки' },
                { materialId: 'mat_self_screws', quantity: 500, unit: 'шт', notes: 'Саморезы кровельные 4.8×29 с прессшайбой' }
              ],
              steps: [
                {
                  id: 'step_1',
                  order: 1,
                  title: 'Разметка и подготовка',
                  description: 'Натягиваем шнур по линии забора, отмечаем крайние точки, ворота (4 м) и калитку (1 м).',
                  details: [
                    'Колышки, шнурка, рулетка',
                    'Проверить диагонали проёма ворот (важно для сварщика)',
                    'Отметить места рядовых столбов с шагом 2.5 м',
                    'Учесть уклон — первый и последний столб выставить по лазерному уровню'
                  ],
                  tip: 'используй лазер + камеру телефона, если солнце мешает',
                  materials: ['mat_pegs']
                },
                {
                  id: 'step_2',
                  order: 2,
                  title: 'Бурение ям под рядовые столбы',
                  description: 'Глубина 70 см, диаметр 200–250 мм.',
                  details: [
                    'Мотобур или ручной бур. Для 10 ям — 4–6 часов',
                    'Старайся держать вертикаль'
                  ],
                  materials: ['mat_auger']
                },
                {
                  id: 'step_3',
                  order: 3,
                  title: 'Зондирование арматурой (на камни)',
                  description: 'Арматура 12 мм с заострённым концом.',
                  details: [
                    'Протыкаем дно каждой ямы на глубину ещё 50 см',
                    'Если упёрлись в камень — пробуем рядом или бурим глубже вручную',
                    'Это твой метод избежать сюрпризов при забивке'
                  ],
                  materials: ['mat_rebar']
                },
                {
                  id: 'step_4',
                  order: 4,
                  title: 'Установка и забивка рядовых столбов',
                  description: 'Труба 60×60×3, 3 м',
                  details: [
                    'Низ трубы обработать битумной мастикой (до 1.2 м)',
                    'Ставим столб на дно ямы, подсыпаем немного щебня для фиксации',
                    'Забиваем кувалдой через насадку на расчётную глубину: 3 м (труба) – 1.8 м (над землёй) – 0.7 м (яма) = 0.5 м забивки',
                    'После забивки над землёй ровно 1.8 м (проверить шнуром)',
                    'Контролировать вертикаль уровнем'
                  ],
                  materials: ['mat_profile_60', 'mat_bitumen', 'mat_gravel']
                },
                {
                  id: 'step_5',
                  order: 5,
                  title: 'Подсыпка щебня и трамбовка',
                  description: 'Щебень 20–40 мм, фракция твоя любимая.',
                  details: [
                    'Засыпаем яму послойно, каждые 20 см проливаем водой и трамбуем (ручная трамбовка или брус)',
                    'Верхний слой можно сделать конусом для отвода воды',
                    'Для всех 10 рядовых столбов'
                  ],
                  materials: ['mat_gravel']
                },
                {
                  id: 'step_6',
                  order: 6,
                  title: 'Установка свай под ворота (4 шт)',
                  description: 'Винтовые сваи 108 мм, длина 2.5 м.',
                  details: [
                    'Вкручиваем строго вертикально на глубину 2 м (ниже промерзания)',
                    'По 2 сваи под каждый крайний воротный столб (левый и правый)',
                    'Обрезаем по уровню: над землёй 10–15 см',
                    'Заливаем внутрь бетон М300 (армирование не обязательно)'
                  ],
                  materials: ['mat_screw_108', 'mat_concrete']
                },
                {
                  id: 'step_7',
                  order: 7,
                  title: 'Сварка ворот, калитки и столбов (мастер)',
                  description: 'Приглашаем сварщика на 1 день.',
                  details: [
                    'Приваривает воротные столбы 100×100×4 к сваям',
                    'Варит каркас ворот (две створки по 2 м) и калитки (1 м) по твоим размерам',
                    'Лаги на воротах и калитке приваривает сразу (по 3 лаги с каждой стороны)',
                    'Приваривает петли, засовы, ограничители',
                    'Следит за геометрией — проверяй диагонали'
                  ],
                  tip: 'Ты заранее подготавливаешь трубы и фурнитуру',
                  materials: ['mat_profile_100', 'mat_profile_40x20', 'mat_hinges', 'mat_locks']
                }
              ]
            }
          ]
        }
      ]
    };
  }

  async saveProjects(data: ProjectsFile): Promise<boolean> {
    console.log('Save projects:', data);
    // Здесь будет логика сохранения в Gist
    return true;
  }

  // Материалы
  async getMaterials(): Promise<MaterialsFile | null> {
    return {
      version: '1.0',
      categories: [
        {
          name: 'Трубы профильные',
          materials: [
            {
              id: 'mat_profile_60',
              name: 'Профтруба 60×60×3',
              unit: 'шт',
              description: 'Для рядовых столбов забора, длина 3м'
            },
            {
              id: 'mat_profile_100',
              name: 'Профтруба 100×100×4',
              unit: 'шт',
              description: 'Для воротных столбов, длина 3.5м'
            },
            {
              id: 'mat_profile_40x20',
              name: 'Профтруба 40×20×2',
              unit: 'м',
              description: 'Для лаг (прожилин)'
            },
            {
              id: 'mat_profile_20x20',
              name: 'Профтруба 20×20×1.5',
              unit: 'м',
              description: 'Для каркаса штакетника'
            }
          ]
        },
        {
          name: 'Фундамент и опоры',
          materials: [
            {
              id: 'mat_screw_108',
              name: 'Винтовая свая 108×2500',
              unit: 'шт',
              description: 'Для воротных столбов'
            }
          ]
        },
        {
          name: 'Заборные материалы',
          materials: [
            {
              id: 'mat_plank',
              name: 'Штакетник двусторонний',
              unit: 'шт',
              description: '100×20 мм, длина 1.8м'
            }
          ]
        },
        {
          name: 'Сыпучие материалы',
          materials: [
            {
              id: 'mat_gravel',
              name: 'Щебень 20-40 мм',
              unit: 'м³',
              description: 'Для подсыпки и дренажа'
            },
            {
              id: 'mat_concrete',
              name: 'Бетон М300',
              unit: 'м³',
              description: 'Для заливки свай'
            }
          ]
        },
        {
          name: 'Метизы и крепеж',
          materials: [
            {
              id: 'mat_bitumen',
              name: 'Битумная мастика',
              unit: 'кг',
              description: 'Для гидроизоляции труб'
            },
            {
              id: 'mat_hinges',
              name: 'Петли гаражные усиленные',
              unit: 'шт',
              description: 'С подшипником для ворот'
            },
            {
              id: 'mat_self_screws',
              name: 'Саморезы кровельные 4.8×29',
              unit: 'шт',
              description: 'С прессшайбой и буром'
            }
          ]
        },
        {
          name: 'Инструмент и оснастка',
          materials: [
            {
              id: 'mat_pegs',
              name: 'Колышки разметочные',
              unit: 'компл',
              description: 'Деревянные или арматурные'
            },
            {
              id: 'mat_auger',
              name: 'Бур садовый/мотобур',
              unit: 'усл',
              description: 'Диаметр 200-250 мм'
            },
            {
              id: 'mat_rebar',
              name: 'Арматура 12 мм',
              unit: 'м',
              description: 'Для зондирования грунта'
            },
            {
              id: 'mat_locks',
              name: 'Засовы и ограничители',
              unit: 'компл',
              description: 'Для ворот и калитки'
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

  // Поставщики
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

  // Цены
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

  // База знаний
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