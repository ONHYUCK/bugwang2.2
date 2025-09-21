import React, { createContext, useContext, useState, ReactNode } from 'react';

// 다국어 번역 데이터
export const translations = {
  ko: {
    title: "인천 해양 갈등 지도 플랫폼",
    nav: {
      home: "홈",
      conflicts: "갈등 현황",
      dashboard: "대시보드",
      analysis: "AI 분석"
    },
    hero: {
      title: "인천 해양 갈등 지도 플랫폼",
      subtitle: "인천 해역의 갈등 상황을 시각화하고 분석하는 통합 플랫폼",
      description: "지도 기반 갈등 현황 파악, 이해관계자 분석, 시민 참여를 통한 해결 방안 모색"
    },
    map: {
      title: "갈등 지역 지도",
      legend: "범례",
      filter: "필터",
      all: "전체",
      environment: "환경",
      economic: "경제",
      housing: "주거",
      cultural: "문화",
      transport: "교통",
      search: "검색..."
    },
    conflicts: {
      title: "주요 갈등 현황",
      viewAll: "전체 보기",
      vote: "투표",
      opinion: "의견",
      valueJudgment: "가치 판단",
      cooldown: "쿨다운",
      voteCooldownTitle: "투표 쿨다운",
      voteCooldownMessage: "투표는 월 1회만 가능합니다.",
      nextVoteDate: "다음 투표 가능일",
      valueCooldownTitle: "가치 판단 쿨다운",
      valueCooldownMessage: "가치 판단은 월 1회만 가능합니다.",
      nextValueDate: "다음 가치 판단 가능일",
      successTitle: "성공",
      successMessage: "의견이 성공적으로 제출되었습니다.",
      close: "닫기"
    },
    stats: {
      totalConflicts: "총 갈등 건수",
      activeConflicts: "진행 중인 갈등",
      resolvedConflicts: "해결된 갈등",
      participants: "참여자 수"
    },
    dashboard: {
      conflictTypeDistribution: "갈등 유형별 분포",
      yearlyTrend: "연도별 갈등 추이",
      statusDistribution: "상태별 분포",
      regionalIntensity: "지역별 갈등 강도",
      valueChanges: "최근 6개월간 나의 가치판단 변화"
    },
                modal: {
                    conflictDetail: "갈등 상세 정보",
                    opinionRegistered: "의견이 등록되었습니다",
                    opinionRegisteredMessage: "귀하의 소중한 의견이 성공적으로 등록되었습니다.",
                    nextVoteInOneMonth: "다음 투표는 1달 후에 가능합니다.",
                    nextVoteDate: "다음 투표 가능일",
                    confirm: "확인",
                    valueImportanceDelivered: "가치의 중요성이 전달되었습니다!",
                    valueJudgmentRegistered: "귀하의 가치판단이 성공적으로 등록되었습니다.",
                    nextVoteInOneMonthValue: "다음 투표는 1달 뒤에 가능합니다.",
                    note: "💡 참고",
                    noteMessage: "다른 갈등 사안의 가치판단에는 언제든지 참여하실 수 있습니다.",
                    valueImportanceDeliveredTitle: "가치의 중요성이 전달되었습니다",
                    nextVoteInOneMonthTitle: "다음 투표는 한달 뒤 가능합니다"
                },
                conflicts: {
                    ganghwa: {
                        title: "강화도 갯벌 매립 논란",
                        description: "강화도 갯벌 지역의 대규모 매립 사업으로 인한 생태계 파괴 우려와 지역 개발 간의 갈등",
                        cause: "대규모 매립 사업으로 인한 생태계 파괴 우려",
                        stakeholders: {
                            environmentalGroup: "환경단체",
                            localGovernment: "지방정부", 
                            developer: "개발업체",
                            residents: "지역주민"
                        },
                        timeline: {
                            planAnnouncement: "매립 사업 계획 발표",
                            eiaStart: "환경영향평가 착수",
                            oppositionStart: "주민 반대 운동 시작",
                            reviewRequest: "사업 재검토 요청"
                        },
                        documents: {
                            eiaReport: "환경영향평가서",
                            residentOpinion: "주민 의견서",
                            projectPlan: "사업 계획서"
                        },
                        aiAnalysis: {
                            summary: "강화도 갯벌 매립 사업은 생태계 보호와 지역 개발 간의 전형적인 갈등 사례입니다.",
                            recommendations: [
                                "생태계 보호 구역 확대 검토",
                                "대안 개발 방안 모색",
                                "주민 참여 확대"
                            ]
                        },
                        comments: [
                            "강화도 갯벌은 생태계의 보고입니다. 매립으로 인한 생물 다양성 손실은 되돌릴 수 없습니다. 대안 개발 방안을 모색해야 합니다.",
                            "개발도 필요하지만 환경도 중요합니다. 양쪽을 모두 고려한 합리적인 방안이 나왔으면 좋겠습니다."
                        ]
                    },
                    yeongheung: {
                        title: "영흥도 해상풍력 발전 갈등",
                        description: "영흥도 인근 해상에 대규모 풍력발전단지 건설로 인한 어업권 침해와 환경 영향 갈등",
                        cause: "해상풍력 발전으로 인한 어업권 침해",
                        stakeholders: {
                            fishermen: "어업인",
                            energyCompany: "에너지업체",
                            centralGovernment: "중앙정부",
                            environmentalGroup: "환경단체"
                        },
                        timeline: {
                            planAnnouncement: "해상풍력 사업 계획 발표",
                            oppositionStart: "어업인 반대 운동",
                            compensationStart: "보상 협상 시작",
                            ongoing: "협상 진행 중"
                        },
                        documents: {
                            feasibilityStudy: "사업 타당성 조사서",
                            fisheryReport: "어업 영향 조사서",
                            compensationPlan: "보상 계획서"
                        },
                        aiAnalysis: {
                            summary: "영흥도 해상풍력 사업은 청정 에너지 확보와 기존 어업권 보호 간의 갈등입니다.",
                            recommendations: [
                                "어업인 보상 방안 강화",
                                "대체 어장 제공 검토",
                                "단계적 사업 추진"
                            ]
                        },
                        comments: [
                            "우리 어업권이 침해당하고 있습니다. 적절한 보상과 대체 어장이 필요합니다.",
                            "청정 에너지는 필요하지만 어업인의 생계도 보장되어야 합니다."
                        ]
                    },
                    songdo: {
                        title: "송도 항만 확장 계획",
                        description: "송도 신도시 항만 확장으로 인한 주민 생활권 침해와 물류 효율성 증대 간의 갈등",
                        cause: "항만 확장으로 인한 주민 생활권 침해",
                        stakeholders: {
                            portWorkers: "항만노동자",
                            portAuthority: "항만공사",
                            residents: "주민",
                            logistics: "물류업체"
                        },
                        timeline: {
                            expansionPlan: "항만 확장 계획 발표",
                            automationStart: "자동화 시설 도입",
                            jobConcern: "일자리 감소 우려",
                            ongoing: "협상 진행 중"
                        },
                        documents: {
                            expansionReport: "항만 확장 계획서",
                            automationPlan: "자동화 계획서",
                            jobPlan: "일자리 대책서"
                        },
                        aiAnalysis: {
                            summary: "송도 항만 확장은 물류 효율성과 노동자 고용 안정성 간의 갈등입니다.",
                            recommendations: [
                                "노동자 재교육 프로그램 확대",
                                "대체 일자리 창출 방안 모색",
                                "단계적 자동화 추진"
                            ]
                        },
                        comments: [
                            "기술 발전은 좋지만 우리 일자리가 위협받고 있습니다. 대책이 필요합니다."
                        ]
                    }
                }
  },
  en: {
    title: "Incheon Marine Conflict Map Platform",
    nav: {
      home: "Home",
      conflicts: "Conflicts",
      dashboard: "Dashboard",
      analysis: "AI Analysis"
    },
    hero: {
      title: "Incheon Marine Conflict Map Platform",
      subtitle: "Integrated platform for visualizing and analyzing conflict situations in Incheon waters",
      description: "Map-based conflict status identification, stakeholder analysis, and solution development through citizen participation"
    },
    map: {
      title: "Conflict Area Map",
      legend: "Legend",
      filter: "Filter",
      all: "All",
      environment: "Environment",
      economic: "Economic",
      housing: "Housing",
      cultural: "Cultural",
      transport: "Transport",
      search: "Search..."
    },
    conflicts: {
      title: "Major Conflict Status",
      viewAll: "View All",
      vote: "Vote",
      opinion: "Opinion",
      valueJudgment: "Value Judgment",
      cooldown: "Cooldown",
      voteCooldownTitle: "Vote Cooldown",
      voteCooldownMessage: "Voting is only possible once per month.",
      nextVoteDate: "Next Vote Date",
      valueCooldownTitle: "Value Judgment Cooldown",
      valueCooldownMessage: "Value judgment is only possible once per month.",
      nextValueDate: "Next Value Judgment Date",
      successTitle: "Success",
      successMessage: "Your opinion has been submitted successfully.",
      close: "Close"
    },
    stats: {
      totalConflicts: "Total Conflicts",
      activeConflicts: "Active Conflicts",
      resolvedConflicts: "Resolved Conflicts",
      participants: "Participants"
    },
    dashboard: {
      conflictTypeDistribution: "Conflict Type Distribution",
      yearlyTrend: "Yearly Conflict Trend",
      statusDistribution: "Status Distribution",
      regionalIntensity: "Regional Conflict Intensity",
      valueChanges: "My Value Judgment Changes (Last 6 Months)"
    },
                modal: {
                    conflictDetail: "Conflict Detail Information",
                    opinionRegistered: "Opinion Registered",
                    opinionRegisteredMessage: "Your valuable opinion has been successfully registered.",
                    nextVoteInOneMonth: "Next vote is possible in one month.",
                    nextVoteDate: "Next Vote Date",
                    confirm: "Confirm",
                    valueImportanceDelivered: "Value Importance Delivered!",
                    valueJudgmentRegistered: "Your value judgment has been successfully registered.",
                    nextVoteInOneMonthValue: "Next vote is possible in one month.",
                    note: "💡 Note",
                    noteMessage: "You can participate in value judgments for other conflict issues at any time.",
                    valueImportanceDeliveredTitle: "Value Importance Delivered",
                    nextVoteInOneMonthTitle: "Next vote is possible in one month"
                },
                conflicts: {
                    ganghwa: {
                        title: "Ganghwa Island Wetland Reclamation Controversy",
                        description: "Conflict between ecosystem destruction concerns from large-scale reclamation projects in Ganghwa Island wetland areas and regional development",
                        cause: "Concerns about ecosystem destruction from large-scale reclamation projects",
                        stakeholders: {
                            environmentalGroup: "Environmental Groups",
                            localGovernment: "Local Government", 
                            developer: "Developer",
                            residents: "Local Residents"
                        },
                        timeline: {
                            planAnnouncement: "Reclamation project plan announcement",
                            eiaStart: "Environmental impact assessment initiation",
                            oppositionStart: "Resident opposition movement begins",
                            reviewRequest: "Project review request"
                        },
                        documents: {
                            eiaReport: "Environmental Impact Assessment Report",
                            residentOpinion: "Resident Opinion Report",
                            projectPlan: "Project Plan"
                        },
                        aiAnalysis: {
                            summary: "The Ganghwa Island wetland reclamation project is a typical conflict case between ecosystem protection and regional development.",
                            recommendations: [
                                "Review expansion of ecosystem protection zones",
                                "Explore alternative development plans",
                                "Expand resident participation"
                            ]
                        },
                        comments: [
                            "Ganghwa Island wetlands are a treasure trove of ecosystems. Biodiversity loss from reclamation is irreversible. Alternative development plans must be explored.",
                            "Development is needed but environment is also important. I hope a reasonable plan that considers both sides will emerge."
                        ]
                    },
                    yeongheung: {
                        title: "Yeongheung Island Offshore Wind Power Conflict",
                        description: "Conflict over fishing rights infringement and environmental impact from large-scale wind power complex construction in waters near Yeongheung Island",
                        cause: "Fishing rights infringement from offshore wind power development",
                        stakeholders: {
                            fishermen: "Fishermen",
                            energyCompany: "Energy Company",
                            centralGovernment: "Central Government",
                            environmentalGroup: "Environmental Groups"
                        },
                        timeline: {
                            planAnnouncement: "Offshore wind power project plan announcement",
                            oppositionStart: "Fishermen opposition movement",
                            compensationStart: "Compensation negotiation begins",
                            ongoing: "Negotiation ongoing"
                        },
                        documents: {
                            feasibilityStudy: "Project Feasibility Study Report",
                            fisheryReport: "Fishery Impact Study Report",
                            compensationPlan: "Compensation Plan"
                        },
                        aiAnalysis: {
                            summary: "The Yeongheung Island offshore wind power project is a conflict between securing clean energy and protecting existing fishing rights.",
                            recommendations: [
                                "Strengthen compensation measures for fishermen",
                                "Review providing alternative fishing grounds",
                                "Phased project implementation"
                            ]
                        },
                        comments: [
                            "Our fishing rights are being infringed. Proper compensation and alternative fishing grounds are needed.",
                            "Clean energy is necessary but fishermen's livelihoods must also be guaranteed."
                        ]
                    },
                    songdo: {
                        title: "Songdo Port Expansion Plan",
                        description: "Conflict between resident living area infringement from Songdo New City port expansion and logistics efficiency improvement",
                        cause: "Resident living area infringement from port expansion",
                        stakeholders: {
                            portWorkers: "Port Workers",
                            portAuthority: "Port Authority",
                            residents: "Residents",
                            logistics: "Logistics Companies"
                        },
                        timeline: {
                            expansionPlan: "Port expansion plan announcement",
                            automationStart: "Automation facility introduction",
                            jobConcern: "Job loss concerns",
                            ongoing: "Negotiation ongoing"
                        },
                        documents: {
                            expansionReport: "Port Expansion Plan Report",
                            automationPlan: "Automation Plan",
                            jobPlan: "Job Security Plan"
                        },
                        aiAnalysis: {
                            summary: "Songdo port expansion is a conflict between logistics efficiency and worker employment stability.",
                            recommendations: [
                                "Expand worker retraining programs",
                                "Explore alternative job creation measures",
                                "Phased automation implementation"
                            ]
                        },
                        comments: [
                            "Technology advancement is good but our jobs are threatened. Countermeasures are needed."
                        ]
                    }
                }
  },
  fr: {
    title: "Plateforme de Carte des Conflits Marins d'Incheon",
    nav: {
      home: "Accueil",
      conflicts: "Conflits",
      dashboard: "Tableau de bord",
      analysis: "Analyse IA"
    },
    hero: {
      title: "Plateforme de Carte des Conflits Marins d'Incheon",
      subtitle: "Plateforme intégrée pour visualiser et analyser les situations de conflit dans les eaux d'Incheon",
      description: "Identification du statut des conflits basée sur la carte, analyse des parties prenantes et développement de solutions grâce à la participation citoyenne"
    },
    map: {
      title: "Carte des Zones de Conflit",
      legend: "Légende",
      filter: "Filtre",
      all: "Tout",
      environment: "Environnement",
      economic: "Économique",
      housing: "Logement",
      cultural: "Culturel",
      transport: "Transport",
      search: "Rechercher..."
    },
    conflicts: {
      title: "Statut des Conflits Majeurs",
      viewAll: "Voir Tout",
      vote: "Voter",
      opinion: "Opinion",
      valueJudgment: "Jugement de Valeur",
      cooldown: "Cooldown",
      voteCooldownTitle: "Cooldown de Vote",
      voteCooldownMessage: "Le vote n'est possible qu'une fois par mois.",
      nextVoteDate: "Prochaine Date de Vote",
      valueCooldownTitle: "Cooldown de Jugement de Valeur",
      valueCooldownMessage: "Le jugement de valeur n'est possible qu'une fois par mois.",
      nextValueDate: "Prochaine Date de Jugement de Valeur",
      successTitle: "Succès",
      successMessage: "Votre opinion a été soumise avec succès.",
      close: "Fermer"
    },
    stats: {
      totalConflicts: "Total des Conflits",
      activeConflicts: "Conflits Actifs",
      resolvedConflicts: "Conflits Résolus",
      participants: "Participants"
    },
    dashboard: {
      conflictTypeDistribution: "Distribution par Type de Conflit",
      yearlyTrend: "Tendance Annuelle des Conflits",
      statusDistribution: "Distribution par Statut",
      regionalIntensity: "Intensité des Conflits par Région",
      valueChanges: "Mes Changements de Jugement de Valeur (6 Derniers Mois)"
    },
    modal: {
      conflictDetail: "Informations Détaillées du Conflit",
      opinionRegistered: "Opinion Enregistrée",
      opinionRegisteredMessage: "Votre précieuse opinion a été enregistrée avec succès.",
      nextVoteInOneMonth: "Le prochain vote est possible dans un mois.",
      nextVoteDate: "Prochaine Date de Vote",
      confirm: "Confirmer",
      valueImportanceDelivered: "Importance de la Valeur Transmise!",
      valueJudgmentRegistered: "Votre jugement de valeur a été enregistré avec succès.",
      nextVoteInOneMonthValue: "Le prochain vote est possible dans un mois.",
      note: "💡 Note",
      noteMessage: "Vous pouvez participer aux jugements de valeur pour d'autres problèmes de conflit à tout moment.",
      valueImportanceDeliveredTitle: "Importance de la Valeur Transmise",
      nextVoteInOneMonthTitle: "Le prochain vote est possible dans un mois"
    }
  },
  ja: {
    title: "仁川海洋紛争マッププラットフォーム",
    nav: {
      home: "ホーム",
      conflicts: "紛争状況",
      dashboard: "ダッシュボード",
      analysis: "AI分析"
    },
    hero: {
      title: "仁川海洋紛争マッププラットフォーム",
      subtitle: "仁川海域の紛争状況を可視化・分析する統合プラットフォーム",
      description: "地図ベースの紛争状況把握、利害関係者分析、市民参加による解決策の模索"
    },
    map: {
      title: "紛争地域マップ",
      legend: "凡例",
      filter: "フィルター",
      all: "全て",
      environment: "環境",
      economic: "経済",
      housing: "住宅",
      cultural: "文化",
      transport: "交通",
      search: "検索..."
    },
    conflicts: {
      title: "主要紛争状況",
      viewAll: "全て見る",
      vote: "投票",
      opinion: "意見",
      valueJudgment: "価値判断",
      cooldown: "クールダウン",
      voteCooldownTitle: "投票クールダウン",
      voteCooldownMessage: "投票は月1回のみ可能です。",
      nextVoteDate: "次回投票可能日",
      valueCooldownTitle: "価値判断クールダウン",
      valueCooldownMessage: "価値判断は月1回のみ可能です。",
      nextValueDate: "次回価値判断可能日",
      successTitle: "成功",
      successMessage: "ご意見が正常に送信されました。",
      close: "閉じる"
    },
    stats: {
      totalConflicts: "総紛争件数",
      activeConflicts: "進行中紛争",
      resolvedConflicts: "解決済み紛争",
      participants: "参加者数"
    },
    dashboard: {
      conflictTypeDistribution: "紛争タイプ別分布",
      yearlyTrend: "年度別紛争推移",
      statusDistribution: "ステータス別分布",
      regionalIntensity: "地域別紛争強度",
      valueChanges: "最近6ヶ月間の私の価値判断変化"
    },
    modal: {
      conflictDetail: "紛争詳細情報",
      opinionRegistered: "意見が登録されました",
      opinionRegisteredMessage: "貴重なご意見が正常に登録されました。",
      nextVoteInOneMonth: "次回の投票は1ヶ月後に可能です。",
      nextVoteDate: "次回投票可能日",
      confirm: "確認",
      valueImportanceDelivered: "価値の重要性が伝達されました！",
      valueJudgmentRegistered: "価値判断が正常に登録されました。",
      nextVoteInOneMonthValue: "次回の投票は1ヶ月後に可能です。",
      note: "💡 参考",
      noteMessage: "他の紛争案件の価値判断にはいつでも参加できます。",
      valueImportanceDeliveredTitle: "価値の重要性が伝達されました",
      nextVoteInOneMonthTitle: "次回の投票は1ヶ月後に可能です"
    }
  },
  zh: {
    title: "仁川海洋冲突地图平台",
    nav: {
      home: "首页",
      conflicts: "冲突状况",
      dashboard: "仪表板",
      analysis: "AI分析"
    },
    hero: {
      title: "仁川海洋冲突地图平台",
      subtitle: "可视化分析仁川海域冲突情况的综合平台",
      description: "基于地图的冲突状况识别、利益相关者分析、通过公民参与寻求解决方案"
    },
    map: {
      title: "冲突区域地图",
      legend: "图例",
      filter: "筛选",
      all: "全部",
      environment: "环境",
      economic: "经济",
      housing: "住宅",
      cultural: "文化",
      transport: "交通",
      search: "搜索..."
    },
    conflicts: {
      title: "主要冲突状况",
      viewAll: "查看全部",
      vote: "投票",
      opinion: "意见",
      valueJudgment: "价值判断",
      cooldown: "冷却",
      voteCooldownTitle: "投票冷却",
      voteCooldownMessage: "投票每月只能进行一次。",
      nextVoteDate: "下次投票日期",
      valueCooldownTitle: "价值判断冷却",
      valueCooldownMessage: "价值判断每月只能进行一次。",
      nextValueDate: "下次价值判断日期",
      successTitle: "成功",
      successMessage: "您的意见已成功提交。",
      close: "关闭"
    },
    stats: {
      totalConflicts: "总冲突数",
      activeConflicts: "进行中冲突",
      resolvedConflicts: "已解决冲突",
      participants: "参与者数量"
    },
    dashboard: {
      conflictTypeDistribution: "冲突类型分布",
      yearlyTrend: "年度冲突趋势",
      statusDistribution: "状态分布",
      regionalIntensity: "地区冲突强度",
      valueChanges: "最近6个月我的价值判断变化"
    },
    modal: {
      conflictDetail: "冲突详细信息",
      opinionRegistered: "意见已注册",
      opinionRegisteredMessage: "您宝贵的意见已成功注册。",
      nextVoteInOneMonth: "下次投票需等待一个月。",
      nextVoteDate: "下次投票日期",
      confirm: "确认",
      valueImportanceDelivered: "价值重要性已传达！",
      valueJudgmentRegistered: "您的价值判断已成功注册。",
      nextVoteInOneMonthValue: "下次投票需等待一个月。",
      note: "💡 参考",
      noteMessage: "您可以随时参与其他冲突案件的价值判断。",
      valueImportanceDeliveredTitle: "价值重要性已传达",
      nextVoteInOneMonthTitle: "下次投票需等待一个月"
    }
  },
  es: {
    title: "Plataforma de Mapa de Conflictos Marinos de Incheon",
    nav: {
      home: "Inicio",
      conflicts: "Conflictos",
      dashboard: "Panel",
      analysis: "Análisis IA"
    },
    hero: {
      title: "Plataforma de Mapa de Conflictos Marinos de Incheon",
      subtitle: "Plataforma integrada para visualizar y analizar situaciones de conflicto en las aguas de Incheon",
      description: "Identificación del estado de conflictos basada en mapas, análisis de partes interesadas y desarrollo de soluciones a través de la participación ciudadana"
    },
    map: {
      title: "Mapa de Áreas de Conflicto",
      legend: "Leyenda",
      filter: "Filtro",
      all: "Todos",
      environment: "Ambiente",
      economic: "Económico",
      housing: "Vivienda",
      cultural: "Cultural",
      transport: "Transporte",
      search: "Buscar..."
    },
    conflicts: {
      title: "Estado de Conflictos Principales",
      viewAll: "Ver Todo",
      vote: "Votar",
      opinion: "Opinión",
      valueJudgment: "Juicio de Valor",
      cooldown: "Enfriamiento",
      voteCooldownTitle: "Enfriamiento de Voto",
      voteCooldownMessage: "Votar solo es posible una vez por mes.",
      nextVoteDate: "Próxima Fecha de Voto",
      valueCooldownTitle: "Enfriamiento de Juicio de Valor",
      valueCooldownMessage: "El juicio de valor solo es posible una vez por mes.",
      nextValueDate: "Próxima Fecha de Juicio de Valor",
      successTitle: "Éxito",
      successMessage: "Su opinión ha sido enviada exitosamente.",
      close: "Cerrar"
    },
    stats: {
      totalConflicts: "Total de Conflictos",
      activeConflicts: "Conflictos Activos",
      resolvedConflicts: "Conflictos Resueltos",
      participants: "Participantes"
    },
    dashboard: {
      conflictTypeDistribution: "Distribución por Tipo de Conflicto",
      yearlyTrend: "Tendencia Anual de Conflictos",
      statusDistribution: "Distribución por Estado",
      regionalIntensity: "Intensidad de Conflictos por Región",
      valueChanges: "Mis Cambios de Juicio de Valor (Últimos 6 Meses)"
    },
    modal: {
      conflictDetail: "Información Detallada del Conflicto",
      opinionRegistered: "Opinión Registrada",
      opinionRegisteredMessage: "Su valiosa opinión ha sido registrada exitosamente.",
      nextVoteInOneMonth: "El próximo voto es posible en un mes.",
      nextVoteDate: "Próxima Fecha de Voto",
      confirm: "Confirmar",
      valueImportanceDelivered: "¡Importancia del Valor Entregada!",
      valueJudgmentRegistered: "Su juicio de valor ha sido registrado exitosamente.",
      nextVoteInOneMonthValue: "El próximo voto es posible en un mes.",
      note: "💡 Nota",
      noteMessage: "Puede participar en juicios de valor para otros problemas de conflicto en cualquier momento.",
      valueImportanceDeliveredTitle: "Importancia del Valor Entregada",
      nextVoteInOneMonthTitle: "El próximo voto es posible en un mes"
    }
  }
};

export type Language = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
