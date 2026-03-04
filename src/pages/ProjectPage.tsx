import { useState } from 'react';
import { useParams } from 'react-router-dom';  // этот импорт должен быть
import { useProjects } from '../hooks/useProjects';
import { StepsAccordion } from '../components/Project/StepsAccordion';
import './ProjectPage.css';

export function ProjectPage() {
    const { projectId } = useParams();  // получаем ID из URL
    const { projects } = useProjects();
    const [activeTab, setActiveTab] = useState<'steps' | 'materials'>('steps');

    console.log('ProjectPage render, projectId:', projectId); // добавим для отладки
    console.log('Projects:', projects); // и это

    const project = projects?.projects.find(p => p.id === projectId);
    const mainSection = project?.children?.find(c => c.type === 'regular');

    if (!project) {
        return <div>Проект не найден. ID: {projectId}</div>;
    }

    return (
        <div className="project-page">
            <div className="project-header">
                <h1>⛰️ {project.name}</h1>
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
                        <StepsAccordion steps={mainSection.steps || []} />
                    </div>
                )}

                {activeTab === 'materials' && (
                    <div className="materials-tab">
                        <div className="material-header">Спецификация материалов</div>

                        <div className="material-grid">
                            <span>Материал</span>
                            <span>Кол-во</span>
                            <span>Ед.</span>
                            <span>Примечание</span>
                        </div>

                        {mainSection.specification?.map((item, idx) => (
                            <div key={idx} className="material-row">
                                <span className="material-name">{item.materialId}</span>
                                <span>{item.quantity}</span>
                                <span>{item.unit}</span>
                                <span className="material-notes">{item.notes || ''}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}