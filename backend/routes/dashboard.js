const express = require('express');
const router = express.Router();
const Conflict = require('../models/Conflict');

// 대시보드 통계 데이터
router.get('/stats', async (req, res) => {
  try {
    // 유형별 갈등 수
    const typeStats = await Conflict.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 상태별 갈등 수
    const statusStats = await Conflict.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 연도별 갈등 수
    const yearStats = await Conflict.aggregate([
      {
        $group: {
          _id: { $year: '$startDate' },
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    // 지역별 갈등 수
    const areaStats = await Conflict.aggregate([
      { $group: { _id: '$location.area', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 전체 통계
    const totalConflicts = await Conflict.countDocuments();
    const avgIntensity = await Conflict.aggregate([
      { $group: { _id: null, avg: { $avg: '$intensity' } } }
    ]);

    res.json({
      totalConflicts,
      avgIntensity: avgIntensity[0]?.avg || 0,
      typeStats,
      statusStats,
      yearStats,
      areaStats
    });
  } catch (error) {
    res.status(500).json({ error: '통계 데이터 조회 중 오류가 발생했습니다.' });
  }
});

// 히트맵 데이터
router.get('/heatmap', async (req, res) => {
  try {
    const heatmapData = await Conflict.aggregate([
      {
        $group: {
          _id: {
            lat: { $round: ['$location.coordinates.lat', 2] },
            lng: { $round: ['$location.coordinates.lng', 2] }
          },
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
        }
      },
      {
        $project: {
          lat: '$_id.lat',
          lng: '$_id.lng',
          count: 1,
          avgIntensity: 1,
          weight: { $multiply: ['$count', '$avgIntensity'] }
        }
      }
    ]);

    res.json(heatmapData);
  } catch (error) {
    res.status(500).json({ error: '히트맵 데이터 조회 중 오류가 발생했습니다.' });
  }
});

// 최근 갈등
router.get('/recent', async (req, res) => {
  try {
    const recentConflicts = await Conflict.find()
      .sort({ startDate: -1 })
      .limit(5)
      .select('title type status location startDate intensity');

    res.json(recentConflicts);
  } catch (error) {
    res.status(500).json({ error: '최근 갈등 조회 중 오류가 발생했습니다.' });
  }
});

// 가치 충돌 분석
router.get('/value-conflicts', async (req, res) => {
  try {
    const valueConflicts = await Conflict.aggregate([
      {
        $group: {
          _id: null,
          avgEnvironmental: { $avg: '$valueConflicts.environmental' },
          avgEconomic: { $avg: '$valueConflicts.economic' },
          avgSocial: { $avg: '$valueConflicts.social' },
          avgCultural: { $avg: '$valueConflicts.cultural' },
          avgPolitical: { $avg: '$valueConflicts.political' }
        }
      }
    ]);

    res.json(valueConflicts[0] || {});
  } catch (error) {
    res.status(500).json({ error: '가치 충돌 분석 중 오류가 발생했습니다.' });
  }
});

// 이해관계자 분석
router.get('/stakeholders', async (req, res) => {
  try {
    const stakeholderStats = await Conflict.aggregate([
      { $unwind: '$stakeholders' },
      {
        $group: {
          _id: '$stakeholders.type',
          count: { $sum: 1 },
          conflicts: { $addToSet: '$_id' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json(stakeholderStats);
  } catch (error) {
    res.status(500).json({ error: '이해관계자 분석 중 오류가 발생했습니다.' });
  }
});

module.exports = router;

