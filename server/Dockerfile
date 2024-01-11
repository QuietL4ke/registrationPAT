FROM node:16-alpine

WORKDIR /usr/app/server

# Копируем package.json и устанавливаем зависимости
COPY package.json .
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Экспортируем порт
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start"]
