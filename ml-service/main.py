from ultralytics import YOLO
import cv2


model = YOLO("yolov8n.pt")


url = "http://192.168.31.155:8080/video"


cap = cv2.VideoCapture(url)


if not cap.isOpened():
    print("Failed to connect to camera stream")
    exit()

print("Connected to camera!")

while True:

    success, frame = cap.read()

    if not success:
        print("Failed to read frame")
        break


    results = model(frame)


    annotated_frame = results[0].plot()


    cv2.imshow("YOLOv8 Detection", annotated_frame)


    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


cap.release()
cv2.destroyAllWindows()