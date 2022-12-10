const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const HTTPError = require('../errors/HTTPError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(new ServerError(err.message)));
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы неверные данные'));
      } else {
        next(new ServerError(err.message));
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не обнаружена.');
      } else if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenError('Нет прав к данному действию');
      } else {
        return card.remove()
          .then(() => card);
      }
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы неверные данные для удаления карточки.'));
      } else if (err instanceof HTTPError) {
        next(err);
      } else {
        next(new ServerError(err.message));
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не обнаружена.'));
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы неверный id'));
      } else {
        next(new ServerError(err.message));
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не обнаружена.'));
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы неверный id'));
      } else {
        next(new ServerError(err.message));
      }
    });
};
