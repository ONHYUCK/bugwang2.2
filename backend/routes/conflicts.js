const express = require('express');
const router = express.Router();
const Conflict = require('../models/Conflict');

// 모든 갈등 조회
router.get('/', async (req, res) => {
  try {
    const { type, status, year, search } = req.query;
    let query = {};

    // 필터링
    if (type) query.type = type;
    if (status) query.status = status;
    if (year) {
      query.startDate = {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${parseInt(year) + 1}-01-01`)
      };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.name': { $regex: search, $options: 'i' } }
      ];
    }

    const conflicts = await Conflict.find(query).sort({ startDate: -1 });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ error: '갈등 데이터 조회 중 오류가 발생했습니다.' });
  }
});

// 특정 갈등 조회
router.get('/:id', async (req, res) => {
  try {
    const conflict = await Conflict.findById(req.params.id);
    if (!conflict) {
      return res.status(404).json({ error: '갈등을 찾을 수 없습니다.' });
    }
    res.json(conflict);
  } catch (error) {
    res.status(500).json({ error: '갈등 데이터 조회 중 오류가 발생했습니다.' });
  }
});

// 갈등 생성
router.post('/', async (req, res) => {
  try {
    const conflict = new Conflict(req.body);
    await conflict.save();
    res.status(201).json(conflict);
  } catch (error) {
    res.status(400).json({ error: '갈등 데이터 생성 중 오류가 발생했습니다.' });
  }
});

// 갈등 수정
router.put('/:id', async (req, res) => {
  try {
    const conflict = await Conflict.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!conflict) {
      return res.status(404).json({ error: '갈등을 찾을 수 없습니다.' });
    }
    res.json(conflict);
  } catch (error) {
    res.status(400).json({ error: '갈등 데이터 수정 중 오류가 발생했습니다.' });
  }
});

// 갈등 삭제
router.delete('/:id', async (req, res) => {
  try {
    const conflict = await Conflict.findByIdAndDelete(req.params.id);
    if (!conflict) {
      return res.status(404).json({ error: '갈등을 찾을 수 없습니다.' });
    }
    res.json({ message: '갈등이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ error: '갈등 데이터 삭제 중 오류가 발생했습니다.' });
  }
});

// 시민 의견 추가
router.post('/:id/opinions', async (req, res) => {
  try {
    const conflict = await Conflict.findById(req.params.id);
    if (!conflict) {
      return res.status(404).json({ error: '갈등을 찾을 수 없습니다.' });
    }

    conflict.publicOpinions.push(req.body);
    await conflict.save();
    res.status(201).json(conflict.publicOpinions[conflict.publicOpinions.length - 1]);
  } catch (error) {
    res.status(400).json({ error: '의견 추가 중 오류가 발생했습니다.' });
  }
});

// 지역별 갈등 조회
router.get('/location/:area', async (req, res) => {
  try {
    const conflicts = await Conflict.find({
      'location.area': { $regex: req.params.area, $options: 'i' }
    }).sort({ startDate: -1 });
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ error: '지역별 갈등 조회 중 오류가 발생했습니다.' });
  }
});

module.exports = router;

