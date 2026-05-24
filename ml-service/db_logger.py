import psycopg2


class MonitoringDatabase:

    def __init__(self):

        try:

            self.connection = psycopg2.connect(

                host="ep-ancient-morning-aq2fzmcx-pooler.c-8.us-east-1.aws.neon.tech",

                port=5432,

                database="neondb",

                user="neondb_owner",

                password="npg_Xm4hVbTKSL5c",

                sslmode="require"
            )

            self.connection.autocommit = True

            self.cursor = self.connection.cursor()

            self.create_table()

            print(
                "POSTGRES CONNECTED"
            )

        except Exception as e:

            print(
                "POSTGRES CONNECTION FAILED"
            )

            print(e)

            raise e

    def create_table(self):

        self.cursor.execute("""

            CREATE TABLE IF NOT EXISTS monitoring_logs (

                id SERIAL PRIMARY KEY,

                device_id VARCHAR(255),

                topic VARCHAR(255),

                person_id INTEGER,

                helmet_wearing VARCHAR(10),

                goggle VARCHAR(10),

                falling VARCHAR(10),

                fire VARCHAR(10),

                timestamp BIGINT
            )

        """)

        print(
            "TABLE READY"
        )

    def save_monitoring_data(
            self,
            output
    ):

        try:

            topic = output.get(
                "topic"
            )

            device_id = output.get(
                "device_id"
            )

            timestamp = output.get(
                "timestamp"
            )

            people = output.get(
                "people",
                []
            )

            if len(people) == 0:

                self.cursor.execute("""

                    INSERT INTO monitoring_logs (

                        device_id,
                        topic,
                        person_id,
                        helmet_wearing,
                        goggle,
                        falling,
                        fire,
                        timestamp

                    )

                    VALUES (

                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s
                    )

                """, (

                    device_id,

                    topic,

                    0,

                    "N",

                    "N",

                    "N",

                    "N",

                    timestamp
                ))

            else:

                for person in people:

                    self.cursor.execute("""

                        INSERT INTO monitoring_logs (

                            device_id,
                            topic,
                            person_id,
                            helmet_wearing,
                            goggle,
                            falling,
                            fire,
                            timestamp

                        )

                        VALUES (

                            %s,
                            %s,
                            %s,
                            %s,
                            %s,
                            %s,
                            %s,
                            %s
                        )

                    """, (

                        device_id,

                        topic,

                        person.get(
                            "person_id",
                            0
                        ),

                        person.get(
                            "helmet_wearing",
                            "N"
                        ),

                        person.get(
                            "goggle",
                            "N"
                        ),

                        person.get(
                            "falling",
                            "N"
                        ),

                        person.get(
                            "fire",
                            "N"
                        ),

                        timestamp
                    ))

            print(
                "DATA STORED IN POSTGRES"
            )

        except Exception as e:

            print(
                "FAILED TO STORE DATA"
            )

            print(e)

    def close(self):

        try:

            self.cursor.close()

            self.connection.close()

            print(
                "POSTGRES CLOSED"
            )

        except Exception as e:

            print(
                "POSTGRES CLOSE ERROR"
            )

            print(e)