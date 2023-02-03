const posts = require('../../data.json');
const fs = require('fs');
const { create } = require('domain');

const pathFile = './data.json';

module.exports.get = async (req, res, next) => {
  try {
    const { perPage = 10, currentPage = 0 } = req.query;
    const result = [
      ...posts.slice(+currentPage * +perPage, (+currentPage + 1) * +perPage),
    ];
    res.json({
      posts: result,
      currentPage,
      perPage,
      totalPage:
        posts.length % perPage === 0
          ? posts.length / perPage
          : Math.floor(posts.length / perPage) + 1,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = posts.find((x) => x.id.toString() === id.toString());
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getSearch = async (req, res, next) => {
  try {
    const { query } = req.query;
    const result = posts.filter(
      (x) =>
        x.des.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        x.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    );
    res.json({ posts: result });
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    const maxId = [...posts.sort((a, b) => b.id - a.id)][0].id;
    const result = [{ ...data, id: +maxId + 1 }, ...posts];
    await fs.writeFileSync(pathFile, JSON.stringify(result));
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    res.json(result.slice(0, 10));
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { des } = req.body;
    const id = req.params.id;
    const result = [
      ...posts.map((x) => {
        if (x.id === id) return (x.des = des);
        return x;
      }),
    ];
    fs.writeFileSync(pathFile, JSON.stringify(result));
    res.json({ posts: result });
  } catch (error) {
    next(error);
  }
};
