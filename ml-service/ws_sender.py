import websocket
import json
import time


class MonitorSocketClient:

    def __init__(
            self,
            ws_url,
            reconnect_delay=5
    ):

        self.ws_url = ws_url
        self.reconnect_delay = reconnect_delay

        self.ws = None

        self.connect()

    def connect(self):

        while True:

            try:

                print(
                    f"Connecting to {self.ws_url}"
                )

                self.ws = websocket.WebSocket()

                self.ws.connect(
                    self.ws_url
                )

                print(
                    "WebSocket Connected"
                )

                break

            except Exception as e:

                print(
                    f"Connection Failed: {e}"
                )

                time.sleep(
                    self.reconnect_delay
                )

    def send(self, payload):

        try:

            if self.ws is None:

                self.connect()

            self.ws.send(
                json.dumps(payload)
            )

            print(
                "WS PAYLOAD SENT"
            )

        except Exception as e:

            print(
                f"Send Failed: {e}"
            )

            try:

                self.ws.close()

            except:
                pass

            self.connect()

    def close(self):

        try:

            if self.ws:

                self.ws.close()

                print(
                    "WebSocket Closed"
                )

        except Exception as e:

            print(
                f"Close Error: {e}"
            )