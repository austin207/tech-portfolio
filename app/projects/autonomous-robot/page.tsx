import ProjectDetail from '@/app/components/ProjectDetail'

const languageData = [
  { name: 'Python', value: 210, color: '#3572A5' },
  { name: 'C++', value: 150, color: '#f34b7d' },
  { name: 'ROS', value: 100, color: '#22314E' },
  { name: 'OpenCV', value: 80, color: '#3A7DDA' },
  { name: 'TensorFlow', value: 60, color: '#FF6F00' },
  { name: 'Other', value: 40, color: '#ededed' }
]

const codeBlocks = [
  {
    name: 'Robot Initialization',
    language: 'python',
    code: `
import rospy
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan
from nav_msgs.msg import Odometry

class AutonomousRobot:
    def __init__(self):
        rospy.init_node('autonomous_robot', anonymous=True)
        self.velocity_publisher = rospy.Publisher('/cmd_vel', Twist, queue_size=10)
        self.laser_subscriber = rospy.Subscriber('/scan', LaserScan, self.laser_callback)
        self.odom_subscriber = rospy.Subscriber('/odom', Odometry, self.odom_callback)
        self.rate = rospy.Rate(10)

    def laser_callback(self, data):
        # Process laser scan data
        pass

    def odom_callback(self, data):
        # Process odometry data
        pass

    def move(self):
        # Implement movement logic
        pass

if __name__ == '__main__':
    try:
        robot = AutonomousRobot()
        robot.move()
    except rospy.ROSInterruptException:
        pass
    `.trim()
  },
  {
    name: 'Object Detection',
    language: 'python',
    code: `
import cv2
import numpy as np
import tensorflow as tf

class ObjectDetector:
    def __init__(self, model_path):
        self.model = tf.saved_model.load(model_path)

    def detect_objects(self, image):
        input_tensor = tf.convert_to_tensor(image)
        input_tensor = input_tensor[tf.newaxis, ...]
        detections = self.model(input_tensor)
        return detections

    def process_frame(self, frame):
        image_np = np.array(frame)
        detections = self.detect_objects(image_np)
        # Process detections and draw bounding boxes
        return image_np

if __name__ == '__main__':
    detector = ObjectDetector('path/to/saved_model')
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        processed_frame = detector.process_frame(frame)
        cv2.imshow('Object Detection', processed_frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
    `.trim()
  },
  {
    name: 'Path Planning',
    language: 'python',
    code: `
import numpy as np
from queue import PriorityQueue

class Node:
    def __init__(self, position, g_cost, h_cost, parent=None):
        self.position = position
        self.g_cost = g_cost
        self.h_cost = h_cost
        self.f_cost = g_cost + h_cost
        self.parent = parent

def astar(grid, start, goal):
    rows, cols = grid.shape
    start_node = Node(start, 0, manhattan_distance(start, goal))
    open_list = PriorityQueue()
    open_list.put((start_node.f_cost, start_node))
    closed_set = set()

    while not open_list.empty():
        current_node = open_list.get()[1]

        if current_node.position == goal:
            return reconstruct_path(current_node)

        closed_set.add(current_node.position)

        for neighbor in get_neighbors(current_node.position, rows, cols):
            if neighbor in closed_set or grid[neighbor] == 1:
                continue

            g_cost = current_node.g_cost + 1
            h_cost = manhattan_distance(neighbor, goal)
            neighbor_node = Node(neighbor, g_cost, h_cost, current_node)

            if not any(node.position == neighbor for _, node in open_list.queue):
                open_list.put((neighbor_node.f_cost, neighbor_node))
            else:
                for _, node in open_list.queue:
                    if node.position == neighbor and node.g_cost > g_cost:
                        node.g_cost = g_cost
                        node.f_cost = g_cost + node.h_cost
                        node.parent = current_node

    return None

def manhattan_distance(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def get_neighbors(position, rows, cols):
    x, y = position
    neighbors = [(x-1, y), (x+1, y), (x, y-1), (x, y+1)]
    return [(nx, ny) for nx, ny in neighbors if 0 <= nx < rows and 0 <= ny < cols]

def reconstruct_path(node):
    path = []
    while node:
        path.append(node.position)
        node = node.parent
    return path[::-1]

# Example usage
grid = np.array([
    [0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
])
start = (0, 0)
goal = (4, 4)
path = astar(grid, start, goal)
print(path)
    `.trim()
  }
]

export default function AutonomousRobotProject() {
  return (
    <ProjectDetail
      title="Autonomous Robot"
      description="Self-navigating robot built with Raspberry Pi and Computer Vision"
      longDescription={`
Our Autonomous Robot project showcases the integration of advanced robotics and artificial intelligence to create a self-navigating machine. Built on a Raspberry Pi platform and leveraging the power of computer vision, this robot can intelligently perceive and interact with its environment.

Key Features:
1. Raspberry Pi Control: The robot's brain is powered by a Raspberry Pi 4, providing ample processing power for real-time decision making.
2. Computer Vision: Utilizes OpenCV for image processing and object detection, allowing the robot to recognize and avoid obstacles.
3. SLAM Implementation: Simultaneous Localization and Mapping (SLAM) algorithms enable the robot to create and update a map of its environment while keeping track of its own location.
4. Sensor Fusion: Combines data from multiple sensors including cameras, ultrasonic sensors, and IMU for accurate environmental perception.
5. Path Planning: Implements advanced algorithms for efficient path planning and navigation.
6. Autonomous Decision Making: The robot can make decisions based on its sensor inputs and predefined rules, allowing it to navigate complex environments autonomously.
7. Remote Monitoring: Includes a web interface for remote monitoring and control of the robot.

This project serves as an excellent platform for learning about robotics, computer vision, and artificial intelligence. It can be extended for various applications such as automated inventory management in warehouses, security patrols, or even as an educational tool for robotics courses.

This project demonstrates the practical application of various technologies and concepts in robotics, making it an ideal showcase for aspiring engineers and researchers in the field of autonomous systems.
    `}
      tags={['Raspberry Pi', 'Python', 'OpenCV', 'ROS', 'AI', 'SLAM']}
      image="/placeholder.svg?height=300&width=600"
      circuitDiagram="/placeholder.svg?height=400&width=800"
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      languageData={languageData}
      codeBlocks={codeBlocks}
    />
  )
}

