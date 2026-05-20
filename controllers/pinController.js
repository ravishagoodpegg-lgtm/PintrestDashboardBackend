import Pin from '../models/Pin.js';

export const getFeed = async (req, res) => {
  try {
    const { tag, search } = req.query;
    let query = {};
    
    if (tag) query.tags = { $in: [tag] };
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];

    const pins = await Pin.find(query)
      .populate('userId', 'name avatarUrl')
      .populate('boardId', 'title')
      .sort({ createdAt: -1 });
    
    res.json(pins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPin = async (req, res) => {
  try {
    const pin = await Pin.create({ ...req.body, userId: req.user.id });
    await pin.populate('userId', 'name avatarUrl');
    res.status(201).json(pin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    const liked = pin.likes.includes(req.user.id);
    
    if (liked) {
      pin.likes.pull(req.user.id);
    } else {
      pin.likes.push(req.user.id);
    }
    
    await pin.save();
    res.json(pin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const savePin = async (req, res) => {
  try {
    const { boardId } = req.body;
    const pin = await Pin.findById(req.params.id);
    
    const alreadySaved = pin.saves.find(s => s.userId.toString() === req.user.id);
    if (alreadySaved) {
      pin.saves = pin.saves.filter(s => s.userId.toString() !== req.user.id);
    } else {
      pin.saves.push({ userId: req.user.id, boardId });
    }
    
    await pin.save();
    res.json(pin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfileStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const pins = await Pin.find({ userId });
    const totalLikes = pins.reduce((sum, p) => sum + p.likes.length, 0);
    const totalSaves = pins.reduce((sum, p) => sum + p.saves.length, 0);
    
    res.json({ totalPins: pins.length, totalLikes, totalSaves });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};