FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# 1. Copy all poms (for dependency layer caching)
COPY pom.xml .
COPY eureka-server/pom.xml        eureka-server/pom.xml
COPY config-server/pom.xml        config-server/pom.xml
COPY api-gateway/pom.xml          api-gateway/pom.xml
COPY user-service/pom.xml         user-service/pom.xml
COPY product-service/pom.xml      product-service/pom.xml
COPY cart-service/pom.xml         cart-service/pom.xml
COPY order-service/pom.xml        order-service/pom.xml
COPY notification-service/pom.xml notification-service/pom.xml

# 2. Pre-download deps (cached unless a pom.xml changes)
RUN mvn dependency:go-offline -pl eureka-server -am -DskipTests -q

# 3. Copy source and build
COPY eureka-server/src eureka-server/src
RUN mvn clean package -pl eureka-server -am -Dmaven.test.skip=true -q

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/eureka-server/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
