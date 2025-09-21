const mongoose = require('mongoose');

const conflictSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['환경', '경제', '주거', '문화', '교통'],
    required: true
  },
  status: {
    type: String,
    enum: ['검토', '협상', '해결', '지속'],
    required: true
  },
  location: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
    area: {
      type: String,
      required: true
    }
  },
  stakeholders: [{
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['정부', '기업', '시민단체', '주민', '학계'],
      required: true
    },
    position: {
      type: String,
      required: true
    }
  }],
  timeline: [{
    date: {
      type: Date,
      required: true
    },
    event: {
      type: String,
      required: true
    },
    description: String
  }],
  documents: [{
    title: {
      type: String,
      required: true
    },
    url: String,
    type: {
      type: String,
      enum: ['보고서', '법령', '뉴스', '기타']
    },
    date: Date
  }],
  valueConflicts: {
    environmental: { type: Number, min: 0, max: 10, default: 0 },
    economic: { type: Number, min: 0, max: 10, default: 0 },
    social: { type: Number, min: 0, max: 10, default: 0 },
    cultural: { type: Number, min: 0, max: 10, default: 0 },
    political: { type: Number, min: 0, max: 10, default: 0 }
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  tags: [String],
  images: [{
    url: String,
    caption: String
  }],
  publicOpinions: [{
    content: {
      type: String,
      required: true
    },
    author: String,
    date: {
      type: Date,
      default: Date.now
    },
    sentiment: {
      type: String,
      enum: ['긍정', '부정', '중립'],
      default: '중립'
    }
  }],
  aiAnalysis: {
    summary: String,
    keyIssues: [String],
    recommendations: [String],
    riskLevel: {
      type: String,
      enum: ['낮음', '보통', '높음', '매우높음']
    }
  }
}, {
  timestamps: true
});

// 인덱스 생성
conflictSchema.index({ 'location.coordinates': '2dsphere' });
conflictSchema.index({ type: 1, status: 1 });
conflictSchema.index({ startDate: -1 });

module.exports = mongoose.model('Conflict', conflictSchema);

