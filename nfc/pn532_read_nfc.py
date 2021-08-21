import requests
import RPi.GPIO as GPIO
import os

from pn532 import *
from typing import List
from time import sleep
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# pn532 = PN532_SPI(debug=False, reset=20, cs=4)
# pn532 = PN532_UART(debug=False, reset=20)
pn532 = PN532_I2C(debug=False, reset=20, req=16)
pn532.SAM_configuration()
ONGAKU_API = os.environ.get("ONGAKU_API", "http://localhost:8888/api")


def conver_to_ongaku_id(list_hex: List[hex]) -> str:
    return "".join([hex(value) for value in list_hex])


def play_ongaku(uid: str) -> None:
    try:
        url = f"{ONGAKU_API}/music/play/{uid}"
        print(url)
        response = requests.get(url)
        print(response)
    except Exception as error:
        print(error)


if __name__ == "__main__":
    try:
        print("Waiting for RFID/NFC card...")
        previous_uid = ""
        while True:
            # Check if a card is available to read
            uid = pn532.read_passive_target(timeout=0.5)
            if uid is None:
                continue
            uid = conver_to_ongaku_id(uid)
            print(f"Card UID: {uid}")
            if uid == previous_uid:
                print("Still playing the same music")
                sleep(2)
                continue
            play_ongaku(uid)
            previous_uid = uid
            sleep(2)
    except Exception as e:
        print(e)
    finally:
        GPIO.cleanup()
