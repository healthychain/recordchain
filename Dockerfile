FROM ubuntu:xenial
WORKDIR /app

COPY . .

RUN apt-get update
RUN apt-get install -y apt-transport-https
RUN apt-get install -y software-properties-common
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 68DB5E88
RUN add-apt-repository "deb https://repo.sovrin.org/sdk/deb xenial stable"
RUN apt-get update
RUN apt-get install -y libindy
RUN apt-get install -y screen
RUN apt-get install -y openjdk-8-jdk

RUN apt-get install -y wget
RUN apt-get install -y npm
RUN npm install -g n
RUN n stable
RUN npm install -g yarn
RUN cd health-claim && yarn install
RUN ls
RUN cd backend && ./gradlew build

CMD (cd health-claim && yarn start) & (cd backend && ./gradlew run)
