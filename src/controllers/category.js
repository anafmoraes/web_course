const repository = require('../repositories/category');

const fields = 'name _id label';

exports.post = async (req, res) => {
  try {
    await repository.create(req.body);
    res.status(201).send({ message: 'Categoria cadastrada' });
  } catch (e) {
    res.status(400).send({ message: 'Categoria não cadastrada', data: e });
  }
};

exports.get = async (req, res) => {
  try {
    const categories = await repository.getAll(fields);
    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send({ message: 'Erro na busca', data: e });
  }
};

exports.put = async (req, res) => {
  try {
    const category = await repository.update(req.params.id, req.body, fields);
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send({ message: 'Categoria não atualizada', data: e });
  }
};

exports.delete = async (req, res) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({ message: 'Categoria excluída com sucesso' });
  } catch (e) {
    res.status(400).send({ message: 'Falha ao remover a categoria', data: e });
  }
};
