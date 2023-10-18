FROM openjdk:17

EXPOSE 8080

ADD backend/target/shoppingapp.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]
