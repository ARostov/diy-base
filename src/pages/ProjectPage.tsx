import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { StepsAccordion } from '../components/Project/StepsAccordion';
import './ProjectPage.css';

export function ProjectPage() {
    const { projectId } = useParams();
    const { projects } = useProjects();
    const [activeTab, setActiveTab] = useState<'steps' | 'materials'>('steps');

    const project = projects?.projects.find(p => p.id === projectId);

    // Безопасно получаем mainSection с проверкой
    const mainSection = project?.children?.find(c => c.type === 'regular');

    if (!project) {
        return <div>Проект не найден</div>;
    }

    return (
        <div className="project-page">
            <div className="project-header">
                <h1>⛰️ {project.name}</h1>
                {/* Проверяем существование description перед отображением */}
                {project.description && (
                    <p className="project-description">{project.description}</p>
                )}
            </div>

            <div className="project-tabs">
                <button
                    className={`tab-btn ${activeTab === 'steps' ? 'active' : ''}`}
                    onClick={() => setActiveTab('steps')}
                >
                    📋 Пошаговый монтаж
                </button>
                <button
                    className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
                    onClick={() => setActiveTab('materials')}
                >
                    🛒 Материалы
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'steps' && (
                    <div className="steps-tab">
                        <div className="info-note">
                            ⏱️ 4–6 дней самостоятельной работы + 1 день сварщика на ворота. Все шаги проверены, под твой план.
                        </div>
                        {/* Проверяем существование steps перед рендером */}
                        {mainSection?.steps ? (
                            <StepsAccordion steps={mainSection.steps} />
                        ) : (
                            <p>Шаги не найдены</p>
                        )}
                    </div>
                )}

                {activeTab === 'materials' && (
                    <div className="materials-tab">
                        <div className="material-header">Спецификация материалов</div>

                        {mainSection?.specification && mainSection.specification.length > 0 ? (
                            <>
                                <div className="material-grid">
                                    <span>Материал</span>
                                    <span>Кол-во</span>
                                    <span>Ед.</span>
                                    <span>Примечание</span>
                                </div>

                                {mainSection.specification.map((item, idx) => (
                                    <div key={idx} className="material-row">
                                        <span className="material-name">{item.materialId}</span>
                                        <span>{item.quantity}</span>
                                        <span>{item.unit}</span>
                                        <span className="material-notes">{item.notes || ''}</span>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>Материалы не найдены</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}