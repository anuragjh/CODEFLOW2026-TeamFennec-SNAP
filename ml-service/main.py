from ultralytics import YOLO
import cv2
import json



helmet_model = YOLO(
    "helmet.v1i.yolov8/runs/detect/train/weights/best.pt"
)

fall_model = YOLO(
    "Fall.v1i.yolov8/runs/detect/train/weights/best.pt"
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


    people_data = []

    for idx, (px1, py1, px2, py2) in enumerate(person_boxes):

        helmet_found = False
        fall_found = False


        head_y2 = py1 + int((py2 - py1) * 0.40)


        cv2.rectangle(
            frame,
            (px1, py1),
            (px2, head_y2),
            (255, 255, 0),
            2
        )


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


        for fx1, fy1, fx2, fy2 in fall_boxes:

            fall_cx = (fx1 + fx2) // 2
            fall_cy = (fy1 + fy2) // 2

            if (
                px1 <= fall_cx <= px2 and
                py1 <= fall_cy <= py2
            ):

                fall_found = True
                break


        if fall_found:

            color = (0, 0, 255)
            status = "FALL DETECTED"

        elif helmet_found:

            color = (0, 255, 0)
            status = "SAFE"

        else:

            color = (0, 165, 255)
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
            "helmet_wearing": "Y" if helmet_found else "N"
        })



    output = {
        "ppl_number": len(person_boxes),
        "people": people_data
    }

    print(json.dumps(output, indent=2))


    cv2.imshow("Industrial Safety Monitoring", frame)


    if cv2.waitKey(1) & 0xFF == ord('q'):
        break



cap.release()
cv2.destroyAllWindows()