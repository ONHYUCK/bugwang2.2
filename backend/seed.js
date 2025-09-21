const mongoose = require('mongoose');
const Conflict = require('./models/Conflict');
require('dotenv').config();

const seedData = [
  {
    title: '강화도 갯벌 매립 논란',
    description: '강화도 갯벌 지역의 대규모 매립 사업으로 인한 환경 파괴 우려와 지역 개발 간의 갈등이 지속되고 있습니다. 환경단체들은 생태계 보호를 위해 매립 중단을 요구하고 있으며, 지자체는 지역 경제 활성화를 위해 사업 추진을 강조하고 있습니다.',
    type: '환경',
    status: '검토',
    location: {
      name: '강화도 갯벌',
      coordinates: {
        lat: 37.7131,
        lng: 126.4859
      },
      area: '강화군'
    },
    stakeholders: [
      {
        name: '환경운동연합',
        type: '시민단체',
        position: '매립 중단 요구'
      },
      {
        name: '강화군청',
        type: '정부',
        position: '사업 추진'
      },
      {
        name: '강화도 주민',
        type: '주민',
        position: '의견 분분'
      },
      {
        name: '개발업체',
        type: '기업',
        position: '사업 계속 추진'
      }
    ],
    timeline: [
      {
        date: new Date('2023-01-15'),
        event: '매립 사업 계획 발표',
        description: '강화군청에서 갯벌 매립 사업 계획을 공식 발표'
      },
      {
        date: new Date('2023-03-20'),
        event: '환경영향평가 착수',
        description: '환경영향평가 업체 선정 및 평가 착수'
      },
      {
        date: new Date('2023-06-10'),
        event: '주민 설명회 개최',
        description: '지역 주민 대상 사업 설명회 개최, 반대 의견 다수'
      },
      {
        date: new Date('2023-09-05'),
        event: '환경단체 반대 운동',
        description: '환경운동연합 주도 반대 서명운동 및 집회 개최'
      }
    ],
    documents: [
      {
        title: '강화도 갯벌 매립 사업 환경영향평가서',
        url: 'https://example.com/eia-report.pdf',
        type: '보고서',
        date: new Date('2023-05-15')
      },
      {
        title: '갯벌 보호법',
        url: 'https://example.com/wetland-law.pdf',
        type: '법령',
        date: new Date('2020-01-01')
      }
    ],
    valueConflicts: {
      environmental: 9,
      economic: 7,
      social: 6,
      cultural: 4,
      political: 8
    },
    intensity: 8,
    startDate: new Date('2023-01-15'),
    tags: ['갯벌', '매립', '환경보호', '지역개발'],
    images: [
      {
        url: 'https://example.com/ganghwa-wetland.jpg',
        caption: '강화도 갯벌 전경'
      }
    ],
    aiAnalysis: {
      summary: '환경 보호와 지역 개발 간의 전형적인 가치 충돌 사례입니다. 갯벌의 생태적 가치와 경제적 개발 이익 간의 균형점을 찾는 것이 핵심 과제입니다.',
      keyIssues: ['생태계 보호', '지역 경제 활성화', '주민 의견 수렴'],
      recommendations: [
        '대안 개발 방안 검토',
        '환경 보전과 개발의 균형 모델 도입',
        '주민 참여형 의사결정 과정 강화'
      ],
      riskLevel: '높음'
    }
  },
  {
    title: '영흥도 해상풍력 발전 갈등',
    description: '영흥도 인근 해상에 대규모 해상풍력 발전단지 건설 계획으로 인한 어업권 침해와 환경 영향에 대한 우려가 제기되고 있습니다. 어민들은 어장 손실에 대한 보상과 대책을 요구하고 있으며, 발전사는 청정 에너지 확보의 중요성을 강조하고 있습니다.',
    type: '경제',
    status: '협상',
    location: {
      name: '영흥도 해상',
      coordinates: {
        lat: 37.2567,
        lng: 126.4859
      },
      area: '옹진군'
    },
    stakeholders: [
      {
        name: '영흥도 어민협회',
        type: '주민',
        position: '어업권 보호 및 보상 요구'
      },
      {
        name: '해상풍력 발전사',
        type: '기업',
        position: '사업 추진 및 보상 협의'
      },
      {
        name: '옹진군청',
        type: '정부',
        position: '중재 역할'
      },
      {
        name: '환경단체',
        type: '시민단체',
        position: '환경 영향 최소화 요구'
      }
    ],
    timeline: [
      {
        date: new Date('2022-11-10'),
        event: '해상풍력 사업 계획 발표',
        description: '발전사에서 영흥도 해상풍력 발전단지 건설 계획 발표'
      },
      {
        date: new Date('2023-02-15'),
        event: '어민 반대 운동 시작',
        description: '영흥도 어민협회에서 어업권 침해 우려로 반대 운동 시작'
      },
      {
        date: new Date('2023-05-20'),
        event: '첫 번째 협상 회의',
        description: '발전사, 어민협회, 군청 간 첫 번째 협상 회의 개최'
      },
      {
        date: new Date('2023-08-30'),
        event: '보상안 제시',
        description: '발전사에서 어민 보상안 제시, 추가 협상 진행 중'
      }
    ],
    documents: [
      {
        title: '영흥도 해상풍력 발전사업 환경영향평가서',
        url: 'https://example.com/wind-power-eia.pdf',
        type: '보고서',
        date: new Date('2023-04-20')
      },
      {
        title: '어업권 보호법',
        url: 'https://example.com/fishing-rights-law.pdf',
        type: '법령',
        date: new Date('2019-01-01')
      }
    ],
    valueConflicts: {
      environmental: 6,
      economic: 9,
      social: 7,
      cultural: 3,
      political: 5
    },
    intensity: 7,
    startDate: new Date('2022-11-10'),
    tags: ['해상풍력', '어업권', '청정에너지', '보상'],
    images: [
      {
        url: 'https://example.com/yeongheung-wind.jpg',
        caption: '영흥도 해상풍력 발전 예상 구역'
      }
    ],
    aiAnalysis: {
      summary: '청정 에너지 확보와 전통 어업 보호 간의 갈등입니다. 적절한 보상 체계와 환경 영향 최소화 방안이 핵심 해결 과제입니다.',
      keyIssues: ['어업권 보호', '청정 에너지 확보', '보상 체계'],
      recommendations: [
        '공정한 보상 기준 수립',
        '어업 대체 수단 개발 지원',
        '환경 영향 최소화 기술 적용'
      ],
      riskLevel: '보통'
    }
  },
  {
    title: '송도 항만 확장 계획',
    description: '송도 신도시 인근 항만의 대규모 확장 계획으로 인한 주거 환경 악화 우려와 물류 산업 발전 간의 갈등이 발생하고 있습니다. 주민들은 소음, 대기오염, 교통 혼잡 등의 문제를 우려하고 있으며, 항만공사는 국가 물류 경쟁력 강화의 필요성을 강조하고 있습니다.',
    type: '교통',
    status: '협상',
    location: {
      name: '송도 항만',
      coordinates: {
        lat: 37.3835,
        lng: 126.6436
      },
      area: '연수구'
    },
    stakeholders: [
      {
        name: '송도 주민협의회',
        type: '주민',
        position: '주거 환경 보호 요구'
      },
      {
        name: '인천항만공사',
        type: '기업',
        position: '항만 확장 추진'
      },
      {
        name: '인천시청',
        type: '정부',
        position: '균형적 발전 추구'
      },
      {
        name: '물류업계',
        type: '기업',
        position: '항만 확장 지지'
      }
    ],
    timeline: [
      {
        date: new Date('2023-03-01'),
        event: '항만 확장 계획 발표',
        description: '인천항만공사에서 송도 항만 확장 계획 공식 발표'
      },
      {
        date: new Date('2023-05-15'),
        event: '주민 반대 운동',
        description: '송도 주민협의회에서 주거 환경 악화 우려로 반대 운동 시작'
      },
      {
        date: new Date('2023-07-20'),
        event: '환경 영향 평가 착수',
        description: '소음, 대기오염 등 환경 영향 평가 실시'
      },
      {
        date: new Date('2023-10-10'),
        event: '주민 설명회',
        description: '환경 영향 평가 결과 발표 및 주민 설명회 개최'
      }
    ],
    documents: [
      {
        title: '송도 항만 확장 사업 환경영향평가서',
        url: 'https://example.com/songdo-port-eia.pdf',
        type: '보고서',
        date: new Date('2023-09-15')
      },
      {
        title: '항만법',
        url: 'https://example.com/port-law.pdf',
        type: '법령',
        date: new Date('2018-01-01')
      }
    ],
    valueConflicts: {
      environmental: 7,
      economic: 8,
      social: 9,
      cultural: 2,
      political: 6
    },
    intensity: 6,
    startDate: new Date('2023-03-01'),
    tags: ['항만확장', '주거환경', '물류', '교통'],
    images: [
      {
        url: 'https://example.com/songdo-port.jpg',
        caption: '송도 항만 현재 모습'
      }
    ],
    aiAnalysis: {
      summary: '도시 개발과 주거 환경 보호 간의 갈등입니다. 항만 확장으로 인한 경제적 이익과 주민 생활 환경 보호 간의 균형이 필요합니다.',
      keyIssues: ['주거 환경 보호', '물류 산업 발전', '교통 체증'],
      recommendations: [
        '환경 영향 최소화 기술 도입',
        '주민 편의 시설 확충',
        '교통 체증 해소 방안 수립'
      ],
      riskLevel: '보통'
    }
  }
];

async function seedDatabase() {
  try {
    // MongoDB 연결
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/incheon-conflicts', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB에 연결되었습니다.');

    // 기존 데이터 삭제
    await Conflict.deleteMany({});
    console.log('기존 데이터를 삭제했습니다.');

    // 새 데이터 삽입
    const conflicts = await Conflict.insertMany(seedData);
    console.log(`${conflicts.length}개의 갈등 데이터가 성공적으로 삽입되었습니다.`);

    // 연결 종료
    await mongoose.connection.close();
    console.log('데이터베이스 연결이 종료되었습니다.');

  } catch (error) {
    console.error('시드 데이터 삽입 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

// 스크립트가 직접 실행될 때만 시드 실행
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;

