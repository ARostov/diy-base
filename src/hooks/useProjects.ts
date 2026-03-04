import { useState, useEffect } from 'react';
import { GistStorage } from '../services/gistStorage.ts';
import { ProjectsFile } from '../types';

export function useProjects() {
  const [projects, setProjects] = useState<ProjectsFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const storage = new GistStorage();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await storage.getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, error, reload: loadProjects };
}
