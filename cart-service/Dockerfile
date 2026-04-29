FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

COPY pom.xml .
COPY eureka-server/pom.xml        eureka-server/pom.xml
COPY config-server/pom.xml        config-server/pom.xml
COPY api-gateway/pom.xml          api-gateway/pom.xml
COPY user-service/pom.xml         user-service/pom.xml
COPY product-service/pom.xml      product-service/pom.xml
COPY cart-service/pom.xml         cart-service/pom.xml
COPY order-service/pom.xml        order-service/pom.xml
COPY notification-service/pom.xml notification-service/pom.xml

RUN mvn dependency:go-offline -pl cart-service -am -DskipTests -q

COPY cart-service/src cart-service/src

RUN mvn clean package -pl cart-service -am -DskipTests -q

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/cart-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
