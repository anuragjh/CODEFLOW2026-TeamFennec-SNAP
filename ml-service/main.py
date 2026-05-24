import time

from ultralytics import YOLO
import cv2
import json
from ws_sender import MonitorSocketClient


socket_client = MonitorSocketClient(
    ws_url=
    "ws://localhost:8094/ws/monitor?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbnVyYWdqaGF2NTFAZ21haWwuY29tIiwidG9waWMiOiJtb25pdG9yL1BPVFMtMTAwOSIsInR5cGUiOiJXUyIsImlhdCI6MTc3OTU5OTMzNywiZXhwIjoxNzc5NTk5NjM3fQ.UPNSy_wpdqlDe80VEpFKe1n8_9iKY7lBngcaOSjnTMo"
)

helmet_model = YOLO(
    "helmet.v1i.yolov8/runs/detect/train/weights/best.pt"
)

fall_model = YOLO(
    "Fall.v1i.yolov8/runs/detect/train/weights/best.pt"
)

goggle_model = YOLO(
    "GOOGLES.v1i.yolov8/runs/detect/train/weights/best.pt"
)

fire_model = YOLO(
    "fire.v1i.yolov8/runs/detect/train/weights/best.pt"
)

reflective_model = YOLO(
    "Reflective.v1i.yolov8/runs/detect/train/weights/best.pt"
)


person_model = YOLO("yolov8n.pt")


url = "http://192.168.31.155:8080/video"

cap = cv2.VideoCapture(url)

if not cap.isOpened():
    print("Camera connection failed")
    exit()

print("Industrial Safety Monitoring Started")


while True:

    success, frame = cap.read()

    if not success:
        print("Failed to read frame")
        break


    person_results = person_model(frame)

    person_boxes = []

    for box in person_results[0].boxes:

        cls_id = int(box.cls[0])


        if cls_id == 0:

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            person_boxes.append((x1, y1, x2, y2))


    helmet_results = helmet_model(frame)

    helmet_boxes = []

    for box in helmet_results[0].boxes:

        x1, y1, x2, y2 = map(int, box.xyxy[0])

        helmet_boxes.append((x1, y1, x2, y2))

        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            (255, 0, 0),
            2
        )

        cv2.putText(
            frame,
            "HELMET",
            (x1, y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255, 0, 0),
            2
        )

    fall_results = fall_model(frame)

    fall_boxes = []

    for box in fall_results[0].boxes:

        x1, y1, x2, y2 = map(int, box.xyxy[0])

        fall_boxes.append((x1, y1, x2, y2))

        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            (0, 0, 255),
            2
        )

        cv2.putText(
            frame,
            "FALL",
            (x1, y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 0, 255),
            2
        )


    goggle_results = goggle_model(frame)

    goggle_boxes = []

    for box in goggle_results[0].boxes:

        x1, y1, x2, y2 = map(int, box.xyxy[0])

        goggle_boxes.append((x1, y1, x2, y2))

        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            (255, 255, 0),
            2
        )

        cv2.putText(
            frame,
            "GOGGLES",
            (x1, y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255, 255, 0),
            2
        )


    fire_results = fire_model(frame)

    fire_boxes = []

    for box in fire_results[0].boxes:

        x1, y1, x2, y2 = map(int, box.xyxy[0])

        fire_boxes.append((x1, y1, x2, y2))

        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            (0, 140, 255),
            2
        )

        cv2.putText(
            frame,
            "FIRE",
            (x1, y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 140, 255),
            2
        )

    reflective_results = reflective_model(frame)

    reflective_boxes = []

    for box in reflective_results[0].boxes:

        x1, y1, x2, y2 = map(int, box.xyxy[0])

        reflective_boxes.append((x1, y1, x2, y2))

        cv2.rectangle(
            frame,
            (x1, y1),
            (x2, y2),
            (255, 0, 255),
            2
        )

        cv2.putText(
            frame,
            "JACKET",
            (x1, y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255, 0, 255),
            2
        )


    people_data = []

    for idx, (px1, py1, px2, py2) in enumerate(person_boxes):

        helmet_found = False
        fall_found = False
        goggle_found = False
        fire_found = False
        jacket_found = False


        head_y2 = py1 + int((py2 - py1) * 0.40)


        for hx1, hy1, hx2, hy2 in helmet_boxes:

            overlap_x = max(
                0,
                min(px2, hx2) - max(px1, hx1)
            )

            overlap_y = max(
                0,
                min(head_y2, hy2) - max(py1, hy1)
            )

            overlap_area = overlap_x * overlap_y

            helmet_area = (hx2 - hx1) * (hy2 - hy1)

            if helmet_area > 0 and (overlap_area / helmet_area) > 0.2:

                helmet_found = True
                break


        for gx1, gy1, gx2, gy2 in goggle_boxes:

            overlap_x = max(
                0,
                min(px2, gx2) - max(px1, gx1)
            )

            overlap_y = max(
                0,
                min(head_y2, gy2) - max(py1, gy1)
            )

            overlap_area = overlap_x * overlap_y

            goggle_area = (gx2 - gx1) * (gy2 - gy1)

            if goggle_area > 0 and (overlap_area / goggle_area) > 0.2:

                goggle_found = True
                break


        for rx1, ry1, rx2, ry2 in reflective_boxes:

            overlap_x = max(
                0,
                min(px2, rx2) - max(px1, rx1)
            )

            overlap_y = max(
                0,
                min(py2, ry2) - max(py1, ry1)
            )

            overlap_area = overlap_x * overlap_y

            jacket_area = (rx2 - rx1) * (ry2 - ry1)

            if jacket_area > 0 and (overlap_area / jacket_area) > 0.2:

                jacket_found = True
                break


        for fx1, fy1, fx2, fy2 in fall_boxes:

            fall_cx = (fx1 + fx2) // 2
            fall_cy = (fy1 + fy2) // 2

            if (
                px1 <= fall_cx <= px2 and
                py1 <= fall_cy <= py2
            ):

                fall_found = True
                break


        for frx1, fry1, frx2, fry2 in fire_boxes:

            fire_cx = (frx1 + frx2) // 2
            fire_cy = (fry1 + fry2) // 2

            if (
                px1 <= fire_cx <= px2 and
                py1 <= fire_cy <= py2
            ):

                fire_found = True
                break


        if fall_found:

            color = (0, 0, 255)
            status = "FALL DETECTED"

        elif fire_found:

            color = (0, 140, 255)
            status = "FIRE ALERT"

        elif helmet_found and goggle_found and jacket_found:

            color = (0, 255, 0)
            status = "SAFE"

        else:

            color = (0, 165, 255)
            status = "UNSAFE"


        cv2.rectangle(
            frame,
            (px1, py1),
            (px2, py2),
            color,
            3
        )


        cv2.putText(
            frame,
            f"P{idx+1}: {status}",
            (px1, py1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            color,
            2
        )


        people_data.append({
            "person_id": idx + 1,
            "falling": "Y" if fall_found else "N",
            "helmet_wearing": "Y" if helmet_found else "N",
            "wearing_jacket": "Y" if jacket_found else "N",
            "goggle": "Y" if goggle_found else "N",
            "fire": "Y" if fire_found else "N"
        })

    output = {
        "topic": "monitor/POTS-1009",
        "device_id": "POTS-1009",
        "ppl_number": len(person_boxes),
        "people": people_data,
        "timestamp": int(time.time())
    }
    socket_client.send(output)

    print(json.dumps(output, indent=2))



    cv2.imshow("Industrial Safety Monitoring", frame)


    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


cap.release()
cv2.destroyAllWindows()