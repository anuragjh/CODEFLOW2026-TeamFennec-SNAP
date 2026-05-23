from ultralytics import YOLO
import cv2
import json

# =========================
# LOAD MODELS
# =========================

# Helmet detection model
helmet_model = YOLO(
    "helmet.v1i.yolov8/runs/detect/train/weights/best.pt"
)

# Default YOLO model for person detection
person_model = YOLO("yolov8n.pt")

# =========================
# CAMERA STREAM
# =========================

url = "http://192.168.31.155:8080/video"

cap = cv2.VideoCapture(url)

if not cap.isOpened():
    print("Camera connection failed")
    exit()

print("Industrial Safety Monitoring Started")

# =========================
# MAIN LOOP
# =========================

while True:

    success, frame = cap.read()

    if not success:
        print("Failed to read frame")
        break

    # =========================
    # PERSON DETECTION
    # =========================

    person_results = person_model(frame)

    person_boxes = []

    for box in person_results[0].boxes:

        cls_id = int(box.cls[0])

        # COCO class 0 = person
        if cls_id == 0:
            x1, y1, x2, y2 = map(int, box.xyxy[0])

            person_boxes.append((x1, y1, x2, y2))

    # =========================
    # HELMET DETECTION
    # =========================

    helmet_results = helmet_model(frame)

    helmet_boxes = []

    for box in helmet_results[0].boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])

        helmet_boxes.append((x1, y1, x2, y2))

    # =========================
    # SAFETY LOGIC
    # =========================

    people_data = []

    for idx, (px1, py1, px2, py2) in enumerate(person_boxes):

        helmet_found = False

        head_y2 = py1 + int((py2 - py1) * 0.35)

        # Draw head region (optional)
        cv2.rectangle(
            frame,
            (px1, py1),
            (px2, head_y2),
            (255, 255, 0),
            2
        )

        for hx1, hy1, hx2, hy2 in helmet_boxes:

            helmet_cx = (hx1 + hx2) // 2
            helmet_cy = (hy1 + hy2) // 2

            if (
                    px1 <= helmet_cx <= px2 and
                    py1 <= helmet_cy <= head_y2
            ):
                helmet_found = True
                break

        if helmet_found:

            color = (0, 255, 0)
            status = "SAFE"

        else:

            color = (0, 0, 255)
            status = "NO HELMET"

        cv2.rectangle(
            frame,
            (px1, py1),
            (px2, py2),
            color,
            3
        )

        cv2.putText(
            frame,
            f"Person {idx + 1}: {status}",
            (px1, py1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            color,
            2
        )

        people_data.append({
            "person_id": idx + 1,
            "helmet_wearing": "Y" if helmet_found else "N"
        })

    output = {
        "ppl_number": len(person_boxes),
        "people": people_data
    }

    print(json.dumps(output, indent=2))

    cv2.imshow("Industrial Safety Monitoring", frame)

    # Press Q to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()