import React from 'react';
import { useProjects } from '../hooks/useProjects.ts';

export function HomePage() {
  const { projects, loading, error } = useProjects();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>DIY Base</h1>
      <p>База знаний самостройщика</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>📋 Мои проекты</h2>
          {projects?.projects.map(project => (
            <div key={project.id} style={{ margin: '10px 0' }}>
              <strong>{project.name}</strong> - {project.status === 'construction' ? '🏗 В работе' : '💡 Идея'}
            </div>
          ))}
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>📚 База знаний</h2>
          <p>Статьи по технологиям и материалам</p>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>🧱 Материалы</h2>
          <p>Справочник материалов и цен</p>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>🏢 Поставщики</h2>
          <p>Контакты проверенных продавцов</p>
        </div>
      </div>
    </div>
  );
}
