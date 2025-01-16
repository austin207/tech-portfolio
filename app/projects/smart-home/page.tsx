import ProjectDetail from '@/app/components/ProjectDetail'

const languageData = [
  { name: 'C++', value: 186, color: '#f34b7d' },
  { name: 'Python', value: 108, color: '#3572A5' },
  { name: 'JavaScript', value: 70, color: '#f1e05a' },
  { name: 'HTML/CSS', value: 54.8, color: '#563d7c' },
  { name: 'Java', value: 47.8, color: '#b07219' },
  { name: 'Other', value: 32.4, color: '#ededed' }
]

const codeBlocks = [
  {
    name: 'ESP32 Setup',
    language: 'cpp',
    code: `
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";
const char* mqtt_server = "your_mqtt_broker_ip";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
    `.trim()
  },
  {
    name: 'MQTT Handler',
    language: 'cpp',
    code: `
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.println(message);

  if (String(topic) == "home/livingroom/light") {
    if (message == "ON") {
      digitalWrite(LIGHT_PIN, HIGH);
    } else if (message == "OFF") {
      digitalWrite(LIGHT_PIN, LOW);
    }
  }
}
    `.trim()
  },
  {
    name: 'Sensor Reading',
    language: 'cpp',
    code: `
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  dht.begin();
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  char tempString[8];
  dtostrf(t, 1, 2, tempString);
  client.publish("home/livingroom/temperature", tempString);

  char humString[8];
  dtostrf(h, 1, 2, humString);
  client.publish("home/livingroom/humidity", humString);

  delay(5000);
}
    `.trim()
  }
]

export default function SmartHomeProject() {
  return (
    <ProjectDetail
      title="Smart Home Automation"
      description="IoT-based home automation system using ESP32 and MQTT protocol"
      longDescription={`
Our Smart Home Automation project leverages the power of IoT to create a seamless, interconnected living space. At its core, this system utilizes ESP32 microcontrollers and the MQTT protocol to enable efficient communication between various smart devices in your home.

Key Features:
1. Central Hub: An ESP32 acts as the brain of the system, coordinating all connected devices.
2. MQTT Protocol: Ensures fast, reliable, and lightweight communication between devices.
3. Mobile App Control: A user-friendly mobile application allows you to control your home from anywhere.
4. Sensor Integration: Incorporates temperature, humidity, and motion sensors for automated responses.
5. Smart Lighting: Control lights based on occupancy, time of day, or manual input.
6. Climate Control: Automated HVAC system management for optimal comfort and energy efficiency.
7. Security Features: Integrated camera feeds and door sensors for enhanced home security.

The system is designed with modularity in mind, allowing for easy expansion and customization. Whether you're a home automation enthusiast or looking to enhance your living space with smart technology, this project provides a robust foundation for creating your ideal smart home environment.
      `}
      tags={['ESP32', 'MQTT', 'IoT', 'C++', 'Mobile App']}
      image="/placeholder.svg?height=300&width=600"
      circuitDiagram="/placeholder.svg?height=400&width=800"
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      languageData={languageData}
      codeBlocks={codeBlocks}
    />
  )
}

