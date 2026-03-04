import { useState } from 'react';
import { Step } from '../../types';

interface StepsAccordionProps {
    steps: Step[];
}

export function StepsAccordion({ steps }: StepsAccordionProps) {
    const [openStep, setOpenStep] = useState<string | null>(steps[0]?.id || null);

    const toggleStep = (stepId: string) => {
        setOpenStep(openStep === stepId ? null : stepId);
    };

    if (!steps || steps.length === 0) {
        return <div>Нет шагов для отображения</div>;
    }

    return (
        <div className="steps-accordion">
            {steps.map((step) => (
                <div key={step.id} className="step-item">
                    <button
                        className="step-header"
                        onClick={() => toggleStep(step.id)}
                    >
                        <span className="step-number">{step.order}</span>
                        <span className="step-title">{step.title}</span>
                        <span className="step-arrow">{openStep === step.id ? '▼' : '▶'}</span>
                    </button>

                    {openStep === step.id && (
                        <div className="step-content">
                            <p className="step-description">{step.description}</p>

                            {'details' in step && step.details && step.details.length > 0 && (
                                <>
                                    <strong>Что делаем:</strong>
                                    <ul>
                                        {step.details.map((detail: string, idx: number) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {'tip' in step && step.tip && (
                                <div className="step-tip">
                                    <strong>✅ Совет:</strong> {step.tip}
                                </div>
                            )}

                            {'materials' in step && step.materials && step.materials.length > 0 && (
                                <div className="step-materials">
                                    <strong>Нужные материалы:</strong>
                                    <div className="material-chips">
                                        {step.materials.map((matId: string) => (
                                            <span key={matId} className="material-chip">{matId}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}