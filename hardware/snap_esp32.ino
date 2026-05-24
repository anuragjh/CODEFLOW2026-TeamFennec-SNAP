#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11


const int gasPin = 35;

const char* ssid = "AMAN";
const char* wifiPassword = "aman2007";

const char* mqttServer = "xa1ef2e1.ala.dedicated.aws.emqxcloud.com";
const int mqttPort = 1883;

const char* mqttUser = "nandini";
const char* mqttPassword = "2004";

WiFiClient espClient;
PubSubClient client(espClient);

DHT dht(DHTPIN, DHTTYPE);

void connectWiFi() {
  WiFi.begin(ssid, wifiPassword);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void connectMQTT() {
  while (!client.connected()) {
    String clientId = "ESP32-";
    clientId += String(random(0xffff), HEX);

    if (client.connect(clientId.c_str(), mqttUser, mqttPassword)) {
      Serial.println("MQTT Connected");
    } else {
      delay(2000);
    }
  }
}

void setup() {
  Serial.begin(115200);

  analogReadResolution(12);

  dht.begin();

  connectWiFi();

  client.setServer(mqttServer, mqttPort);
}

void loop() {

  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  if (!client.connected()) {
    connectMQTT();
  }

  client.loop();

  float temperature = dht.readTemperature();
  int gasValue = analogRead(gasPin);

  if (isnan(temperature)) {
    Serial.println("{\"error\":\"Failed to read DHT11\"}");
    delay(5000);
    return;
  }

  String payload = "{";
  payload += "\"temperature\":";
  payload += String(temperature, 2);
  payload += ",";
  payload += "\"gas_data\":";
  payload += String(gasValue);
  payload += "}";

  client.publish("snap/sensor/data", payload.c_str());

  Serial.println(payload);

  delay(5000);
}