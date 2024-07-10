const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const gemini = require("../helpers/geminiAI");
module.exports = {
  async register(req, res, next) {
    try {
      const { email, username, password, phoneNumber, address, image } =
        await User.create(req.body);
      res.status(201).json({
        email: email,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
        image: image,
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "Email is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "InvalidUser" };
      }

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) {
        throw { name: "InvalidUserToken" };
      }

      const token = signToken({ id: user.id });

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  },
  async createUser(req, res, next) {
    try {
      if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Forbidden" });
      }

      const {
        email,
        username,
        role,
        villageId,
        password,
        phoneNumber,
        address,
        image,
      } = await User.create(req.body);

      res.status(201).json({
        email: email,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
        image: image,
        role: role,
        villageId: villageId,
      });
    } catch (err) {
      next(err);
    }
  },

  async getUser(req, res, next) {
    try {
      const data = await User.findAll();
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  },

  async updateUser(req, res, next) {
    const userId = req.params.id;
    try {
      const [updated] = await User.update(req.body, {
        where: { id: userId },
        returning: true,
      });

      if (updated === 0) {
        throw { name: "UserNotFound", id: userId };
      }

      const updatedUser = await User.findByPk(userId);
      res.status(200).json({ message: `User id ${updatedUser.id} updated.` });
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    const userId = req.params.id;
    try {
      const deleted = await User.destroy({ where: { id: userId } });

      if (deleted === 0) {
        throw { name: "UserNotFound", id: userId };
      }

      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  async geminiAI(req, res, next) {
    try {
      const { naruto1, naruto2 } = req.body;
      let data = await gemini(naruto1, naruto2);

      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
