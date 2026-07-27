export interface FewShot {
  langCode: string;
  langName: string;
  example: string;
}

export const FEW_SHOTS: Record<string, FewShot> = {
  por: {
    langCode: 'por',
    langName: 'português',
    example: `{
  "title": "Implementação de cache Redis reduzindo latência da API em 80%",
  "context": "A API apresentava alta latência e timeouts durante picos de acesso.",
  "actionTaken": "Projetou e implementou estratégia de cache com Redis para endpoints mais acessados.",
  "businessImpact": "Redução de 80% na latência eliminou timeouts em horários de pico e melhorou a experiência do usuário.",
  "metrics": ["80% de redução na latência da API", "Zero timeouts durante tráfego de pico"],
  "technologiesUsed": ["Redis", "Node.js", "Express"]
}`,
  },
  eng: {
    langCode: 'eng',
    langName: 'inglês',
    example: `{
  "title": "Implemented Redis caching layer reducing API latency by 80%",
  "context": "The API suffered from high latency and timeouts during traffic spikes.",
  "actionTaken": "Designed and deployed a Redis-based caching strategy for frequently accessed endpoints.",
  "businessImpact": "80% latency reduction eliminated timeouts during peak hours and improved user experience.",
  "metrics": ["80% reduction in API latency", "Zero timeouts during peak traffic"],
  "technologiesUsed": ["Redis", "Node.js", "Express"]
}`,
  },
  spa: {
    langCode: 'spa',
    langName: 'espanhol',
    example: `{
  "title": "Implementación de sistema de monitoreo reduciendo tiempo de detección en 70%",
  "context": "La empresa enfrentaba dificultades para identificar y responder a incidentes a tiempo.",
  "actionTaken": "Diseñó e implementó un sistema de monitoreo con Prometheus y Grafana para alertas tempranas.",
  "businessImpact": "Reducción del 70% en el tiempo de detección de incidentes, minimizando interrupciones del servicio.",
  "metrics": ["70% de reducción en tiempo de detección", "99.9% de disponibilidad del sistema"],
  "technologiesUsed": ["Prometheus", "Grafana", "Docker", "Kubernetes"]
}`,
  },
  fra: {
    langCode: 'fra',
    langName: 'francês',
    example: `{
  "title": "Conception d'une architecture microservices permettant 50 déploiements par jour",
  "context": "Le système monolithique limitait les déploiements à 2 par jour avec des interruptions de service.",
  "actionTaken": "A conçu et migré vers une architecture microservices avec conteneurisation et orchestration.",
  "businessImpact": "Passage de 2 à 50 déploiements par jour sans interruption de service, accélérant le time-to-market.",
  "metrics": ["25x plus de déploiements par jour", "Zéro interruption de service"],
  "technologiesUsed": ["Docker", "Kubernetes", "AWS", "Terraform"]
}`,
  },
  deu: {
    langCode: 'deu',
    langName: 'alemão',
    example: `{
  "title": "Aufbau einer CI/CD-Pipeline mit GitHub Actions, die Build-Zeit von 45 auf 8 Minuten reduziert",
  "context": "Die manuelle Build- und Deployment-Prozesse dauerten 45 Minuten und waren fehleranfällig.",
  "actionTaken": "Entwarf und implementierte eine automatisierte CI/CD-Pipeline mit parallelen Builds und Caching.",
  "businessImpact": "82% Reduzierung der Build-Zeit ermöglicht häufigere Releases und schnellere Feedback-Zyklen.",
  "metrics": ["82% schnellere Build-Zeit", "95% weniger manuelle Eingriffe"],
  "technologiesUsed": ["GitHub Actions", "Docker", "Node.js", "PostgreSQL"]
}`,
  },
  ita: {
    langCode: 'ita',
    langName: 'italiano',
    example: `{
  "title": "Implementazione di sistema di autenticazione OAuth2 riducendo accessi non autorizzati del 95%",
  "context": "Il sistema legacy utilizzava autenticazione base con vulnerabilità critiche e sessioni non sicure.",
  "actionTaken": "Progettato e implementato flusso OAuth2 con JWT, refresh token e rotazione automatica delle chiavi.",
  "businessImpact": "Eliminazione del 95% degli accessi non autorizzati e conformità con GDPR e standard di sicurezza.",
  "metrics": ["95% riduzione accessi non autorizzati", "100% conformità GDPR"],
  "technologiesUsed": ["OAuth2", "JWT", "Redis", "Node.js", "PostgreSQL"]
}`,
  },
};

export const SUPPORTED_LANGUAGES = Object.values(FEW_SHOTS).map((f) => f.langName);
