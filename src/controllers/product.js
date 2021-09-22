const Validation = require('../validators/fluent-validator');
const repository = require('../repositories/product');

const fields =
  'name _id description price category count_serves is_available is_on_sale image sale_price';

exports.post = async (req, res) => {
  try {
    // se quiser especificar os parâmetros de entrada, melhor não passar o body completo no construtor do Schema
    // product.name = req.body.name;
    const validator = new Validation();
    validator.hasMaxLen(
      req.body.description,
      200,
      'A descrição do produto deve ter no máximo 200 caracteres',
    );
    validator.isGreaterThan(
      req.body.price,
      0,
      'O valor do produto deve ser maior que zero',
    );
    if (!validator.isValid()) {
      return res.status(400).send(validator.errors()).end();
    }

    await repository.create(req.body);
    res.status(201).send({ message: 'Produto cadastrado' });
  } catch (e) {
    res.status(400).send({ message: 'Produto não cadastrado', data: e });
  }
};

exports.get = async (req, res) => {
  try {
    const condition = {};
    if (req.query.search) {
      condition.$or = [
        { name: { $regex: new RegExp(req.query.search, 'i') } },
        { description: { $regex: new RegExp(req.query.search, 'i') } },
      ];
    }

    const products = await repository.get(
      condition,
      fields,
      parseInt(req.query.limit, 10) || 10,
      parseInt(req.query.page, 10) || 0,
      req.query.sort,
      req.query.direction,
    );
    res.status(200).send(products);
  } catch (e) {
    res.status(400).send({ message: 'Falha na busca', data: e });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await repository.getById(req.params.id, fields);
    if (!product) {
      return res.status(404).send({ message: 'Produto não encontrado' }); //537eed02ed345b2e039652d2
    }
    return res.status(200).send(product);
  } catch (e) {
    return res.status(400).send({ message: 'Erro na busca', data: e });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const product = await repository.get(
      { category: req.params.category },
      fields,
    );
    if (!product) {
      return res.status(404).send({ message: 'Produto não encontrado' }); //537eed02ed345b2e039652d2
    }
    return res.status(200).send(product);
  } catch (e) {
    return res.status(400).send({ message: 'Erro na busca', data: e });
  }
};

exports.put = async (req, res) => {
  try {
    const product = await repository.update(req.params.id, req.body);
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send({ message: 'Produto não atualizado', data: e });
  }
};

exports.delete = async (req, res) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({ message: 'Produto excluído com sucesso' });
  } catch (e) {
    res.status(400).send({ message: 'Falha ao remover o produto', data: e });
  }
};
