import io
import time
import numpy as np
import requests
import soundfile as sf


class DangerAudioDetector:

    def __init__(self):

        self.audio_url = (
            "http://192.168.31.155:8080/audio.wav"
        )

        self.last_alert_time = 0

        self.cooldown = 10

    def detect_danger(self):

        try:

            response = requests.get(
                self.audio_url,
                timeout=5
            )

            audio_bytes = io.BytesIO(
                response.content
            )

            audio_data, sample_rate = sf.read(
                audio_bytes
            )

            if len(audio_data.shape) > 1:

                audio_data = np.mean(
                    audio_data,
                    axis=1
                )

            loudness = np.max(
                np.abs(audio_data)
            )

            print(
                f"LOUDNESS: {loudness}"
            )

            danger_detected = (
                loudness > 0.75
            )

            current_time = time.time()

            if (
                danger_detected and
                current_time - self.last_alert_time
                > self.cooldown
            ):

                self.last_alert_time = current_time

                return True

            return False

        except Exception as e:

            print(
                "AUDIO DETECTION ERROR"
            )

            print(e)

            return False