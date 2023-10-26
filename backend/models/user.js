import mongoose from 'mongoose';
import validator from 'validator';
// импортируем модуль для хэширования
import bcrypt from 'bcryptjs';
// импортируем классы ошибок
import UnathorizedError from '../errors/UnathorizedError.js';
// импортируем регулярку
import urlRegex from '../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    // имя пользователя
    name: {
      type: String,
      minlength: [2, 'поле имя `{VALUE}` содержит менее 2 символов.'],
      maxlength: [30, 'поле имя `{VALUE}` содержит более 30 символов.'],
      default: 'Жак-Ив Кусто',
    },
    // информация о пользователе
    about: {
      type: String,
      minlength: [2, 'поле о пользователе `{VALUE}` содержит менее 2 символов.'],
      maxlength: [30, 'поле о пользователе `{VALUE}` содержит более 30 символов.'],
      default: 'Исследователь',
    },
    // ссылка на аватарку
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => urlRegex.test(url),
        message: 'поле ссылка на аватар `{VALUE}` не прошло валидацию.',
      },
    },
    // email
    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'поле email `{VALUE}` не прошло валидацию.',
      },
      required: [true, 'поле email не заполнено.'],
    },
    // пароль
    password: {
      type: String,
      required: [true, 'поле пароль не заполнено.'],
      select: false,
    },
  },
  // уберем лишний для нас ключ с версией документа
  { versionKey: false },
);

// метод схемы для поиска пользователя по логину и паролю
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // проверим, найден ли пользователь
      if (user) {
        // вернем результат проверки корректности пароля
        return bcrypt.compare(password, user.password)
          .then((checked) => {
            // если пароль корректный
            if (checked) {
              const userWithoutPassword = user.toObject();
              delete userWithoutPassword.password;
              return userWithoutPassword;
            } // если хэши не совпали отклоняем промис с ошибкой
            throw new UnathorizedError('Указаны некорректные почта или пароль :-(');
          });
      } // иначе отклоняем промис с ошибкой
      throw new UnathorizedError('Указаны некорректные почта или пароль :-(');
    });
};

// создадим и экспортируем модель user
export default mongoose.model('user', userSchema);
