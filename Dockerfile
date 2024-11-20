# Образ для сборки приложения с псевдонимом build
FROM maven:3-amazoncorretto-17-alpine AS build

# Копирование файлов и папок из текущего каталога в контейнер
COPY . .

# Выполнение сборки проекта
RUN mvn clean package

# Переключиться на другой образ для последующих команд
# В данном случае это дистрибутив Linux с предустановленным интерпретатором Java 17 от Amazon Corretto.
# Версия alpine говорит, что дистрибутив построен на легковесной системе Linux
FROM amazoncorretto:17-alpine-jdk

# Скопироавть файл five-letters-game.jar из директории /target в контейнере, созданном на этапе сборки (псевдоним build)
COPY --from=build /target/five-letters-game.jar five-letters-game.jar

# Запустить приложение по пути
CMD java -jar /five-letters-game.jar