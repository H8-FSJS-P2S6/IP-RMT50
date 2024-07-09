const { Character, User, Village } = require("../models");

module.exports = {
  async postCharacter(req, res, next) {
    const { name, abilities, status, background, userId, villageId } = req.body;
    try {
      const data = await Character.create({
        name,
        abilities,
        status,
        background,
        userId,
        villageId,
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },

  async getCharacters(req, res, next) {
    try {
      const characters = await Character.findAll({
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: Village,
          },
        ],
      });
      res.status(200).json(characters);
    } catch (err) {
      next(err);
    }
  },

  async getCharacterById(req, res, next) {
    const id = req.params.id;
    try {
      const character = await Character.findByPk(id, {
        include: [User, Village],
      });
      if (!character) {
        throw { name: "Character not found.", id: id };
      }
      res.status(200).json(character);
    } catch (err) {
      next(err);
    }
  },

  async updateCharacterById(req, res, next) {
    const { name, abilities, status, background, userId, villageId } = req.body;
    const id = req.params.id;
    try {
      const character = await Character.findByPk(id);
      if (!character) {
        throw { name: "Character not found.", id: id };
      }
      await character.update({
        name,
        abilities,
        status,
        background,
        userId,
        villageId,
      });
      res.status(200).json({ message: `Character id ${id} updated.` });
    } catch (err) {
      next(err);
    }
  },

  async deleteCharacterById(req, res, next) {
    const id = req.params.id;
    try {
      const character = await Character.findByPk(id);
      if (!character) {
        throw { name: "Character not found." };
      }
      await Character.destroy({ where: { id: id } });
      res.status(200).json({ message: `Character id ${id} deleted.` });
    } catch (err) {
      next(err);
    }
  },

  async searchCharactersByName(req, res, next) {
    const { name } = req.query;
    try {
      const characters = await Character.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: [User, Village],
      });
      res.status(200).json(characters);
    } catch (err) {
      next(err);
    }
  },
};
